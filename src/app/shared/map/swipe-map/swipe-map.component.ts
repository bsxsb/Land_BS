import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigService} from "../../../core/config/config.service";
import {CoreMapService} from "../core-map.service";
import * as esriLoader from 'esri-loader';
declare var AMap : any;

@Component({
  selector: 'app-swipe-map',
  templateUrl: './swipe-map.component.html',
  styleUrls: ['./swipe-map.component.css'],
  providers:[CoreMapService]
})
export class SwipeMapComponent implements OnInit {

  @Input() wrapper;
  @Output() mapInit = new EventEmitter<any>();
  constructor(private elRef:ElementRef,private coreMapService : CoreMapService,private configService: ConfigService) {
  }

  ngOnInit() {
    const me = this;
      const options = {
          url: 'assets/js/map/init.js'
      };
      esriLoader.loadModules(["esri/map", "esri/dijit/LayerSwipe","esri/geometry/webMercatorUtils","esri/layers/ArcGISDynamicMapServiceLayer","esri/domUtils",
          "esri/geometry/Point", "dojo/dom","dojo/on","dojo/domReady!"],options)
            .then(([Map,LayerSwipe,webMercatorUtils,ArcGISDynamicMapServiceLayer,domUtils,Point,dom,on]) => {
              this.wrapper.option = this.wrapper.option || {};
              this.wrapper.option.logo = this.wrapper.option.hasOwnProperty('logo') ? this.wrapper.option.logo : false;
              this.wrapper.option.slider =  this.wrapper.option.hasOwnProperty('slider') ? this.wrapper.option.slider : true;
              this.wrapper.option.isScrollWheelZoom = this.wrapper.option.hasOwnProperty('isScrollWheelZoom') ? this.wrapper.option.isScrollWheelZoom : true;

              this.wrapper.amap = new AMap.Map($(this.elRef.nativeElement.firstChild).find('.gaode-base-map').get(0), {
                zoom: this.configService.main_map_center.zoom,
                center: [this.configService.main_map_center.x,this.configService.main_map_center.y],
                animateEnable : this.wrapper.option.hasOwnProperty('animateEnable') ? this.wrapper.option.animateEnable : true,
                dragEnable : false,
                zoomEnable : false,
                doubleClickZoom : false,
                keyboardEnable : false,
                scrollWheel :false,
                mapStyle :  this.wrapper.option.mapStyle || 'normal',
                features : this.wrapper.option.features || ['bg']
              });

              this.wrapper.map = new Map($(this.elRef.nativeElement.firstChild).find('.esri-base-map').get(0), this.wrapper.option);

              on(this.wrapper.map , "zoom", function(evt) {
                let point = evt.extent.getCenter();
                let newPoint = webMercatorUtils.webMercatorToGeographic(point);
                me.wrapper.amap.setZoom(me.wrapper.map.getLevel() + Math.log2(evt.zoomFactor));
              });

              on(this.wrapper.map,'extent-change',function(evt){
                let point = me.wrapper.map.extent.getCenter();
                let newPoint = webMercatorUtils.webMercatorToGeographic(point);
                me.wrapper.amap.setZoomAndCenter(me.wrapper.map.getLevel(),[newPoint.x,newPoint.y]);
              });
              this.coreMapService.init(this.wrapper.map);
              this.coreMapService.addEmptyTileLayer( () =>{
                  let map_service_url = me.wrapper.map_service_url || me.configService.data_map_server;

                  let p = new Point(me.configService.main_map_center.x,me.configService.main_map_center.y);
                  me.wrapper.map.centerAndZoom(p, me.configService.main_map_center.zoom);
                  let layer =  new ArcGISDynamicMapServiceLayer(map_service_url,{id:me.wrapper.swipe.layerSource.id});
                  me.wrapper.map.addLayer(layer);
                  layer.setVisibleLayers(me.wrapper.swipe.layerSource.layers);

                  let layer2 =  new ArcGISDynamicMapServiceLayer(map_service_url,{id:me.wrapper.swipe.layerTarget.id});
                  me.wrapper.map.addLayer(layer2);
                  layer2.setVisibleLayers(me.wrapper.swipe.layerTarget.layers);
                  let swipeWidget = new LayerSwipe({
                    type: me.wrapper.swipe.type || "vertical",  //Try switching to "scope" or "horizontal"
                    reverse : me.wrapper.swipe.reverse || false,
                    map:  me.wrapper.map,
                    layers: [layer2,layer]
                  }, $(me.elRef.nativeElement.firstChild).find('.esri-base-map').get(0).firstElementChild);
                  swipeWidget.startup();

                  on(swipeWidget, "load", function(evt) {
                    let root = $(swipeWidget.domNode); //swipeWidget.domNode;
                    let left_label = me.wrapper.swipe.layerTarget.label || '实施前';
                    let right_label = me.wrapper.swipe.layerSource.label || '实施后';

                    let slider = $(root.get(0).firstElementChild);
                    slider.css('left', '');  // remove default
                    slider.css('right', '100px');
                    let handleContainer = $(slider.get(0).firstElementChild);
                    if(swipeWidget.type === 'vertical'){
                      handleContainer.append('<div class="p-sm h3 text-bold" style="position:absolute;top:10px;left:50%;margin-left: 20px;color: red;font-size: large;">' + right_label +'</div>');
                      handleContainer.append('<div class="p-sm h3 text-bold" style="position:absolute;top:10px;right:50%;margin-right: 20px;color: red;font-size: large;">' + left_label +'</div>');
                    }
                    if(swipeWidget.type === 'horizontal'){
                      handleContainer.append('<div class="p-sm h3 text-bold" style="margin-right:-30px;position:absolute;right:50%;color: red;font-size: large;">' + left_label +'</div>');
                      handleContainer.append('<div class="p-sm h3 text-bold" style="margin-right:-30px;position:absolute;bottom:10px;right:50%;color: red;font-size: large;">' + right_label +'</div>');
                    }
                  });
                  me.mapInit.emit();
              });
        });
    }

}
