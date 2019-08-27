import { Component } from '@angular/core';
import { Events, ModalController, Platform } from 'ionic-angular';
import { PostNewsPage } from '../post-news/post-news';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NewsService } from '../../services/NewService';
import { DynamicCardSocialPage } from '../dynamic-card-social/dynamic-card-social';

@Component({
  selector: 'page-home-news',
  templateUrl: 'home-news.html'
})
export class HomeNewsPage {

  server = "http://localhost:8080/news"
  userInfo: any;
  maxOnePage = 5;

  constructor(private events: Events
    , public modalCtrl: ModalController
    , private platform: Platform
    , private inAppBrowser: InAppBrowser
    , private newsService: NewsService
  ) { }

  /**
   * Đầu tiên, nếu chưa đăng nhập thì lấy các tin public
   * Nếu đã đăng nhập thì lấy tin public và private
   */
  ngOnInit() {
    let linkPublicNews = this.server + "/db/get-public-news?limit=" + this.maxOnePage + "&offset=0";
    this.getPublicNews(linkPublicNews);

    this.events.subscribe('event-main-login-checked'
      , (data => {
        this.userInfo = data;
        console.log('UserInfo: ', this.userInfo.username);
        let linkPrivateNews = this.server + "/db/get-news?limit=" + this.maxOnePage + "&offset=0";
        this.getPrivateNews(linkPrivateNews);
      })
    )
  }

  dynamicCards = {
    title: ""
    , buttons: [
      { color: "primary", icon: "photos", next: "ADD" }
    ]
    , items: []
  }

  /**
   * Hàm này để lấy các tin public
   * @param linkNews 
   */
  getPublicNews(linkNews) {
    this.dynamicCards.title = "Đây là trang tin của Public";
    let linkFile = this.server + "/db/get-file/"

    this.newsService.getNews(linkNews)
      .then(data => {
        //console.log("Public: ", data)
        data.forEach(el => {
          let medias = [];
          if (el.medias.length > 0) {
            el.medias.forEach(e => {
              if (e.url.includes("upload_files")) {
                e.image = linkFile + e.url;
              } else {
                e.image = e.url;
              }
              medias.push(e);
            })
          }

          el.medias = medias;
          el.actions = {
            like: { name: "LIKE", color: "primary", icon: "thumbs-up", next: "LIKE" }
            , comment: { name: "COMMENT", color: "primary", icon: "chatbubbles", next: "COMMENT" }
            , share: { name: "SHARE", color: "primary", icon: "share-alt", next: "SHARE" }
          }
          el.short_detail = {
            p: el.title
            , note: el.time
            , action: { color: "primary", icon: "more", next: "MORE" }
          }
          this.dynamicCards.items.push(el);
        });
      })
      .catch(err => console.log(err))
  }

  /**
   * Hàm này để lấy các tin private
   * @param linkNews
   */
  getPrivateNews(linkNews) {
    this.dynamicCards.title = "Đây là trang tin của " + (this.userInfo ? this.userInfo.username : "")
    let linkFile = this.server + "/db/get-file/"

    this.newsService.getNews(linkNews)
      .then(data => {
        //console.log("private: ", data)
        data.forEach(el => {
          let medias = [];
          if (el.medias.length > 0) {
            el.medias.forEach(e => {
              if (e.url.includes("upload_files")) {
                e.image = linkFile + e.url;
              } else {
                e.image = e.url;
              }
              medias.push(e);
            })
          }

          el.medias = medias;
          el.actions = {
            like: { name: "LIKE", color: "primary", icon: "thumbs-up", next: "LIKE" }
            , comment: { name: "COMMENT", color: "primary", icon: "chatbubbles", next: "COMMENT" }
            , share: { name: "SHARE", color: "primary", icon: "share-alt", next: "SHARE" }
          }
          el.short_detail = {
            p: el.title
            , note: el.time
            , action: { color: "primary", icon: "more", next: "MORE" }
          }
          this.dynamicCards.items.push(el);
        });
      })
      .catch(err => console.log(err))
  }

  /**
   * Khi kích vào button thêm thì thực hiện popup sang
   * trang post news để thêm tin
   * @param btn
   */
  onClickHeader(btn) {
    if (btn.next === 'ADD') {
      let modal = this.modalCtrl.create(PostNewsPage, { userInfo: this.userInfo });
      modal.present();
      modal.onDidDismiss(data => {
        console.log('ket qua xu ly popup xong:', data);
      })
    }
  }

  /**
   * Khi kích vào hình ảnh của tin nào thì:
   * Nếu là tin có link thì mở cửa sổ mới truy cập link để đọc tin
   * Nếu là tin có hình ảnh thì hiện chi tiết các ảnh có trong tin
   * @param it
   */
  onClickMedia(it) {
    if (it.news_type == 2) {
      if (this.platform.is('ios')) {
        var target = "_blank";
        var options = "hidden=no, toolbar=yes, location=yes, presentationstyle=fullscreen, clearcache=yes, clearsessioncache=yes";
        this.inAppBrowser.create(it.content, target, options);
      } else {
        /* this.openModal(LinkPage
          , {
            parent: this,
            link: it.content
          }); */
      }
    } else {
      let dynamicCardsOrigin: any = {
        title: it.user
        , buttons: [
          { color: "danger", icon: "close", next: "CLOSE" }
        ]
        , items: [
          {
            short_detail: {
              avatar: this.userInfo ? "assets/imgs/avatar.jpg" : "assets/imgs/no-image-go.jpg"
              , h1: this.userInfo ? this.userInfo.fullname : "GUEST"
              , p: it.title
              , note: it.time
              , action: { color: "primary", icon: "more", next: "MORE" }
            }
            , content: {
              title: it.content
              , paragraphs: [
                {
                  medias: it.medias
                }
              ]
              , note: "Nguyễn Văn Định 2019"
            }
            , actions: it.actions
          }
        ]
      };
      this.openModal(DynamicCardSocialPage
        , { form: dynamicCardsOrigin });
    }
  }

  openModal(form, data?: any) {
    let modal = this.modalCtrl.create(form, data);
    modal.present();
  }
}