import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from "ngx-bootstrap/carousel";

import { FileUploadModule } from 'ng2-file-upload';

import { MenuService } from "./menu/menu.service";
import { SettingsService } from "./settings/settings.service";
import { ThemesService } from "./themes/themes.service";
import { ConfigService } from "./config/config.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    FileUploadModule
  ],
/*  providers: [
    MenuService,
    SettingsService,
    ThemesService,
    ConfigService
  ],*/
  exports : [
    CommonModule,
    FormsModule,
    AccordionModule,ButtonsModule,ModalModule,TabsModule,TooltipModule,BsDropdownModule,PaginationModule,ProgressbarModule,CollapseModule,CarouselModule,
    FileUploadModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [MenuService,
        SettingsService,
        ThemesService,
        ConfigService]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
