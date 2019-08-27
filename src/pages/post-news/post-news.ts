import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController, NavParams, Events, ViewController } from 'ionic-angular';
import { NewsService } from '../../services/NewService';
import { ApiImageService } from '../../services/apiImageService';
import { DynamicFormWebPage } from '../dynamic-form-web/dynamic-form-web';

@Component({
  selector: 'page-post-news',
  templateUrl: 'post-news.html'
})
export class PostNewsPage implements OnInit {
  fileImages: any;
  owner: any = 2;
  ownerType = {
    1: "public",
    2: "friends",
    3: "friends of friends",
    4: "only me",
  }

  userInfo: any;

  constructor(
    private viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private newsService: NewsService,
    public events: Events,
    private apiImageService: ApiImageService
  ) { }

  ngOnInit() {
    this.userInfo = this.navParams.get("userInfo")
    //this.userInfo = { username: "766777123", fullname: "Nguyen Van Dinh", image: "assets/imgs/avatar.jpg" }
    console.log(this.userInfo, this.fileImages)
  }

  fileChange(event) {
    if (event.target.files) {

      let size = 480; //default site anh

      const files: any = event.target.files;
      const processImages = new Promise((resolve, reject) => {
        let fileProcessed = [];
        let countFile = Object.keys(files).length, countResize = 0;
        if (files.length === 0) resolve();

        for (let key in files) { //index, length, item
          if (!isNaN(parseInt(key))) {
            this.apiImageService.resizeImage(files[key].name, files[key], size)
              .then(data => {
                fileProcessed.push(data);
                if (++countResize >= countFile) {
                  resolve(fileProcessed);
                }
              })
              .catch(err => {
                reject(err);
              })
          }
        }
      });

      let loading = this.loadingCtrl.create({
        content: 'Đang xử lý các ảnh theo định dạng lưu trữ tiết kiệm ...'
      });
      loading.present();

      processImages.then(data => {
        if (data) {
          console.log("data: ", data)
          this.fileImages = data;
        }
        loading.dismiss();
      })
        .catch(err => {
          loading.dismiss();
        });

      setTimeout(() => {
        //1 phut ma ko x ly duoc thi thoat ra cho cai khac thuc hien
        loading.dismiss();
      }, 60000);
    }
  }

  onClickSelect() {
    let options = [];
    for (let key in this.ownerType) {
      options.push({ name: this.ownerType[key], value: key })
    }
    let form = {
      title: "Tiêu đề của trang"
      , items: [
        { type: "title", name: "Tiêu đề form" }
        , { type: "select", key: "owner", name: "chon chia se", icon: "flower", value: this.owner, options: options }
        , {
          type: "button"
          , options: [
            { name: "CHỌN", next: "CALLBACK" },
            { name: "ĐÓNG", next: "CLOSE" }
          ]
        }]
    };

    let modal = this.modalCtrl.create(DynamicFormWebPage, {
      parent: this,
      callback: this.callback,
      form: form
    });
    modal.present();
  }

  //callback la ham ma co gia tri res la do page dynamic-form-web tra ve
  callback = (res) => {
    //console.log('Goi logout', res.data);
    this.owner = res.data.owner;
    return Promise.resolve({ next: "CLOSE" });
  }

  content;

  onShare() {
    let url = "https://c3.mobifone.vn/api/ext-public/shot-info-url?url=" + this.content;
    this.newsService.getNews(url)
      .then(data => {
        let form_data: FormData = new FormData();
        form_data.append("share_status", this.owner);
        form_data.append("content", this.content);  //nhap lieu tu text-area
        form_data.append("title", data.title);
        data.image ? form_data.append("image", data.image) : '';
        form_data.append("user", this.userInfo.username);  //user post tin;

        this.newsService.postNews(form_data)
          .then(data => {
            this.viewCtrl.dismiss(data)
          })
          .catch(err => {
            this.viewCtrl.dismiss(err)
          })
      })
      .catch(err => {
        let form_data: FormData = new FormData();
        form_data.append("count_image", this.fileImages ? this.fileImages.length : 0);
        form_data.append("share_status", this.owner);
        form_data.append("title", this.content);  //nhap lieu tu text-area
        form_data.append("content", this.content);  //nhap lieu tu text-area
        form_data.append("user", this.userInfo.username);  //user post tin

        if (this.fileImages) {
          this.fileImages.forEach((el, idx) => {
            if (el.file && el.filename) {
              let key = "image" + idx;
              form_data.append(key, el.file, el.filename);
              form_data.append("origin_date_" + key, el.last_modified);
            }
          });
        }
        this.newsService.postNews(form_data)
          .then(data => {
            this.viewCtrl.dismiss(data)
          })
          .catch(err => {
            this.viewCtrl.dismiss(err)
          })
      })
  }

  cancel() {
    this.navCtrl.pop();
  }
}