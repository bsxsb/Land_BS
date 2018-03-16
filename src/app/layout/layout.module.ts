import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from "../core/core.module";

import { LayoutComponent } from "./layout.component";
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OffsidebarComponent } from './offsidebar/offsidebar.component';
import { AccountComponent } from './account/account.component';


@NgModule({
  imports: [
    CoreModule.forChild(),
    RouterModule
  ],
  declarations: [
    LayoutComponent,
    FooterComponent,
    SidebarComponent,
    OffsidebarComponent,
    AccountComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {

}
