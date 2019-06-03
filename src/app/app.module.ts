import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicApp } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MyApp } from './app.component';


import { HomeNewsPage } from '../pages/home-news/home-news';
import { PostNewsPage } from '../pages/post-news/post-news';
import { NewsService } from '../services/NewService';
import { ApiImageService } from '../services/apiImageService';
import { DynamicFormWebPage } from '../pages/dynamic-form-web/dynamic-form-web';


@NgModule({
  declarations: [
    MyApp,
    HomeNewsPage,
    PostNewsPage,
    DynamicFormWebPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeNewsPage,
    PostNewsPage,
    DynamicFormWebPage
  ],
  providers: [
    StatusBar,
    NewsService,
    InAppBrowser,
    ApiImageService    
  ]
})
export class AppModule {}
