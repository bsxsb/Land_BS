import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../login/auth.service";
import {ConfigService} from "../core/config/config.service";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit,OnDestroy {

  full : boolean;
  auto_refresh_subscription : any;
  constructor(public authService : AuthService,public configService: ConfigService,private router: Router) {
    this.authService.getUserFromStorage();
  }

  ngOnInit() {
    this.auto_refresh_subscription = Observable.interval(1000 * 60 * 60 * 24).subscribe(() => {
       this.authService.verify().subscribe( res =>{
         if ( res.result ) {
           this.authService.setToken(res.user, res.token);
         } else {
           this.router.navigate(['/login']);
         }
       });
    });

  }

  ngOnDestroy(): void {
    this.auto_refresh_subscription && this.auto_refresh_subscription.unsubscribe();
  }

}
