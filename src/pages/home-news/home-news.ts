import { Component } from '@angular/core';
import { Events, ModalController, Platform } from 'ionic-angular';
import { PostNewsPage } from '../post-news/post-news';
//import { DynamicCardSocialPage } from '../dynamic-card-social/dynamic-card-social';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//import { LinkPage } from '../link/link';
import { NewsService } from '../../services/NewService';

@Component({
  selector: 'page-home-news',
  templateUrl: 'home-news.html'
})
export class HomeNewsPage {

  server = "http://localhost:8080/news"
  userInfo: any;
  maxOnePage = 2;
  pageIndexPublic = 0;
  pageIndexPrivate = 0;
  contacts = {}

  constructor(private events: Events
    , public modalCtrl: ModalController
    , private platform: Platform
    , private inAppBrowser: InAppBrowser
    , private newsService: NewsService
  ) { }

  ngOnInit() {
    let linkPublicNews = this.server + "/db/get-public-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPublic;
    this.getPublicNews(linkPublicNews);
    //let linkNews = this.server + "/db/get-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPrivate;
    //this.getPrivateNews(linkNews, true);

    this.events.subscribe('event-main-login-checked'
      , (data => {
        this.userInfo = data.user;
        console.log('UserInfo: ', this.userInfo);
        let linkPrivateNews = this.server + "/db/get-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPrivate;
        this.getPrivateNews(linkPrivateNews);
      })
    )
    this.events.subscribe('postok', () => {
      this.pageIndexPublic = 0;
      this.pageIndexPrivate = 0;
      let linkPublicNews = this.server + "/db/get-public-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPublic;
      this.getPublicNews(linkPublicNews, true);
      let linkNews = this.server + "/db/get-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPrivate;
      this.getPrivateNews(linkNews, true);
    });
  }

  dynamicCards = {
    title: ""
    , buttons: [
      { color: "primary", icon: "photos", next: "ADD" }
    ]
    , items: []
  }

  getPublicNews(linkNews, reNews?: boolean) {
    this.dynamicCards.title = "Đây là trang tin của Public";
    let linkFile = this.server + "/db/get-file/"

    this.newsService.getNews(linkNews)
      .then(data => {
        data.forEach(el => {
          this.pageIndexPublic++;
          let medias = [];
          if (el.medias) {
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

          let index = this.dynamicCards.items
            .findIndex(x => x.group_id === el.group_id);
          if (index < 0) {
            reNews ? this.dynamicCards.items.unshift(el) : this.dynamicCards.items.push(el);
          }
        });
      })
      .catch(err => console.log(err))
  }

  getPrivateNews(linkNews, reNews?: boolean) {
    this.dynamicCards.title = "Đây là trang tin của " + (this.userInfo ? this.userInfo.username : "")
    let linkFile = this.server + "/db/get-file/"

    this.newsService.getNews(linkNews)
      .then(data => {
        data.forEach(el => {
          this.pageIndexPrivate++;
          let medias = [];
          if (el.medias) {
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
          let index = this.dynamicCards.items
            .findIndex(x => x.group_id === el.group_id);
          if (index < 0) {
            reNews ? this.dynamicCards.items.unshift(el) : this.dynamicCards.items.push(el);
          }
        });
      })
      .catch(err => console.log(err))
  }

  doInfinite(ev) {
    let linkPublicNews = this.server + "/db/get-public-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPublic;
    this.getPublicNews(linkPublicNews);
    if (this.userInfo) {
      let linkPrivateNews = this.server + "/db/get-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPrivate;
      this.getPrivateNews(linkPrivateNews);
    }
    setTimeout(() => {
      ev.complete();
    }, 500);
  }

  doRefresh(ev) {
    this.pageIndexPublic = 0;
    this.pageIndexPrivate = 0;
    let linkPublicNews = this.server + "/db/get-public-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPublic;
    this.getPublicNews(linkPublicNews, true);
    if (this.userInfo) {
      let linkPrivateNews = this.server + "/db/get-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPrivate;
      this.getPrivateNews(linkPrivateNews, true);
    }
    setTimeout(() => {
      ev.complete();
    }, 500);
  }

  onClickHeader(btn) {
    if (btn.next === 'ADD') {
      let modal = this.modalCtrl.create(PostNewsPage);
      modal.present();
    }
  }

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
              avatar: this.userInfo ? this.userInfo.data.image : ""
              , h1: this.userInfo.data.fullname
              , p: it.content
              , note: it.time
              , action: { color: "primary", icon: "more", next: "MORE" }
            }
            , content: {
              title: it.title
              , paragraphs: [
                {
                  //h2: "Chốn yên bình"
                  //, p: "Là nơi bình yên nhất. Bạn có thể dạo bước trên con đường rợp bóng mát thanh bình đến lạ"
                  medias: it.medias
                }
              ]
              , note: "Nguyễn Văn Định 2019"
            }
            , actions: it.actions
          }
        ]
      };
      /* this.openModal(DynamicCardSocialPage
        , { form: dynamicCardsOrigin }); */
    }
  }

  openModal(form, data?: any) {
    let modal = this.modalCtrl.create(form, data);
    modal.present();
  }
}