webpackJsonp([0],{

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(244);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NewsService = /** @class */ (function () {
    function NewsService(httpClient) {
        this.httpClient = httpClient;
    }
    NewsService.prototype.getNews = function (url) {
        return this.httpClient.get(url)
            .toPromise()
            .then(function (res) {
            var rtn;
            rtn = res;
            return rtn;
        });
    };
    NewsService.prototype.postNews = function (form_data) {
        var url = "http://localhost:8080/news/db/post-news";
        return this.httpClient.post(url, form_data)
            .toPromise()
            .then(function (data) { return data; });
    };
    NewsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], NewsService);
    return NewsService;
}());

//# sourceMappingURL=NewService.js.map

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 204:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 204;

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeNewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__post_news_post_news__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser_ngx__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_NewService__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { DynamicCardSocialPage } from '../dynamic-card-social/dynamic-card-social';

//import { LinkPage } from '../link/link';

var HomeNewsPage = /** @class */ (function () {
    function HomeNewsPage(events, modalCtrl, platform, inAppBrowser, newsService) {
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.inAppBrowser = inAppBrowser;
        this.newsService = newsService;
        this.server = "http://localhost:8080/news";
        this.maxOnePage = 2;
        this.pageIndexPublic = 0;
        this.pageIndexPrivate = 0;
        this.contacts = {};
        this.dynamicCards = {
            title: "",
            buttons: [
                { color: "primary", icon: "photos", next: "ADD" }
            ],
            items: []
        };
    }
    HomeNewsPage.prototype.ngOnInit = function () {
        var _this = this;
        var linkPublicNews = this.server + "/db/get-public-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPublic;
        this.getPublicNews(linkPublicNews);
        //let linkNews = this.server + "/db/get-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPrivate;
        //this.getPrivateNews(linkNews, true);
        this.events.subscribe('event-main-login-checked', (function (data) {
            _this.userInfo = data.user;
            console.log('UserInfo: ', _this.userInfo);
            var linkPrivateNews = _this.server + "/db/get-news?limit=" + _this.maxOnePage + "&offset=" + _this.pageIndexPrivate;
            _this.getPrivateNews(linkPrivateNews);
        }));
        this.events.subscribe('postok', function () {
            _this.pageIndexPublic = 0;
            _this.pageIndexPrivate = 0;
            var linkPublicNews = _this.server + "/db/get-public-news?limit=" + _this.maxOnePage + "&offset=" + _this.pageIndexPublic;
            _this.getPublicNews(linkPublicNews, true);
            var linkNews = _this.server + "/db/get-news?limit=" + _this.maxOnePage + "&offset=" + _this.pageIndexPrivate;
            _this.getPrivateNews(linkNews, true);
        });
    };
    HomeNewsPage.prototype.getPublicNews = function (linkNews, reNews) {
        var _this = this;
        this.dynamicCards.title = "Đây là trang tin của Public";
        var linkFile = this.server + "/db/get-file/";
        this.newsService.getNews(linkNews)
            .then(function (data) {
            data.forEach(function (el) {
                _this.pageIndexPublic++;
                var medias = [];
                if (el.medias) {
                    el.medias.forEach(function (e) {
                        if (e.url.includes("upload_files")) {
                            e.image = linkFile + e.url;
                        }
                        else {
                            e.image = e.url;
                        }
                        medias.push(e);
                    });
                }
                el.medias = medias;
                el.actions = {
                    like: { name: "LIKE", color: "primary", icon: "thumbs-up", next: "LIKE" },
                    comment: { name: "COMMENT", color: "primary", icon: "chatbubbles", next: "COMMENT" },
                    share: { name: "SHARE", color: "primary", icon: "share-alt", next: "SHARE" }
                };
                el.short_detail = {
                    p: el.title,
                    note: el.time,
                    action: { color: "primary", icon: "more", next: "MORE" }
                };
                var index = _this.dynamicCards.items
                    .findIndex(function (x) { return x.group_id === el.group_id; });
                if (index < 0) {
                    reNews ? _this.dynamicCards.items.unshift(el) : _this.dynamicCards.items.push(el);
                }
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    HomeNewsPage.prototype.getPrivateNews = function (linkNews, reNews) {
        var _this = this;
        this.dynamicCards.title = "Đây là trang tin của " + (this.userInfo ? this.userInfo.username : "");
        var linkFile = this.server + "/db/get-file/";
        this.newsService.getNews(linkNews)
            .then(function (data) {
            data.forEach(function (el) {
                _this.pageIndexPrivate++;
                var medias = [];
                if (el.medias) {
                    el.medias.forEach(function (e) {
                        if (e.url.includes("upload_files")) {
                            e.image = linkFile + e.url;
                        }
                        else {
                            e.image = e.url;
                        }
                        medias.push(e);
                    });
                }
                el.medias = medias;
                el.actions = {
                    like: { name: "LIKE", color: "primary", icon: "thumbs-up", next: "LIKE" },
                    comment: { name: "COMMENT", color: "primary", icon: "chatbubbles", next: "COMMENT" },
                    share: { name: "SHARE", color: "primary", icon: "share-alt", next: "SHARE" }
                };
                el.short_detail = {
                    p: el.title,
                    note: el.time,
                    action: { color: "primary", icon: "more", next: "MORE" }
                };
                var index = _this.dynamicCards.items
                    .findIndex(function (x) { return x.group_id === el.group_id; });
                if (index < 0) {
                    reNews ? _this.dynamicCards.items.unshift(el) : _this.dynamicCards.items.push(el);
                }
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    HomeNewsPage.prototype.doInfinite = function (ev) {
        var linkPublicNews = this.server + "/db/get-public-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPublic;
        this.getPublicNews(linkPublicNews);
        if (this.userInfo) {
            var linkPrivateNews = this.server + "/db/get-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPrivate;
            this.getPrivateNews(linkPrivateNews);
        }
        setTimeout(function () {
            ev.complete();
        }, 500);
    };
    HomeNewsPage.prototype.doRefresh = function (ev) {
        this.pageIndexPublic = 0;
        this.pageIndexPrivate = 0;
        var linkPublicNews = this.server + "/db/get-public-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPublic;
        this.getPublicNews(linkPublicNews, true);
        if (this.userInfo) {
            var linkPrivateNews = this.server + "/db/get-news?limit=" + this.maxOnePage + "&offset=" + this.pageIndexPrivate;
            this.getPrivateNews(linkPrivateNews, true);
        }
        setTimeout(function () {
            ev.complete();
        }, 500);
    };
    HomeNewsPage.prototype.onClickHeader = function (btn) {
        if (btn.next === 'ADD') {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__post_news_post_news__["a" /* PostNewsPage */]);
            modal.present();
        }
    };
    HomeNewsPage.prototype.onClickMedia = function (it) {
        if (it.news_type == 2) {
            if (this.platform.is('ios')) {
                var target = "_blank";
                var options = "hidden=no, toolbar=yes, location=yes, presentationstyle=fullscreen, clearcache=yes, clearsessioncache=yes";
                this.inAppBrowser.create(it.content, target, options);
            }
            else {
                /* this.openModal(LinkPage
                  , {
                    parent: this,
                    link: it.content
                  }); */
            }
        }
        else {
            var dynamicCardsOrigin = {
                title: it.user,
                buttons: [
                    { color: "danger", icon: "close", next: "CLOSE" }
                ],
                items: [
                    {
                        short_detail: {
                            avatar: this.userInfo ? this.userInfo.data.image : "",
                            h1: this.userInfo.data.fullname,
                            p: it.content,
                            note: it.time,
                            action: { color: "primary", icon: "more", next: "MORE" }
                        },
                        content: {
                            title: it.title,
                            paragraphs: [
                                {
                                    //h2: "Chốn yên bình"
                                    //, p: "Là nơi bình yên nhất. Bạn có thể dạo bước trên con đường rợp bóng mát thanh bình đến lạ"
                                    medias: it.medias
                                }
                            ],
                            note: "Nguyễn Văn Định 2019"
                        },
                        actions: it.actions
                    }
                ]
            };
            /* this.openModal(DynamicCardSocialPage
              , { form: dynamicCardsOrigin }); */
        }
    };
    HomeNewsPage.prototype.openModal = function (form, data) {
        var modal = this.modalCtrl.create(form, data);
        modal.present();
    };
    HomeNewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home-news',template:/*ion-inline-start:"D:\DINHNV\MyData\LapTrinhDiDong\NODE_Baitap\node-news\get-post-news\src\pages\home-news\home-news.html"*/'<ion-header>\n\n    <ion-toolbar>\n\n        <ion-buttons start>\n\n            <button ion-button menuToggle color="primary">\n\n                <ion-icon name="menu"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n\n\n        <ion-title *ngIf="!isSearch">{{dynamicCards?.title}}</ion-title>\n\n\n\n        <ion-buttons end *ngFor="let btn of dynamicCards?.buttons">\n\n            <button *ngIf="!isSearch" class="badge-background" ion-button icon-only color="{{btn.color}}"\n\n                (click)="onClickHeader(btn)">\n\n                <ion-icon name="{{btn.icon}}"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content no-padding class="background-page gradient">\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Load dữ liệu mới hơn..." refreshingSpinner="circles"\n\n            refreshingText="Đang tải...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n    <ion-grid no-padding>\n\n        <ion-row>\n\n            <ion-col col-12 offset-xl-3 col-xl-6 offset-lg-3 col-lg-6 offset-md-2 col-md-8 col-sm-12\n\n                *ngFor="let it of dynamicCards?.items">\n\n                <!-- Card mạng xã hội cho một chủ đề liên quan item -->\n\n                <ion-card class="background-card gradient grid-border card-margin">\n\n                    <!-- Tóm lượt chủ đề theo tác giả -->\n\n                    <ion-item class="background-card gradient grid-border" *ngIf="it.short_detail">\n\n                        <ion-avatar item-start>\n\n                            <img *ngIf="userInfo?.username==it.user" [src]="userInfo?.data?.image">\n\n                            <img *ngIf="userInfo?.username!=it.user&&contacts[it.user]&&contacts[it.user].avatar" [src]="contacts[it.user].avatar">\n\n                            <img *ngIf="userInfo?.username!=it.user&&!(contacts[it.user]&&contacts[it.user].avatar)" src="assets/imgs/no-image-go.jpg">\n\n                        </ion-avatar>\n\n                        <ion-title>{{contacts[it.user]&&contacts[it.user].fullname?contacts[it.user].fullname:it.user}}</ion-title>\n\n                        <p *ngIf="it.short_detail?.p" text-wrap>{{it.short_detail?.p}}</p>\n\n                        <ion-note item-end *ngIf="it.short_detail?.note">{{it.short_detail?.note}}</ion-note>\n\n                        <button item-end icon-only ion-button clear small *ngIf="it.short_detail?.action"\n\n                            color="{{it.short_detail?.action?.color}}"\n\n                            (click)="onClickShortDetails(it.short_detail?.action, it)">\n\n                            <ion-icon name="{{it.short_detail?.action?.icon}}"></ion-icon>\n\n                        </button>\n\n                    </ion-item>\n\n\n\n\n\n                    <!-- 1 pics -->\n\n                    <div class="one-image card-background-page" *ngIf="it.medias && it.medias.length===1"\n\n                        (click)="onClickMedia(it)">\n\n                        <img [src]="it.medias[0].image" />\n\n                        <div class="card-title" *ngIf="it.medias[0].title">{{it.medias[0].title}}</div>\n\n                        <div class="card-subtitle" *ngIf="it.medias[0].subtitle">{{it.medias[0].subtitle}}</div>\n\n                    </div>\n\n\n\n                    <!-- 2 pics -->\n\n                    <ion-row *ngIf="it.medias && it.medias.length===2">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[0].title">{{it.medias[0].title}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[1].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[1].title">{{it.medias[1].title}}</div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                    <!-- 3 pics -->\n\n                    <ion-row *ngIf="it.medias && it.medias.length===3">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-12 col-md-4 col-xl-4\n\n                            (click)="onClickMedia(it)">\n\n                            <div class="image-height-1" [style.background-image]="\'url(\'+it.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[0].title">{{it.medias[0].title}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-4 col-xl-4\n\n                            (click)="onClickMedia(it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[1].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-4 col-xl-4\n\n                            (click)="onClickMedia(it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[2].image+\')\'"></div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                    <!-- 4 pics -->\n\n                    <ion-row *ngIf="it.medias && it.medias.length===4">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3\n\n                            (click)="onClickMedia(it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[0].title">{{it.medias[0].title}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3\n\n                            (click)="onClickMedia(it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[1].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3\n\n                            (click)="onClickMedia(it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[2].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 col-md-6 col-xl-3\n\n                            (click)="onClickMedia(it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[3].image+\')\'"></div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                    <!-- 5+ pics -->\n\n                    <ion-row *ngIf="it.medias && it.medias.length>=5">\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[0].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[0].title">{{it.medias[0].title}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-6 (click)="onClickMedia(it)">\n\n                            <div class="image-height-2" [style.background-image]="\'url(\'+it.medias[1].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias[1].title">{{it.medias[1].title}}</div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-4 (click)="onClickMedia(it)">\n\n                            <div class="image-height-3" [style.background-image]="\'url(\'+it.medias[2].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-4 (click)="onClickMedia(it)">\n\n                            <div class="image-height-3" [style.background-image]="\'url(\'+it.medias[3].image+\')\'"></div>\n\n                        </ion-col>\n\n                        <ion-col no-padding class="padding-col card-background-page" col-4 (click)="onClickMedia(it)">\n\n                            <div class="image-height-3" [style.background-image]="\'url(\'+it.medias[4].image+\')\'"></div>\n\n                            <div class="card-title" *ngIf="it.medias.length>5">+{{(it.medias.length-5)}}</div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                    <ion-card-content *ngIf="it.content">\n\n                        <ion-card-title *ngIf="it.content.title">\n\n                            {{it.content.title}}\n\n                        </ion-card-title>\n\n                        <div *ngFor="let ph of it.content.paragraphs">\n\n                            <h1 *ngIf="ph.h1">{{ph.h1}}</h1>\n\n                            <div *ngFor="let md of ph.medias" class="card-background-page-top">\n\n                                <img class="one-image" [src]="md.image" />\n\n                                <div *ngIf="md.title" class="card-title-top">{{md.title}}</div>\n\n                                <div *ngIf="md.subtitle" class="card-subtitle-top">{{md.subtitle}}</div>\n\n                            </div>\n\n                            <h2 *ngIf="ph.h2">{{ph.h2}}</h2>\n\n                            <h3 *ngIf="ph.h3">{{ph.h3}}</h3>\n\n                            <p *ngIf="ph.p" style="text-align: justify;">{{ph.p}}</p>\n\n                        </div>\n\n                        <ion-note *ngIf="it.content.note">{{it.content.note}}</ion-note>\n\n                    </ion-card-content>\n\n\n\n                    <ion-row no-padding *ngIf="it.results">\n\n                        <ion-col align-self-center text-center>\n\n                            <div *ngIf="it.results.likes">\n\n                                <ion-icon *ngIf="it.results.likes.like" color="primary" icon-start clear small\n\n                                    name="thumbs-up"></ion-icon>\n\n                                <ion-icon *ngIf="it.results.likes.love" color="danger" icon-start clear small\n\n                                    name="heart"></ion-icon>\n\n                                <ion-icon *ngIf="it.results.likes.unlike" color="dark" icon-start clear small\n\n                                    name="thumbs-down"></ion-icon>\n\n                                <ion-icon *ngIf="it.results.likes.sad" color="royal" icon-start clear small name="sad">\n\n                                </ion-icon>\n\n                                <ion-icon *ngIf="it.results.likes.angery" color="angery" icon-start clear small\n\n                                    name="ios-sad"></ion-icon>\n\n                                <ion-note>{{(it.results.likes.like?.length\n\n                                            +it.results.likes.love?.length\n\n                                            +it.results.likes.unlike?.length\n\n                                            +it.results.likes.sad?.length\n\n                                            +it.results.likes.angery?.length\n\n                                            )}}</ion-note>\n\n                            </div>\n\n                        </ion-col>\n\n                        <ion-col align-self-center text-center>\n\n                            <ion-note *ngIf="it.results.comments&&it.results.comments.length>0">\n\n                                {{(it.results.comments.length)}} Comments</ion-note>\n\n                        </ion-col>\n\n                        <ion-col align-self-center text-center>\n\n                            <ion-note *ngIf="it.results.shares&&it.results.shares.length>0">\n\n                                {{(it.results.shares.length)}} Shares</ion-note>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    <ion-row no-padding *ngIf="it.actions">\n\n                        <ion-col text-center>\n\n                            <button *ngIf="it.actions.like" ion-button clear small color="{{it.actions.like.color}}"\n\n                                (click)="onClickActions(it.actions.like, it)" icon-start>\n\n                                <ion-icon name="{{it.actions.like.icon}}"></ion-icon>\n\n                                {{it.actions.like.name}}\n\n                            </button>\n\n                        </ion-col>\n\n                        <ion-col text-center>\n\n                            <button *ngIf="it.actions.comment" ion-button clear small\n\n                                color="{{it.actions.comment.color}}" (click)="onClickActions(it.actions.comment, it)"\n\n                                icon-start>\n\n                                <ion-icon name=\'{{it.actions.comment.icon}}\'></ion-icon>\n\n                                {{it.actions.comment.name}}\n\n                            </button>\n\n                        </ion-col>\n\n                        <ion-col text-center>\n\n                            <button *ngIf="it.actions.share" ion-button clear small color="{{it.actions.share.color}}"\n\n                                (click)="onClickActions(it.actions.share, it)" icon-start>\n\n                                <ion-icon name=\'{{it.actions.share.icon}}\'></ion-icon>\n\n                                {{it.actions.share.name}}\n\n                            </button>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                </ion-card>\n\n            </ion-col>\n\n\n\n        </ion-row>\n\n\n\n    </ion-grid>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Load dữ liệu cũ hơn...">\n\n        </ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"D:\DINHNV\MyData\LapTrinhDiDong\NODE_Baitap\node-news\get-post-news\src\pages\home-news\home-news.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_NewService__["a" /* NewsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_NewService__["a" /* NewsService */]) === "function" && _e || Object])
    ], HomeNewsPage);
    return HomeNewsPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=home-news.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostNewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_NewService__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_apiImageService__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dynamic_form_web_dynamic_form_web__ = __webpack_require__(345);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PostNewsPage = /** @class */ (function () {
    function PostNewsPage(navCtrl, navParams, modalCtrl, loadingCtrl, newsService, events, apiImageService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.newsService = newsService;
        this.events = events;
        this.apiImageService = apiImageService;
        this.owner = 1;
        this.ownerType = {
            "1": "public",
            "2": "friends",
            "3": "friends of friends",
            "4": "only me",
        };
        //callback la ham ma co gia tri res la do page dynamic-form-web tra ve
        this.callback = function (res) {
            console.log('Goi logout', res.data);
            _this.owner = res.data.owner;
            return Promise.resolve({ next: "CLOSE" });
        };
    }
    PostNewsPage.prototype.ngOnInit = function () {
        //this.userInfo = this.apiAuth.getUserInfo();
        //console.log(this.userInfo)
    };
    PostNewsPage.prototype.fileChange = function (event) {
        var _this = this;
        if (event.target && event.target.files) {
            var size_1 = 480; //default site anh
            var files_1 = event.target.files;
            var processImages = new Promise(function (resolve, reject) {
                var fileProcessed = [];
                var countFile = Object.keys(files_1).length, countResize = 0;
                if (files_1.length === 0)
                    resolve();
                for (var key in files_1) {
                    if (!isNaN(parseInt(key))) {
                        _this.apiImageService.resizeImage(files_1[key].name, files_1[key], size_1)
                            .then(function (data) {
                            fileProcessed.push(data);
                            if (++countResize >= countFile) {
                                resolve(fileProcessed);
                            }
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    }
                }
            });
            var loading_1 = this.loadingCtrl.create({
                content: 'Đang xử lý các ảnh theo định dạng lưu trữ tiết kiệm ...'
            });
            loading_1.present();
            processImages.then(function (data) {
                if (data) {
                    console.log("data: ", data);
                    _this.fileImages = data;
                }
                loading_1.dismiss();
            })
                .catch(function (err) {
                loading_1.dismiss();
            });
            setTimeout(function () {
                //1 phut ma ko x ly duoc thi thoat ra cho cai khac thuc hien
                loading_1.dismiss();
            }, 60000);
        }
    };
    PostNewsPage.prototype.onClickSelect = function () {
        var options = [];
        for (var key in this.ownerType) {
            options.push({ name: this.ownerType[key], value: key });
        }
        var form = {
            title: "Tiêu đề của trang",
            items: [
                { type: "title", name: "Tiêu đề form" },
                { type: "select", key: "owner", name: "chon chia se", value: this.owner, options: options },
                {
                    type: "button",
                    options: [
                        { name: "CHỌN", next: "CALLBACK" },
                        { name: "ĐÓNG", next: "CLOSE" }
                    ]
                }
            ]
        };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__dynamic_form_web_dynamic_form_web__["a" /* DynamicFormWebPage */], {
            parent: this,
            callback: this.callback,
            form: form
        });
        modal.present();
    };
    PostNewsPage.prototype.onShare = function () {
        var _this = this;
        var url = "https://c3.mobifone.vn/api" + "/ext-public/shot-info-url?url=" + this.content;
        this.newsService.getNews(url)
            .then(function (data) {
            var form_data = new FormData();
            form_data.append("share_status", _this.owner);
            form_data.append("content", _this.content); //nhap lieu tu text-area
            form_data.append("title", data.title);
            form_data.append("image", data.image);
            _this.newsService.postNews(form_data)
                .then(function (data) {
                console.log('receive form data:', data);
                _this.events.publish('postok');
                _this.navCtrl.pop();
            })
                .catch(function (err) {
                alert("Post không thành công!");
            });
        })
            .catch(function (err) {
            var form_data = new FormData();
            form_data.append("count_image", _this.fileImages ? _this.fileImages.length : 0);
            form_data.append("share_status", _this.owner);
            form_data.append("title", _this.content); //nhap lieu tu text-area
            form_data.append("content", _this.content); //nhap lieu tu text-area
            if (_this.fileImages) {
                _this.fileImages.forEach(function (el, idx) {
                    if (el.file && el.filename) {
                        var key = "image" + idx;
                        form_data.append(key, el.file, el.filename);
                        form_data.append("origin_date_" + key, el.last_modified);
                    }
                });
            }
            _this.newsService.postNews(form_data)
                .then(function (data) {
                console.log('receive form data:', data);
                _this.events.publish('postok');
                _this.navCtrl.pop();
            })
                .catch(function (err) {
                alert("Post không thành công!");
            });
        });
    };
    PostNewsPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    PostNewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-post-news',template:/*ion-inline-start:"D:\DINHNV\MyData\LapTrinhDiDong\NODE_Baitap\node-news\get-post-news\src\pages\post-news\post-news.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Post News</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<ion-grid>\n  <ion-row>\n    <ion-col>\n      <ion-item>\n        <ion-avatar item-start><img [src]="userInfo?.data?.image"></ion-avatar>\n        <h1>{{userInfo?.data?.nickname?userInfo?.data?.nickname:userInfo?.username}}</h1>\n        <h2>{{userInfo?.data?.fullname}}</h2>\n        <ion-note item-end>{{ownerType[owner]}}</ion-note>\n        <button item-end icon-only ion-button clear small (click)=onClickSelect()>\n          <ion-icon name="globe"></ion-icon>\n        </button>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <ion-textarea [(ngModel)]="content" #txtStatus rows="1" placeholder="Ban dang nghi gi?" autosize style="border: 1px solid rgb(184, 179, 179)">\n      </ion-textarea>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col col-2>\n      <button ion-button icon-start round>\n        <input class="file-over" type="file" multiple accept="image/*" (change)="fileChange($event)">\n        <ion-icon name="images"></ion-icon>\n        Photo/Video\n      </button>\n    </ion-col>\n  </ion-row>\n\n  <!-- 1 pics -->\n  <div class="card-background-page" *ngIf="fileImages?.length==1">\n    <img [src]="fileImages[0].image" />\n    <div class="card-title">{{fileImages[0].title}}</div>\n    <div class="card-subtitle">{{fileImages[0].subtitle}}</div>\n  </div>\n\n  <!-- 2 pics -->\n  <ion-row *ngIf="fileImages?.length==2">\n    <ion-col no-padding class="padding-col card-background-page" col-6>\n      <div class="image-height-2" [style.background-image]="\'url(\'+fileImages[0].image+\')\'"></div>\n      <div class="card-title">{{fileImages[0].title}}</div>\n      <div class="card-subtitle">{{fileImages[0].subtitle}}</div>\n    </ion-col>\n    <ion-col no-padding class="padding-col card-background-page" col-6>\n      <div class="image-height-2" [style.background-image]="\'url(\'+fileImages[1].image+\')\'"></div>\n      <div class="card-title">{{fileImages[1].title}}</div>\n      <div class="card-subtitle">{{fileImages[1].subtitle}}</div>\n    </ion-col>\n  </ion-row>\n\n  <!-- 3 pics -->\n  <ion-row *ngIf="fileImages?.length==3">\n    <ion-col no-padding class="padding-col card-background-page" col-12>\n      <div class="image-height-1" [style.background-image]="\'url(\'+fileImages[0].image+\')\'"></div>\n      <div class="card-title" *ngIf="fileImages[0].title">{{fileImages[0].title}}</div>\n      <div class="card-subtitle" *ngIf="fileImages[0].subtitle">{{fileImages[0].subtitle}}</div>\n    </ion-col>\n    <ion-col no-padding class="padding-col card-background-page" col-6>\n      <div class="image-height-2" [style.background-image]="\'url(\'+fileImages[1].image+\')\'"></div>\n    </ion-col>\n    <ion-col no-padding class="padding-col card-background-page" col-6>\n      <div class="image-height-2" [style.background-image]="\'url(\'+fileImages[2].image+\')\'"></div>\n    </ion-col>\n  </ion-row>\n\n  <!-- 4 pics -->\n  <ion-row *ngIf="fileImages?.length==4">\n    <ion-col no-padding class="padding-col card-background-page" col-6>\n      <div class="image-height-2" [style.background-image]="\'url(\'+fileImages[0].image+\')\'"></div>\n      <div class="card-title" *ngIf="fileImages[0].title">{{fileImages[0].title}}</div>\n      <div class="card-subtitle" *ngIf="fileImages[0].subtitle">{{fileImages[0].subtitle}}</div>\n    </ion-col>\n    <ion-col no-padding class="padding-col card-background-page" col-6>\n      <div class="image-height-2" [style.background-image]="\'url(\'+fileImages[1].image+\')\'"></div>\n      <div class="card-title" *ngIf="fileImages[1].title">{{fileImages[1].title}}</div>\n      <div class="card-subtitle" *ngIf="fileImages[1].subtitle">{{fileImages[1].subtitle}}</div>\n    </ion-col>\n    <ion-col no-padding class="padding-col card-background-page" col-6>\n      <div class="image-height-2" [style.background-image]="\'url(\'+fileImages[2].image+\')\'"></div>\n    </ion-col>\n    <ion-col no-padding class="padding-col card-background-page" col-6>\n      <div class="image-height-2" [style.background-image]="\'url(\'+fileImages[3].image+\')\'"></div>\n    </ion-col>\n  </ion-row>\n\n  <!-- 5+ pics -->\n  <ion-row *ngIf="fileImages?.length>=5">\n    <ion-col no-padding class="padding-col card-background-page" col-6>\n      <div class="image-height-2" [style.background-image]="\'url(\'+fileImages[0].image+\')\'"></div>\n      <div class="card-title" *ngIf="fileImages[0].title">{{fileImages[0].title}}</div>\n      <div class="card-subtitle" *ngIf="fileImages[0].subtitle">{{fileImages[0].subtitle}}</div>\n    </ion-col>\n    <ion-col no-padding class="padding-col card-background-page" col-6>\n      <div class="image-height-2" [style.background-image]="\'url(\'+fileImages[1].image+\')\'"></div>\n      <div class="card-title" *ngIf="fileImages[1].title">{{fileImages[1].title}}</div>\n      <div class="card-subtitle" *ngIf="fileImages[1].subtitle">{{fileImages[1].subtitle}}</div>\n    </ion-col>\n    <ion-col no-padding class="padding-col card-background-page" col-4>\n      <div class="image-height-3" [style.background-image]="\'url(\'+fileImages[2].image+\')\'"></div>\n    </ion-col>\n    <ion-col no-padding class="padding-col card-background-page" col-4>\n      <div class="image-height-3" [style.background-image]="\'url(\'+fileImages[3].image+\')\'"></div>\n    </ion-col>\n    <ion-col no-padding class="padding-col card-background-page" col-4>\n      <div class="image-height-3" [style.background-image]="\'url(\'+fileImages[4].image+\')\'"></div>\n      <div class="card-title" *ngIf="fileImages.length>5">+{{(fileImages.length-5)}}</div>\n    </ion-col>\n  </ion-row>\n  <button ion-button full (click)="onShare()" [disabled]="txtStatus.value === \'\'">Share</button>\n  <button ion-button full (click)="cancel()">Cancel</button>\n</ion-grid>\n</ion-content>'/*ion-inline-end:"D:\DINHNV\MyData\LapTrinhDiDong\NODE_Baitap\node-news\get-post-news\src\pages\post-news\post-news.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services_NewService__["a" /* NewsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_NewService__["a" /* NewsService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__services_apiImageService__["a" /* ApiImageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_apiImageService__["a" /* ApiImageService */]) === "function" && _g || Object])
    ], PostNewsPage);
    return PostNewsPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=post-news.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiImageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_exif_js__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_exif_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_exif_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * ham base64 ma hoa filename de truyen du lieu file khong bi unicode...
 */
var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
            u = a = 64;
        }
        else if (isNaN(i)) {
            a = 64;
        }
        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
    } return t; }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9]/g, ""); while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
            t = t + String.fromCharCode(r);
        }
        if (a != 64) {
            t = t + String.fromCharCode(i);
        }
    } t = Base64._utf8_decode(t); return t; }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r);
        }
        else if (r > 127 && r < 2048) {
            t += String.fromCharCode(r >> 6 | 192);
            t += String.fromCharCode(r & 63 | 128);
        }
        else {
            t += String.fromCharCode(r >> 12 | 224);
            t += String.fromCharCode(r >> 6 & 63 | 128);
            t += String.fromCharCode(r & 63 | 128);
        }
    } return t; }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = 0, c1 = 0, c2 = 0; while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r);
            n++;
        }
        else if (r > 191 && r < 224) {
            c2 = e.charCodeAt(n + 1);
            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
            n += 2;
        }
        else {
            c2 = e.charCodeAt(n + 1);
            var c3 = e.charCodeAt(n + 2);
            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            n += 3;
        }
    } return t; } };
var orientation_standard = {
    1: 0,
    3: 180,
    6: 90,
    8: 270
};
var ApiImageService = /** @class */ (function () {
    function ApiImageService() {
    }
    /**
     * ham nay chuyen doi mot ten file unicode thanh file duoc ma hoa
     * @param filename
     */
    ApiImageService.prototype.encodeFilename = function (filename) {
        if (filename.lastIndexOf('.') > 0) {
            return Base64.encode(filename.slice(0, filename.lastIndexOf('.'))) + '.' + filename.replace(/^.*\./, '');
        }
        else {
            return Base64.encode(filename);
        }
    };
    /**
     * chuyen doi anh tu url sang base64 anh nho hon
     * @param url
     * @param newSize
     */
    ApiImageService.prototype.createBase64Image = function (url, newSize) {
        return new Promise(function (resolve, reject) {
            try {
                var canvas_1 = document.createElement('canvas');
                var context_1 = canvas_1.getContext('2d');
                var img_1 = document.createElement('img');
                var maxW_1 = newSize;
                var maxH_1 = newSize;
                img_1.crossOrigin = "anonymous"; //quan trong de load image from url
                img_1.src = url;
                img_1.onload = function () {
                    var iw = img_1.width;
                    var ih = img_1.height;
                    var scale = Math.min((maxW_1 / iw), (maxH_1 / ih));
                    var iwScaled = (scale <= 0 || scale > 1) ? iw : iw * scale;
                    var ihScaled = (scale <= 0 || scale > 1) ? ih : ih * scale;
                    //giam kich thuoc
                    canvas_1.width = iwScaled;
                    canvas_1.height = ihScaled;
                    context_1.drawImage(img_1, 0, 0, iwScaled, ihScaled);
                    resolve(canvas_1.toDataURL());
                };
            }
            catch (err) {
                resolve();
            }
        });
    };
    //dua vao doi tuong file image
    //tra ve doi tuong file image co kich co nho hon
    /**
     * ham nay thuc hien giam kich co anh de tiet kiem dung luong truyen
     *
     * @param filename
     * @param file
     * @param newSize
     */
    ApiImageService.prototype.resizeImage = function (filename, file, newSize) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (file) {
                var allMetaData_1;
                var originOrientation_1;
                __WEBPACK_IMPORTED_MODULE_1_exif_js__["getData"](file, function () {
                    allMetaData_1 = __WEBPACK_IMPORTED_MODULE_1_exif_js__["getAllTags"](this);
                    originOrientation_1 = allMetaData_1.Orientation;
                    //console.log("get Tags Orientation",allMetaData);
                });
                try {
                    var canvas_2 = document.createElement('canvas');
                    var context_2 = canvas_2.getContext('2d');
                    var img_2 = document.createElement('img');
                    var maxW_2 = newSize;
                    var maxH_2 = newSize;
                    img_2.src = URL.createObjectURL(file);
                    img_2.onload = function () {
                        var iw = img_2.width;
                        var ih = img_2.height;
                        var scale = Math.min((maxW_2 / iw), (maxH_2 / ih));
                        var iwScaled = (scale <= 0 || scale > 1) ? iw : iw * scale;
                        var ihScaled = (scale <= 0 || scale > 1) ? ih : ih * scale;
                        //giam kich thuoc
                        canvas_2.width = iwScaled;
                        canvas_2.height = ihScaled;
                        context_2.drawImage(img_2, 0, 0, iwScaled, ihScaled);
                        //quay
                        var imageNew = document.createElement('img');
                        imageNew.src = canvas_2.toDataURL();
                        imageNew.onload = function () {
                            if (originOrientation_1 > 2 && originOrientation_1 <= 4) {
                                //console.log('rotate 180');
                                canvas_2.width = imageNew.width;
                                canvas_2.height = imageNew.height;
                                context_2.rotate(180 * Math.PI / 180);
                                context_2.drawImage(imageNew, -imageNew.width, -imageNew.height);
                            }
                            else if (originOrientation_1 > 4 && originOrientation_1 <= 7) {
                                //rotate 90
                                //console.log('rotate 90');
                                canvas_2.width = imageNew.height;
                                canvas_2.height = imageNew.width;
                                context_2.rotate(90 * Math.PI / 180);
                                context_2.drawImage(imageNew, 0, -imageNew.height);
                            }
                            else if (originOrientation_1 > 7 && originOrientation_1 <= 9) {
                                //rotate 270
                                //console.log('rotate 270');
                                canvas_2.width = imageNew.height;
                                canvas_2.height = imageNew.width;
                                context_2.rotate(270 * Math.PI / 180);
                                context_2.drawImage(imageNew, -imageNew.width, 0);
                            }
                            canvas_2.toBlob(function (blob) {
                                var reader = new FileReader();
                                reader.readAsArrayBuffer(blob);
                                reader.onload = function () {
                                    var newFile = new Blob([reader.result], { type: 'image/jpeg' });
                                    resolve({
                                        image: canvas_2.toDataURL(),
                                        file: (newSize === 0 ? file : newFile) //formData post size=0 get Origin
                                        ,
                                        filename: _this.encodeFilename(filename),
                                        h1: _this.encodeFilename(filename),
                                        p: " ***Kích cỡ cũ: " + file.size
                                            + "(" + img_2.width + "x" + img_2.height + ")"
                                            + " * Kiểu file cũ: " + file.type
                                            + " * Hướng ảnh chụp: " + orientation_standard[(originOrientation_1 ? originOrientation_1 : 1)]
                                            + "(" + (originOrientation_1 ? "(" + originOrientation_1 + ")" : "1") + ")"
                                            + " ***Kích cỡ mới: BIN=" + newFile.size
                                            + "(" + canvas_2.width + "x" + canvas_2.height + ") Base64=" + canvas_2.toDataURL().length + ""
                                            + " * Kiểu file mới: " + newFile.type
                                            + " ***Các tham số tạo ảnh: "
                                            + (allMetaData_1 && allMetaData_1.Make ? " * Hãng sx máy ảnh: " + allMetaData_1.Make : "")
                                            + (allMetaData_1 && allMetaData_1.Make ? " * Đời máy ảnh: " + allMetaData_1.Model : "")
                                            + (allMetaData_1 && allMetaData_1.Software ? " * Phần mềm: " + allMetaData_1.Software : "")
                                            + (allMetaData_1 && allMetaData_1.DateTime ? " * Ngày giờ: " + allMetaData_1.DateTime : "")
                                            + (allMetaData_1 && allMetaData_1.DateTimeOriginal ? " * Ngày giờ gốc: " + allMetaData_1.DateTimeOriginal : "")
                                            + (allMetaData_1 && allMetaData_1.DateTimeDigitized ? " * Ngày giờ số hóa: " + allMetaData_1.DateTimeDigitized : "")
                                            + (allMetaData_1 && allMetaData_1.GPSLatitude ? " * Vĩ Độ: " + allMetaData_1.GPSLatitude + allMetaData_1.GPSLatitudeRef : "")
                                            + (allMetaData_1 && allMetaData_1.GPSLongitude ? " * Kinh Độ: " + allMetaData_1.GPSLongitude + allMetaData_1.GPSLongitudeRef : "")
                                            + (allMetaData_1 && allMetaData_1.GPSDateStamp ? " * Ngày giờ tọa độ: " + allMetaData_1.GPSDateStamp + allMetaData_1.GPSTimeStamp : ""),
                                        h3: (file.lastModified ? new Date(file.lastModified).toISOString() : file.lastModifiedDate),
                                        note: JSON.stringify(allMetaData_1),
                                        last_modified: file.lastModified ? file.lastModified : file.lastModifiedDate.getTime(),
                                        subtitle: (file.lastModified ? new Date(file.lastModified).toLocaleDateString() : file.lastModifiedDate) + (originOrientation_1 ? "(" + originOrientation_1 + ")" : ""),
                                        width: canvas_2.width //cho biet anh nam doc hay nam ngang
                                        ,
                                        height: canvas_2.height,
                                        orientation_old: originOrientation_1,
                                        size_old: file.size,
                                        type_old: file.type,
                                        size: newFile.size,
                                        type: newFile.type
                                    });
                                };
                            });
                        };
                    };
                }
                catch (err) {
                    reject(err);
                }
            }
            else {
                reject("No file!");
            }
        });
    };
    ApiImageService.prototype.noResizeImage = function (filename, file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (file) {
                var allMetaData_2;
                var originOrientation_2;
                __WEBPACK_IMPORTED_MODULE_1_exif_js__["getData"](file, function () {
                    allMetaData_2 = __WEBPACK_IMPORTED_MODULE_1_exif_js__["getAllTags"](this);
                    originOrientation_2 = allMetaData_2.Orientation;
                });
                try {
                    var canvas_3 = document.createElement('canvas');
                    var context_3 = canvas_3.getContext('2d');
                    var img_3 = document.createElement('img');
                    img_3.src = URL.createObjectURL(file);
                    img_3.onload = function () {
                        canvas_3.width = img_3.width;
                        canvas_3.height = img_3.height;
                        context_3.drawImage(img_3, 0, 0, img_3.width, img_3.height);
                        //quay
                        var imageNew = document.createElement('img');
                        imageNew.src = canvas_3.toDataURL();
                        imageNew.onload = function () {
                            if (originOrientation_2 > 2 && originOrientation_2 <= 4) {
                                //console.log('rotate 180');
                                canvas_3.width = imageNew.width;
                                canvas_3.height = imageNew.height;
                                context_3.rotate(180 * Math.PI / 180);
                                context_3.drawImage(imageNew, -imageNew.width, -imageNew.height);
                            }
                            else if (originOrientation_2 > 4 && originOrientation_2 <= 7) {
                                //rotate 90
                                //console.log('rotate 90');
                                canvas_3.width = imageNew.height;
                                canvas_3.height = imageNew.width;
                                context_3.rotate(90 * Math.PI / 180);
                                context_3.drawImage(imageNew, 0, -imageNew.height);
                            }
                            else if (originOrientation_2 > 7 && originOrientation_2 <= 9) {
                                //rotate 270
                                //console.log('rotate 270');
                                canvas_3.width = imageNew.height;
                                canvas_3.height = imageNew.width;
                                context_3.rotate(270 * Math.PI / 180);
                                context_3.drawImage(imageNew, -imageNew.width, 0);
                            }
                            canvas_3.toBlob(function (blob) {
                                var reader = new FileReader();
                                reader.readAsArrayBuffer(blob);
                                reader.onload = function () {
                                    var newFile = new Blob([reader.result], { type: 'image/jpeg' });
                                    resolve({
                                        image: canvas_3.toDataURL() //base64 for view and json post
                                        ,
                                        file: newFile //formData post size=0 get Origin
                                        ,
                                        filename: _this.encodeFilename(filename),
                                        h1: _this.encodeFilename(filename),
                                        p: " ***Kích cỡ cũ: " + file.size
                                            + "(" + img_3.width + "x" + img_3.height + ")"
                                            + " * Kiểu file cũ: " + file.type
                                            + " * Hướng ảnh chụp: " + orientation_standard[(originOrientation_2 ? originOrientation_2 : 1)]
                                            + "(" + (originOrientation_2 ? "(" + originOrientation_2 + ")" : "1") + ")"
                                            + " ***Kích cỡ mới: BIN=" + newFile.size
                                            + "(" + canvas_3.width + "x" + canvas_3.height + ") Base64=" + canvas_3.toDataURL().length + ""
                                            + " * Kiểu file mới: " + newFile.type
                                            + " ***Các tham số tạo ảnh: "
                                            + (allMetaData_2 && allMetaData_2.Make ? " * Hãng sx máy ảnh: " + allMetaData_2.Make : "")
                                            + (allMetaData_2 && allMetaData_2.Make ? " * Đời máy ảnh: " + allMetaData_2.Model : "")
                                            + (allMetaData_2 && allMetaData_2.Software ? " * Phần mềm: " + allMetaData_2.Software : "")
                                            + (allMetaData_2 && allMetaData_2.DateTime ? " * Ngày giờ: " + allMetaData_2.DateTime : "")
                                            + (allMetaData_2 && allMetaData_2.DateTimeOriginal ? " * Ngày giờ gốc: " + allMetaData_2.DateTimeOriginal : "")
                                            + (allMetaData_2 && allMetaData_2.DateTimeDigitized ? " * Ngày giờ số hóa: " + allMetaData_2.DateTimeDigitized : "")
                                            + (allMetaData_2 && allMetaData_2.GPSLatitude ? " * Vĩ Độ: " + allMetaData_2.GPSLatitude + allMetaData_2.GPSLatitudeRef : "")
                                            + (allMetaData_2 && allMetaData_2.GPSLongitude ? " * Kinh Độ: " + allMetaData_2.GPSLongitude + allMetaData_2.GPSLongitudeRef : "")
                                            + (allMetaData_2 && allMetaData_2.GPSDateStamp ? " * Ngày giờ tọa độ: " + allMetaData_2.GPSDateStamp + allMetaData_2.GPSTimeStamp : ""),
                                        h3: (file.lastModified ? new Date(file.lastModified).toISOString() : file.lastModifiedDate),
                                        note: JSON.stringify(allMetaData_2),
                                        last_modified: file.lastModified ? file.lastModified : file.lastModifiedDate.getTime(),
                                        subtitle: (file.lastModified ? new Date(file.lastModified).toLocaleDateString() : file.lastModifiedDate) + (originOrientation_2 ? "(" + originOrientation_2 + ")" : ""),
                                        width: canvas_3.width //cho biet anh nam doc hay nam ngang
                                        ,
                                        height: canvas_3.height,
                                        orientation_old: originOrientation_2,
                                        size_old: file.size,
                                        type_old: file.type,
                                        size: newFile.size,
                                        type: newFile.type
                                    });
                                };
                            });
                        };
                    };
                }
                catch (err) {
                    reject(err);
                }
            }
            else {
                reject("No file!");
            }
        });
    };
    ApiImageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ApiImageService);
    return ApiImageService;
}());

//# sourceMappingURL=apiImageService.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicFormWebPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DynamicFormWebPage = /** @class */ (function () {
    function DynamicFormWebPage(platform, viewCtrl, navCtrl, loadingCtrl, navParams) {
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.dynamicForm = {
            title: "Tiêu đề của trang",
            home_disable: false //nut home
            ,
            buttons: [
                { color: "danger", icon: "close", next: "CLOSE" }
            ],
            items: [
                { type: "avatar", name: "Thông tin cá nhân avatar", hint: "Avatar", url: "https://www.w3schools.com/howto/img_forest.jpg" },
                { type: "title", name: "Tiêu đề form" },
                { type: "check", key: "check_ok", name: "Check hay không chọn?", value: true },
                { type: "range", key: "range_number", name: "Thanh Trượt", icon: "contrast", value: 50, min: 0, max: 100 },
                { type: "toggle", key: "check_toggle", name: "Chọn hay không chọn Toggle?", icon: "plane" },
                { type: "radio", key: "select_radio", name: "Chọn radio cái nào", icon: "plane", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] },
                { type: "select", key: "select_1", name: "Chọn 1 cái nào", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] },
                { type: "select_multiple", key: "select_n", name: "Chọn nhiều cái nào", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] },
                { type: "image", name: "Ảnh cá nhân", hint: "image viewer", url: "https://www.w3schools.com/howto/img_forest.jpg" },
                { type: "text", key: "username", disabled: true, name: "username", hint: "Số điện thoại di động 9 số bỏ số 0 ở đầu", input_type: "userName", icon: "information-circle", validators: [{ required: true, min: 9, max: 9, pattern: "^[0-9]*$" }] },
                { type: "password", key: "password", name: "password", hint: "Mật khẩu phải có chữ hoa, chữ thường, ký tự đặc biệt, số", input_type: "password", icon: "information-circle", validators: [{ required: true, min: 6, max: 20 }] },
                { type: "text", key: "name", name: "Họ và tên", input_type: "text", icon: "person" },
                { type: "text", key: "phone", name: "Điện thoại", hint: "Yêu cầu định dạng số điện thoại nhé", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }] },
                { type: "text", key: "email", name: "email", hint: "Yêu cầu định dạng email nhé", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }] },
                { type: "datetime", key: "start_date", name: "Ngày bắt đầu", hint: "Chọn ngày", display: "DD/MM/YYYY", picker: "DD MM YYYY" },
                { type: "datetime", key: "start_time", name: "Thời gian bắt đầu", hint: "Chọn thời gian", display: "HH:mm:ss", picker: "HH:mm:ss" },
                { type: "text_area", key: "text_area", name: "Nội dung nhập", hint: "Nhập nhiều dòng" },
                { type: "details",
                    details: [
                        {
                            name: "Mã khách hàng",
                            value: "R012234949883"
                        },
                        {
                            name: "Tên khách hàng",
                            value: "Nguyễn Văn B"
                        },
                        {
                            name: "Địa chỉ",
                            value: "263 Nguyễn Văn Linh, Đà nẵng, Việt Nam"
                        },
                        {
                            name: "Hình thức thanh toán",
                            value: "Tiền mặt"
                        },
                    ]
                },
                {
                    type: "button",
                    options: [
                        { name: "Reset", next: "RESET" },
                        { name: "Exit", next: "EXIT" },
                        { name: "Close", next: "CLOSE" },
                        { name: "Home", next: "HOME" },
                        { name: "Back", next: "CALLBACK" },
                        { name: "Continue", next: "CONTINUE" },
                        { name: "Register", next: "CALLBACK", url: "https://chonsoc3.mobifone.vn/ionic/", command: "USER_LOGIN_REDIRECT" },
                        { name: "LOGIN", next: "NEXT", url: "https://chonsoc3.mobifone.vn/ionic/", command: "USER_CHECK_EXISTS", token: true }
                    ]
                }
            ]
        };
        this.initValues = [];
        this.password_type = 'password';
        this.eye = "eye";
    }
    DynamicFormWebPage_1 = DynamicFormWebPage;
    DynamicFormWebPage.prototype.ngOnInit = function () {
        var _this = this;
        this.dynamicForm = this.navParams.get("form") ? this.navParams.get("form") : this.dynamicForm;
        if (this.dynamicForm.items) {
            this.dynamicForm.items.forEach(function (el, idx) {
                _this.initValues.push({
                    idx: idx,
                    value: el.value
                });
            });
        }
        this.callback = this.navParams.get("callback");
        this.step = this.navParams.get("step");
        this.parent = this.navParams.get("parent");
    };
    DynamicFormWebPage.prototype.resetForm = function () {
        var _this = this;
        if (this.dynamicForm.items) {
            this.dynamicForm.items.forEach(function (el, idx) {
                if (el.value !== undefined) {
                    if (_this.initValues.find(function (x) { return x.idx == idx; }).value === undefined) {
                        el.value = '';
                    }
                    else {
                        el.value = _this.initValues.find(function (x) { return x.idx == idx; }).value;
                    }
                }
            });
        }
    };
    // btn ẩn hiện mật khẩu
    DynamicFormWebPage.prototype.togglePasswordMode = function () {
        this.eye = this.eye === 'eye' ? 'eye-off' : 'eye';
        this.password_type = this.password_type === 'text' ? 'password' : 'text';
    };
    DynamicFormWebPage.prototype.onClickHeader = function (btn) {
        btn.next_data = {
            step: this.step,
            button: btn
        };
        this.next(btn);
    };
    DynamicFormWebPage.prototype.onClickGoHome = function () {
        if (this.parent)
            this.navCtrl.popToRoot();
    };
    // Xử lý sự kiện click button theo id
    DynamicFormWebPage.prototype.onClick = function (btn) {
        //console.log('command', btn.url, btn.command);
        var valid = false;
        var results = []; //id,value
        var keyResults = {}; //{key:value}
        //chi nhung action xu ly du lieu form moi check validators
        if (btn.next === 'CALLBACK'
            || btn.next === 'NEXT') {
            if (btn.command !== "EXIT") {
                this.dynamicForm.items.some(function (el) {
                    var validatorFns = [];
                    if (el.validators) {
                        el.validators.forEach(function (req) {
                            if (req.required)
                                validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required);
                            if (req.min)
                                validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(req.min));
                            if (req.max)
                                validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(req.max));
                            if (req.pattern)
                                validatorFns.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(req.pattern));
                        });
                    }
                    var control = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](el.value, validatorFns);
                    el.invalid = control.invalid;
                    valid = !el.invalid;
                    if (valid
                        && el.key
                        && el.value) {
                        Object.defineProperty(keyResults, el.key, { value: el.value, writable: false, enumerable: true });
                    }
                    else if (valid
                        && el.id
                        && el.value
                        && el.type !== "title"
                        && el.type !== "image"
                        && el.type !== "avatar"
                        && el.type !== "button") {
                        results.push({
                            id: el.id,
                            value: el.value
                        });
                    }
                    //console.log(el.name, el.id, el.value, 'control:', control.invalid, control.valid);
                    return el.invalid;
                });
            }
            else {
                btn.next_data = {
                    step: this.step,
                    button: btn //vi la callback tri tra ket qua cho callback
                };
                this.next(btn);
                return;
            }
        }
        else {
            this.next(btn);
            return;
        }
        if (valid) {
            if (btn.url) {
            }
            else {
                btn.next_data = {
                    step: this.step,
                    button: btn,
                    data: keyResults
                };
                this.next(btn);
            }
        }
        else {
            //console.log('Form Invalid!');
        }
    };
    DynamicFormWebPage.prototype.next = function (btn) {
        var _this = this;
        if (btn) {
            if (btn.next == 'EXIT') {
                this.platform.exitApp();
            }
            else if (btn.next == 'RESET') {
                this.resetForm();
            }
            else if (btn.next == 'CLOSE') {
                if (this.parent)
                    this.viewCtrl.dismiss(btn.next_data);
            }
            else if (btn.next == 'HOME') {
                if (this.parent)
                    this.navCtrl.popToRoot();
            }
            else if (btn.next == 'BACK') {
                if (this.parent)
                    this.navCtrl.pop();
            }
            else if (btn.next == 'CALLBACK') {
                if (this.callback) {
                    this.callback(btn.next_data)
                        .then(function (nextStep) { return _this.next(nextStep); });
                }
                else {
                    if (this.parent)
                        this.navCtrl.pop();
                }
            }
            else if (btn.next == 'NEXT' && btn.next_data && btn.next_data.data) {
                btn.next_data.callback = this.callback; //gan lai cac function object
                btn.next_data.parent = this.parent; //gan lai cac function object
                btn.next_data.form = btn.next_data.data; //gan du lieu tra ve tu server
                this.navCtrl.push(DynamicFormWebPage_1, btn.next_data);
            }
        }
    };
    DynamicFormWebPage = DynamicFormWebPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dynamic-form-web',template:/*ion-inline-start:"D:\DINHNV\MyData\LapTrinhDiDong\NODE_Baitap\node-news\get-post-news\src\pages\dynamic-form-web\dynamic-form-web.html"*/'<ion-header *ngIf="dynamicForm.title">\n\n	<ion-toolbar>\n\n		<ion-buttons left *ngIf="!dynamicForm?.home_disable">\n\n			<button ion-button icon-only color="primary" (click)="onClickGoHome()">\n\n				<ion-icon name="home"></ion-icon>\n\n			</button>\n\n		</ion-buttons>\n\n		<ion-title>{{dynamicForm.title}}</ion-title>\n\n		<ion-buttons right *ngFor="let btn of dynamicForm?.buttons">\n\n			<button ion-button icon-only color="{{btn.color}}" (click)="onClickHeader(btn)">\n\n				<ion-icon name="{{btn.icon}}"></ion-icon>\n\n			</button>\n\n		</ion-buttons>\n\n	</ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content no-padding class="background-page gradient">\n\n	<ion-grid> \n\n		<ion-row>\n\n			<ion-col class="background-card gradient grid-border" text-center col-12 offset-xl-3 col-xl-6 offset-lg-3 col-lg-6\n\n			 offset-md-2 col-md-8 col-sm-12>\n\n\n\n				<ion-list *ngFor="let it of dynamicForm.items">\n\n\n\n					<!-- title -->\n\n					<ion-item class="background-card" *ngIf="it.type == \'title\'">\n\n						<ion-label class="title-item">{{it.name}}</ion-label>\n\n					</ion-item>\n\n\n\n					<!-- form chi tiet -->\n\n					<ion-list class="input-item" *ngIf="it.type == \'details\'">\n\n						<ion-item *ngFor="let dt of it.details">\n\n							<strong item-start>\n\n								{{dt.name}}\n\n							</strong>\n\n							<ion-label text-wrap item-end *ngIf="dt.pipe_date">\n\n								{{dt.value | date:dt.pipe_date}}\n\n							</ion-label>\n\n							<ion-label text-wrap item-end *ngIf="!dt.pipe_date">\n\n								{{dt.value}}\n\n							</ion-label>\n\n						</ion-item>\n\n					</ion-list>\n\n\n\n					<!-- title with avatar -->\n\n					<ion-item class="background-card" *ngIf="it.type == \'avatar\'">\n\n						<ion-avatar item-start><img [src]="it.url"></ion-avatar>\n\n						<h1 item-left class="title-item">{{it.name}}</h1>\n\n					</ion-item>\n\n\n\n					<!-- image -->\n\n					<ion-grid *ngIf="it.type == \'image\'">\n\n						<ion-row>\n\n							<ion-col style="text-align: center;">\n\n								<img *ngIf="!it.width||!it.height" [src]="it.url">\n\n								<img *ngIf="it.width&&it.height" [width]="it.width" [height]="it.height" [src]="it.url">\n\n							</ion-col>\n\n						</ion-row>\n\n					</ion-grid>\n\n\n\n					<!-- input text -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'text\'">\n\n						<ion-label floating color="danger" text-wrap style="text-align: justify;" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n						<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n						<ion-input type="{{it.input_type}}" placeholder={{it.name?it.name:it.hint}} [(ngModel)]="it.value" [disabled]="it.disabled"></ion-input>\n\n					</ion-item>\n\n\n\n					<!-- input text-area -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'text_area\'">\n\n						<ion-label floating color="danger" text-wrap style="text-align: justify;" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n						<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n						<ion-textarea rows="6" cols="20" placeholder={{it.name?it.name:it.hint}} [(ngModel)]="it.value"></ion-textarea>\n\n					</ion-item>\n\n\n\n					<!-- input password -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'password\'">\n\n						<ion-label floating color="danger" text-wrap style="text-align: justify;" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n						<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n						<ion-input [type]="password_type" placeholder={{it.name?it.name:it.hint}} [(ngModel)]="it.value"></ion-input>\n\n						<button ion-button clear color="dark" type="button" item-right (click)="togglePasswordMode()">\n\n							<ion-icon name="{{eye}}"> </ion-icon>\n\n						</button>\n\n					</ion-item>\n\n\n\n					<!-- check box -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'check\'">\n\n						<ion-label color="primary" text-wrap style="text-align: justify;">{{it.name?it.name:it.hint}}</ion-label>\n\n						<ion-checkbox color="primary" [(ngModel)]="it.value"></ion-checkbox>\n\n					</ion-item>\n\n\n\n					<!-- radio select -->\n\n					<ion-list *ngIf="it.type == \'radio\'" radio-group [(ngModel)]="it.value">\n\n						<ion-list-header>\n\n							<ion-icon item-start name="{{it.icon}}"></ion-icon>\n\n							<ion-label color="dark" text-wrap style="text-align: justify;">{{it.name?it.name:it.hint}}</ion-label>\n\n						</ion-list-header>\n\n						<ion-item *ngFor="let myRad of it.options">\n\n							<ion-label color="secondary" text-wrap style="text-align: justify;">{{myRad.name}}</ion-label>\n\n							<ion-radio value="{{myRad.value}}"></ion-radio>\n\n						</ion-item>\n\n					</ion-list>\n\n\n\n					<!-- single select -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'select\'">\n\n						<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n						<ion-label color="primary" text-wrap style="text-align: justify;">{{it.name?it.name:it.hint}}</ion-label>\n\n						<ion-select [(ngModel)]="it.value" style="background-color: rgb(230, 103, 198); color:whitesmoke; border-radius: 1em;">\n\n							<ion-option *ngFor="let mySet of it.options" value="{{mySet.value}}" >{{mySet.name}}</ion-option>\n\n						</ion-select>\n\n					</ion-item>\n\n	\n\n\n\n					<!-- multiple select -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'select_multiple\'">\n\n						<ion-icon item-left name="{{it.icon}}" *ngIf="it.icon"></ion-icon>\n\n						<ion-label color="primary" text-wrap style="text-align: justify;">{{it.name?it.name:it.hint}}</ion-label>\n\n						<ion-select [(ngModel)]="it.value" multiple="true" style="background-color: rgb(103, 112, 230); color:whitesmoke; border-radius: 1em;">\n\n							<ion-option *ngFor="let mySet of it.options" value="{{mySet.value}}">{{mySet.name}}</ion-option>\n\n						</ion-select>\n\n					</ion-item>\n\n\n\n					<!-- toggle check -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'toggle\'">\n\n						<ion-icon name="{{it.icon}}" item-start color="primary"></ion-icon>\n\n						<ion-label color="primary" text-wrap style="text-align: justify;">{{it.name?it.name:it.hint}}</ion-label>\n\n						<ion-toggle color="{{it.color}}" [(ngModel)]="it.value"></ion-toggle>\n\n					</ion-item>\n\n\n\n					<!-- range adjust -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'range\'">\n\n						<ion-range min="{{it.min}}" max="{{it.max}}" pin="true" snaps="true" [(ngModel)]="it.value" color="primary">\n\n							<ion-icon range-left small name="{{it.icon}}"></ion-icon>\n\n							<ion-icon range-right name="{{it.icon}}"></ion-icon>\n\n						</ion-range>\n\n					</ion-item>\n\n\n\n					<!-- rang title with value -->\n\n					<ion-item class="input-item" *ngIf="it.type == \'range-text\'">\n\n						<ion-label color="primary" *ngIf="it.name&&it.name.length>20" text-wrap style="text-align: justify;">{{it.name}}</ion-label>\n\n						<ion-range min="0" max="5"  color="secondary" snaps="true" [(ngModel)]="it.value">\n\n							<ion-label range-left color="primary" *ngIf="it.name&&it.name.length<=20">{{it.name}}</ion-label>\n\n							<ion-label range-right style="background-color: darkblue; color:whitesmoke; border-radius: 0.3em;">{{it.value}} {{it.hint}}</ion-label>\n\n						</ion-range>\n\n					</ion-item>\n\n\n\n					<!-- date time-->\n\n					<ion-item class="input-item" *ngIf="it.type == \'datetime\'">\n\n						<ion-label color="danger" *ngIf="it.invalid">{{it.hint}}(*)</ion-label>\n\n						<ion-label *ngIf="!it.invalid">{{it.name}}</ion-label>\n\n						<ion-datetime displayFormat="{{it.display}}" pickerFormat="{{it.picker}}" [(ngModel)]="it.value"></ion-datetime>\n\n					</ion-item>\n\n\n\n					<!-- button action -->\n\n					<ion-grid *ngIf="it.type == \'button\'">\n\n						<ion-row>\n\n							<ion-col *ngFor="let myBtn of it.options" style="text-align: center;">\n\n								<button class="button-item" [(ngStyle)]="pageContent" ion-button round (click)="onClick(myBtn)">\n\n									{{myBtn?.name}}\n\n								</button>\n\n							</ion-col>\n\n						</ion-row>\n\n					</ion-grid>\n\n\n\n				</ion-list>\n\n			</ion-col>\n\n		</ion-row>\n\n	</ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\DINHNV\MyData\LapTrinhDiDong\NODE_Baitap\node-news\get-post-news\src\pages\dynamic-form-web\dynamic-form-web.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */]])
    ], DynamicFormWebPage);
    return DynamicFormWebPage;
    var DynamicFormWebPage_1;
}());

//# sourceMappingURL=dynamic-form-web.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(351);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser_ngx__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_news_home_news__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_post_news_post_news__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_NewService__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_apiImageService__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_dynamic_form_web_dynamic_form_web__ = __webpack_require__(345);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_news_home_news__["a" /* HomeNewsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_post_news_post_news__["a" /* PostNewsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_dynamic_form_web_dynamic_form_web__["a" /* DynamicFormWebPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_news_home_news__["a" /* HomeNewsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_post_news_post_news__["a" /* PostNewsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_dynamic_form_web_dynamic_form_web__["a" /* DynamicFormWebPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__services_NewService__["a" /* NewsService */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_10__services_apiImageService__["a" /* ApiImageService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_home_news_home_news__ = __webpack_require__(342);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MyApp = /** @class */ (function () {
    function MyApp() {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_1__pages_home_news_home_news__["a" /* HomeNewsPage */];
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\DINHNV\MyData\LapTrinhDiDong\NODE_Baitap\node-news\get-post-news\src\app\app.html"*/'<ion-split-pane when="md">\n\n    <ion-nav [root]="rootPage" #content main swipeBackEnabled="false"></ion-nav>\n\n</ion-split-pane>'/*ion-inline-end:"D:\DINHNV\MyData\LapTrinhDiDong\NODE_Baitap\node-news\get-post-news\src\app\app.html"*/
        })
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[346]);
//# sourceMappingURL=main.js.map