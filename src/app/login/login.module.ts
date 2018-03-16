import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from "../core/core.module";

import { LoginComponent } from './login/login.component';
import { AuthService } from "./auth.service";

@NgModule({
  imports: [
    CoreModule.forChild(),
    RouterModule
  ],
  declarations: [LoginComponent],
  providers:[
      AuthService
  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
