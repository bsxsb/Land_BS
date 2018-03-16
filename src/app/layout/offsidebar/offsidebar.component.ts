import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../core/settings/settings.service';
import { ThemesService } from '../../core/themes/themes.service';

@Component({
    selector: 'app-offsidebar',
    templateUrl: './offsidebar.component.html',
    styleUrls: ['./offsidebar.component.scss']
})
export class OffsidebarComponent implements OnInit {

    currentTheme: any ;

    constructor(public settings: SettingsService, public themes: ThemesService) {
        this.currentTheme = themes.getDefaultTheme();
    }

    ngOnInit() { }

    setTheme() {
        this.themes.setTheme(this.currentTheme);
    }

}
