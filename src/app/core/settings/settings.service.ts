import {EventEmitter, Injectable} from '@angular/core';
import {ConfigService} from "../config/config.service";

@Injectable()
export class SettingsService {

  public user: any;
  public app: any;
  public layout: any;
  public toggleFullScreen : EventEmitter<boolean> = new EventEmitter();

  constructor(private configService:ConfigService) {

    // User Settings
    // -----------------------------------
    this.user = {
      name: 'John',
      job: 'ng-developer',
      picture: 'assets/img/user/02.jpg'
    };

    // App Settings
    // -----------------------------------
    this.app = configService.app;/*{
      name: '海绵燕郊',
      description: '燕郊海绵办',
      year: ((new Date()).getFullYear())
    };
*/
    // Layout Settings
    // -----------------------------------
    this.layout = {
      isFixed: true,
      isCollapsed: false,
      isBoxed: false,
      isRTL: false,
      horizontal: false,
      isFloat: false,
      asideHover: false,
      theme: null,
      asideScrollbar: false,
      isCollapsedText: true,
      useFullLayout: false,
      hiddenFooter: true,
      offsidebarOpen: false,
      asideToggled: false,
      viewAnimation: 'ng-fadeInUp',
      showAccount : false
    };

  }

  getAppSetting(name) {
    return name ? this.app[name] : this.app;
  }
  getUserSetting(name) {
    return name ? this.user[name] : this.user;
  }
  getLayoutSetting(name) {
    return name ? this.layout[name] : this.layout;
  }

  setAppSetting(name, value) {
    if (typeof this.app[name] !== 'undefined') {
      this.app[name] = value;
    }
  }
  setUserSetting(name, value) {
    if (typeof this.user[name] !== 'undefined') {
      this.user[name] = value;
    }
  }
  setLayoutSetting(name, value) {
    if (typeof this.layout[name] !== 'undefined') {
      return this.layout[name] = value;
    }
  }

  toggleLayoutSetting(name) {
    return this.setLayoutSetting(name, !this.getLayoutSetting(name));
  }

}
