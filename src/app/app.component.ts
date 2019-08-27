import { Component } from '@angular/core';
import { HomeNewsPage } from '../pages/home-news/home-news';
import { Events } from 'ionic-angular';
import { PostNewsPage } from '../pages/post-news/post-news';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomeNewsPage;
  constructor(private events: Events) { }

  //dùng hàm này để giả định đăng nhập sau 500 ms
  ngOnInit() {
    setTimeout(() => {
      this.events.publish('event-main-login-checked', { username: "766777123", fullname: "Nguyen Van Dinh", image: "assets/imgs/avatar.jpg" })
    }, 500);
  }
}

