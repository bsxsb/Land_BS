import { NgModule } from '@angular/core';
import { CoreModule } from "../core/core.module";
import { CompanyService } from "./company/company.service";
import { UserService } from "./user/user.service";
import { GroupService } from "./group/group.service";
import { BaseMapComponent } from "./map/base-map/base-map.component";
import { DocumentService } from "./document/document.service";
import { MapMeasureComponent } from './map/map-measure/map-measure.component';
import { MapDrawComponent } from './map/map-draw/map-draw.component';
import { GraphicService } from "./map/graphic.service";
import { CreateMapTextComponent } from './map/map-draw/create-map-text/create-map-text.component';
import { MapLayerComponent } from './map/map-layer/map-layer.component';
import { MapThematicComponent } from './map/map-thematic/map-thematic.component';
import { MapSelectionComponent } from './map/map-selection/map-selection.component';
import { MapTimeComponent } from './map/map-time/map-time.component';
import { JdService } from "./util/jd.service";
import { SwipeMapComponent } from './map/swipe-map/swipe-map.component';
import { MapTooltipComponent } from './map/map-tooltip/map-tooltip.component';
import { JsonService } from "./util/json.service";
import { EchartComponent } from './chart/echart/echart.component';
import { MapSliderComponent } from './map/map-slider/map-slider.component';
import { MenuToggleDirective } from './util/menu-toggle.directive';
import { PrivilegeService } from "./privilege/privilege.service";


@NgModule({
  imports: [
    CoreModule.forChild()
  ],
  declarations: [BaseMapComponent, MapMeasureComponent, MapDrawComponent, CreateMapTextComponent, MapLayerComponent, MapThematicComponent, MapSelectionComponent, MapTimeComponent, SwipeMapComponent, MapTooltipComponent, EchartComponent, MapSliderComponent, MenuToggleDirective],
  providers: [UserService,GroupService,CompanyService,DocumentService,GraphicService,JdService,JsonService,PrivilegeService],
  exports:[
    BaseMapComponent,MapMeasureComponent,MapDrawComponent,MapLayerComponent,MapThematicComponent,MapSelectionComponent,MapTimeComponent,SwipeMapComponent,MapTooltipComponent,EchartComponent,MapSliderComponent,MenuToggleDirective
  ]
})
export class SharedModule {

}
