import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../core/config/config.service";
import {MapTooltipComponent} from "../../shared/map/map-tooltip/map-tooltip.component";
import {CoreMapService} from "../../shared/map/core-map.service";
import {DataMapService} from "../../shared/map/data-map.service";
import * as esriLoader from 'esri-loader';
import {MapTimeComponent} from "../../shared/map/map-time/map-time.component";
import {MapSelectionComponent} from "../../shared/map/map-selection/map-selection.component";
import {MapMeasureComponent} from "../../shared/map/map-measure/map-measure.component";
import {MapDrawComponent} from "../../shared/map/map-draw/map-draw.component";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    providers: [CoreMapService, DataMapService]
})
export class MapComponent implements OnInit, OnDestroy {
    @ViewChild('mapTooltip') mapTooltip: MapTooltipComponent;
    @ViewChild('mapTimePanel') mapTimePanel: MapTimeComponent;
    @ViewChild('mapSelectionPanel') mapSelectionPanel: MapSelectionComponent;
    @ViewChild('mapMeasurePanel') mapMeasurePanel: MapMeasureComponent;
    @ViewChild('mapDrawPanel') mapDrawPanel: MapDrawComponent;
    map_wrapper = {
        name: 'map',
        option: {
            isScrollWheelZoom: true,
            slider: false,
            features: ['bg', 'road'],
            showSatellite: false,
            animateEnable: false,
            showImageMap: true
        },
        map: null,
        draw_toolbar: null,
        edit_toolbar: null,
        amap: {}
    };

    constructor(private configService: ConfigService, private coreMapService: CoreMapService, private dataMapService: DataMapService) {

    }

    ngOnInit() {

    }

    mapInit() {
        this.coreMapService.init(this.map_wrapper.map);
        this.dataMapService.load(this.map_wrapper.map, layer => {
            this.dataMapService.init();
            this.coreMapService.addSelectionLayer();
            esriLoader.loadModules(["esri/toolbars/draw", "esri/toolbars/edit", "dojo/domReady!"])
                .then(([Draw, Edit]) => {
                    this.map_wrapper.draw_toolbar = new Draw(this.map_wrapper.map);
                    this.map_wrapper.edit_toolbar = new Edit(this.map_wrapper.map);

                    this.mapDrawPanel.init(this.map_wrapper.draw_toolbar, this.map_wrapper.edit_toolbar);
                    this.mapMeasurePanel.init(this.map_wrapper.draw_toolbar);
                });
            this.mapTooltip.init();
            this.mapTimePanel.init();
            this.mapSelectionPanel.init();
        });
    }

    mapSelected(name) {

    }

    layerChecked(layer) {
        this.mapTooltip.refresh(layer);
    }

    ngOnDestroy(): void {

    }

}
