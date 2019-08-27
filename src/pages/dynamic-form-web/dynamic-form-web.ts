import { Component, } from '@angular/core';
import { NavParams, ViewController, NavController } from 'ionic-angular';

@Component({
  selector: 'page-dynamic-form-web',
  templateUrl: 'dynamic-form-web.html',
})
export class DynamicFormWebPage {

  dynamicForm: any = {
    title: "Tiêu đề của trang"
    , home_disable: false //nut home
    , buttons: [
      { color: "danger", icon: "close", next: "CLOSE" }
    ]
    , items: [
      { type: "avatar", name: "Thông tin cá nhân avatar", hint: "Avatar", url: "https://www.w3schools.com/howto/img_forest.jpg" }
      , { type: "title", name: "Tiêu đề form" }
      , { type: "check", key: "check_ok", name: "Check hay không chọn?", value: true }
      , { type: "range", key: "range_number", name: "Thanh Trượt", icon: "contrast", value: 50, min: 0, max: 100 }
      , { type: "toggle", key: "check_toggle", name: "Chọn hay không chọn Toggle?", icon: "plane" }
      , { type: "radio", key: "select_radio", name: "Chọn radio cái nào", icon: "plane", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] }
      , { type: "select", key: "select_1", name: "Chọn 1 cái nào", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] }
      , { type: "select_multiple", key: "select_n", name: "Chọn nhiều cái nào", value: 2, options: [{ name: "Tùy chọn 1", value: 1 }, { name: "Tùy chọn 2", value: 2 }] }
      , { type: "image", name: "Ảnh cá nhân", hint: "image viewer", url: "https://www.w3schools.com/howto/img_forest.jpg" }
      , { type: "text", key: "username", disabled: true, name: "username", hint: "Số điện thoại di động 9 số bỏ số 0 ở đầu", input_type: "userName", icon: "information-circle", validators: [{ required: true, min: 9, max: 9, pattern: "^[0-9]*$" }] }
      , { type: "password", key: "password", name: "password", hint: "Mật khẩu phải có chữ hoa, chữ thường, ký tự đặc biệt, số", input_type: "password", icon: "information-circle", validators: [{ required: true, min: 6, max: 20 }] }
      , { type: "text", key: "name", name: "Họ và tên", input_type: "text", icon: "person" }
      , { type: "text", key: "phone", name: "Điện thoại", hint: "Yêu cầu định dạng số điện thoại nhé", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }] }
      , { type: "text", key: "email", name: "email", hint: "Yêu cầu định dạng email nhé", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }] }
      , { type: "datetime", key: "start_date", name: "Ngày bắt đầu", hint: "Chọn ngày", display: "DD/MM/YYYY", picker: "DD MM YYYY" }
      , { type: "datetime", key: "start_time", name: "Thời gian bắt đầu", hint: "Chọn thời gian", display: "HH:mm:ss", picker: "HH:mm:ss" }
      , { type: "text_area", key: "text_area", name: "Nội dung nhập", hint: "Nhập nhiều dòng" }
      , {
        type: "details",
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
      }
      ,
      {
        type: "button"
        , options: [
          { name: "Reset", next: "RESET" }
          , { name: "Exit", next: "EXIT" }
          , { name: "Close", next: "CLOSE" }
          , { name: "Home", next: "HOME" }
          , { name: "Back", next: "CALLBACK" }
          , { name: "Continue", next: "CONTINUE" }
          , { name: "Register", next: "CALLBACK", url: "https://chonsoc3.mobifone.vn/ionic/", command: "USER_LOGIN_REDIRECT" }
          , { name: "LOGIN", next: "NEXT", url: "https://chonsoc3.mobifone.vn/ionic/", command: "USER_CHECK_EXISTS", token: true }
        ]
      }
    ]
  };
  callback: any; // ham goi lai khai bao o trang root gui (neu co)

  constructor(private viewCtrl: ViewController
    , private navCtrl: NavController
    , private navParams: NavParams
  ) { }

  ngOnInit() {
    this.dynamicForm = this.navParams.get("form") ? this.navParams.get("form") : this.dynamicForm;
    this.callback = this.navParams.get("callback");
  }
  // Xử lý sự kiện click button theo id
  onClick(btn) {
    let keyResults = {};
    if (btn.next === 'CALLBACK') {
      this.dynamicForm.items.some(el => {
        if (el.key && el.value) {
          Object.defineProperty(keyResults, el.key, { value: el.value, writable: false, enumerable: true });
        }
      });
    } else {
      this.next(btn);
      return;
    }

    btn.next_data = {
      data: keyResults
    }
    this.next(btn);
  }

  next(btn) {
    if (btn) {
      if (btn.next == 'CLOSE') {
        this.viewCtrl.dismiss("Đã xử lý popup xong!")
      } else if (btn.next == 'CALLBACK') {
        if (this.callback) {
          this.callback(btn.next_data)
            .then(nextStep => this.next(nextStep));
        } else {
          this.navCtrl.pop()
        }
      }
    }
  }
}