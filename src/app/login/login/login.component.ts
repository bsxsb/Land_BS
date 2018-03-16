import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../core/settings/settings.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {default as swal} from 'sweetalert2';
import {ConfigService} from "../../core/config/config.service";
import {JsonService} from "../../shared/util/json.service";
import {PrivilegeService} from "../../shared/privilege/privilege.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: any = {};
    slides: Array<any> = [];
    constructor(public settings: SettingsService, public configService: ConfigService, private jsonService: JsonService, private privilegeService:PrivilegeService, private router: Router, private authService: AuthService) {
       this.slides = this.configService.splash;
    }

    ngOnInit() {
    }

    login() {
        this.authService.login(this.user)
            .subscribe(res => {
                if(res.result){
                    this.authService.setUserToStorage(res.data);

                    if (res.data.group.entry && res.data.group.entry.route && res.data.group.entry.route != ''){
                        this.router.navigate([res.data.group.entry.route]);
                    } else {
                        swal({
                            title: '注意',
                            text: '请联系管理员，重新配置默认模块路由！',
                            type: 'warning',
                            confirmButtonText: '确认'
                        });
                    }

                }else{
                    swal({
                        title: '登录失败',
                        text: res.msg,
                        type: 'warning',
                        confirmButtonText: '确认'
                    });
                }
            }, err => {
                swal({
                    title: '登录失败',
                    text: err.msg,
                    type: 'warning',
                    confirmButtonText: '确认'
                })
            });

    }

}
