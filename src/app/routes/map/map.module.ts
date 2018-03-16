import {NgModule} from '@angular/core';
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";
import {Routes, RouterModule} from '@angular/router';
import {MapComponent} from './map.component';

const routes: Routes = [
    {path: '', component: MapComponent, data: {module: '海绵地图'}}
];

@NgModule({
    imports: [
        CoreModule.forChild(),
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MapComponent]
})
export class MapModule {
}
