import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../login/auth.service";
import {SettingsService} from "../../core/settings/settings.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import * as moment from 'moment';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  hi_greetings : any;
  hi_date :any;
  constructor(public authService:AuthService, private router: Router,public settingService:SettingsService) { }

  ngOnInit() {
    moment.locale('zh-cn');
    Observable.interval(1000 * 60 * 60).startWith(0).subscribe(() => {
      const hi_date  = moment().format('今天是 LL dddd');
      //const hi_date  = moment().format('YYYY-MM-DD HH:mm:ss');
      const hi_hour = moment().hour();
      let hi_greetings = "";
      6 > hi_hour ? hi_greetings = "夜深了，注意休息" : 9 > hi_hour ? hi_greetings = "早上好，喝杯茶吧！" : 11 > hi_hour ? hi_greetings = "上午好！" : 12 > hi_hour ? hi_greetings = "吃过午饭了么？" : 14 > hi_hour ? hi_greetings = "下午好！准备工作了？" : 17 > hi_hour ? hi_greetings = "下午好！起来运动一下" : 19 > hi_hour ? hi_greetings = "傍晚好！" : 22 > hi_hour ? hi_greetings = "还没下班，辛苦了" : 24 > hi_hour && (hi_greetings = "夜深了，注意休息");
      this.hi_greetings = hi_greetings;
      this.hi_date = hi_date;
    });
  }

  quit(){
    this.settingService.layout.showAccount = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
