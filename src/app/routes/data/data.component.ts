import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../login/auth.service";
import {ConfigService} from "../../core/config/config.service";
import {SettingsService} from "../../core/settings/settings.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy {

    option: any= {};

    constructor(public authService: AuthService, private configService: ConfigService, private settingsService: SettingsService) {
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {

    }

}
