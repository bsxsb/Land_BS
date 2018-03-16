import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable()
export class ConfigService {

    public city_list: any = {
        YanJiao: {
            web_api : "http://www.ispongecity.com:3040",
            monitor_api : "http://www.ispongecity.com:3011",
            black_api : "http://www.ispongecity.com:3001",
            data_map_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/YJDataMap/MapServer',
            geometry_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer',
            print_server:"http://www.ispongecity.com:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
            main_map_center: {x: 116.836756, y: 39.973822, zoom: 12},
            city_info: {
                citycode: "101090609",
                city: "三河市",
                cityid: "1186",
                parentid: "143"
            },
            logo: {
                login: 'assets/img/login/yanjiao/logo-login.png',
                black: 'assets/img/login/yanjiao/yanjiao-logo.png',
                white: 'assets/img/login/yanjiao/yanjiao-logo-w.png'
            },
            splash: [
                {
                    image: "assets/img/login/yanjiao/b1.jpg",
                    name: "燕郊国家高新技术产业开发区"
                },
                {
                    image: "assets/img/login/yanjiao/b2.jpg",
                    name: "双鹰下蛋雕塑"
                },
                {
                    image: "assets/img/login/yanjiao/b3.jpg",
                    name: "燕郊夜景"
                },
                {
                    image: "assets/img/login/yanjiao/b4.jpg",
                    name: "全景燕郊"
                },
                {
                    image: "assets/img/login/yanjiao/b5.jpg",
                    name: "燕郊航拍"
                },
                {
                    image: "assets/img/login/yanjiao/b6.jpg",
                    name: "燕郊火电厂"
                }
            ],
            app: {
                name: '海绵燕郊',
                description: '燕郊海绵办',
                year: ((new Date()).getFullYear())
            },
            monitor: {
                level : [{
                    name: '流域',
                    value: 'basin'
                },{
                    name: '分区',
                    value: 'partition'
                },{
                    name: '项目',
                    value: 'project'
                }]
            }
        },
        ZhenJiang: {
            data_map_server: 'http://221.131.182.28:6082/arcgis/rest/services/ZJDataMap/MapServer',
            model_map_server: 'http://221.131.182.28:6082/arcgis/rest/services/ZJFullScreen/MapServer',
            geometry_server: 'http://221.131.182.28:6082/arcgis/rest/services/Utilities/Geometry/GeometryServer',
            print_server:"http://www.ispongecity.com:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
            main_map_center: {x: 119.474562, y: 32.181560, zoom: 12},
            city_info: {
                citycode: "101190301",
                city: "镇江",
                cityid: "231",
                parentid: "15"
            },
            app: {
                name: '海绵镇江',
                description: '镇江海绵城市指挥部',
                year: ((new Date()).getFullYear())
            },
            monitor: {
                level : [{
                    name: '流域',
                    value: 'basin'
                },{
                    name: '分区',
                    value: 'partition'
                },{
                    name: '项目',
                    value: 'project'
                }]
            }
        },
        SanYa: {
            web_api : "http://www.ispongecity.com:3050",
            monitor_api : "http://www.ispongecity.com:3011",
            black_api : "http://www.ispongecity.com:3001",
            image_map_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/SYBaseMap/MapServer',
            data_map_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/SYDataMap/MapServer',
            model_map_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/SYModelMap/MapServer',
            asset_map_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/SYDataMap/MapServer',
            geometry_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer',
            print_server:"http://www.ispongecity.com:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
            main_map_center: {x: 109.522854, y: 18.267234, zoom: 13},
            city_info: {
                citycode: "101310201",
                city: "三亚",
                cityid: "120",
                parentid: "8"
            },
            logo: {
                login: 'assets/img/login/sanya/logo-login.png',
                black: 'assets/img/login/sanya/sanya-logo.png',
                white: 'assets/img/login/sanya/sanya-logo-w.png'
            },
            splash: [
                {
                    image: "assets/img/login/sanya/b1.jpg",
                    name: "三亚湾"
                },
                {
                    image: "assets/img/login/sanya/b2.jpg",
                    name: "凤凰岛"
                },
                {
                    image: "assets/img/login/sanya/b3.jpg",
                    name: "国际帆船港"
                },
                {
                    image: "assets/img/login/sanya/b4.jpg",
                    name: "鹿回头高尔夫球场"
                },
                {
                    image: "assets/img/login/sanya/b5.jpg",
                    name: "小东海"
                }
            ],
            app: {
                name: '海绵三亚',
                title: '三亚市智慧城市海绵城市监测监管平台',
                description: '三亚市住房和城乡建设局',
                year: ((new Date()).getFullYear())
            },
            monitor: {
                type : [{
                    name: '雨量',
                    value: 'rain'
                },{
                    name: '流量',
                    value: 'flow'
                },{
                    name: '水质',
                    value: 'quality'
                }],
                level :[{
                    name: '下垫面',
                    value: 'underlying_surface'
                },{
                    name: '易涝点',
                    value: 'flooding'
                },{
                    name: '设施',
                    value: 'facility'
                },{
                    name: '项目',
                    value: 'project'
                },{
                    name: '汇水分区',
                    value: 'catchment'
                },{
                    name: '排污口',
                    value: 'drain_outlet'
                },{
                    name: '水系',
                    value: 'river'
                }],
                indexs:[{
                    name:'quantity',
                    description:'流量',
                    unit:'m³/s'
                },{
                    name:'level',
                    description:'液位',
                    unit:'m'
                },{
                    name:'velocity',
                    description:'流速',
                    unit:'m/s'
                },{
                    name:'voltage',
                    description:'电压',
                    unit:'V'
                },{
                    name:'PN05',
                    description:'雨量',
                    unit:'mm'
                },{
                    name:'TSS',
                    description:'悬浮物',
                    unit:'mg/L'
                }],
                missing_rule:{
                    quantity:{
                        check:true,
                        name:'流量'
                    },
                    level:{
                        check:true,
                        name:'液位'
                    },
                    velocity:{
                        check:true,
                        name:'流速'
                    },
                    voltage:{
                        check:true,
                        name:'电压'
                    },
                    TSS:{
                        check:true,
                        name:'悬浮物'
                    },
                    temperature:{
                        check:true,
                        name:'温度'
                    },
                    humidity:{
                        check:true,
                        name:'湿度'
                    },
                    PN05:{
                        check:true,
                        name:'雨量'
                    },
                },
                abnormal_rule:{
                    quantity:{
                        max: 150,
                        min: 0,
                        name:'流量'
                    },
                    level:{
                        max: 5,
                        min: 0,
                        name:'液位'
                    },
                    velocity:{
                        max: 100,
                        min: 0,
                        name:'流速'
                    },
                    voltage:{
                        max: 100,
                        min: 0,
                        name:'电压'
                    },
                    SS:{
                        max: 100,
                        min: 0
                    },
                    temperature:{
                        max: 45,
                        min: -20,
                        name:'温度'
                    },
                    humidity:{
                        max: 100,
                        min: 0,
                        name:'湿度'
                    },
                    PN05:{
                        max: 200,
                        min: 0,
                        name:'雨量'
                    }
                }
            }
        },
        YuXi:{
            web_api : "http://www.ispongecity.com:3060",
            monitor_api : "http://www.ispongecity.com:3012",
            black_api : "http://www.ispongecity.com:3001",
            data_map_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/YuXiDataMap/MapServer',
            model_map_server : 'http://www.ispongecity.com:6080/arcgis/rest/services/YuXiModelMap/MapServer',
            asset_map_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/YuXiDataMap/MapServer',
            geometry_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer',
            print_server:"http://www.ispongecity.com:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
            main_map_center: {x: 102.56, y: 24.358, zoom: 13},
            city_info: {
                citycode: "101290701",
                city: "玉溪",
                cityid: "380",
                parentid: "29"
            },
            logo: {
                login: 'assets/img/login/yuxi/logo-login.png',
                black: 'assets/img/login/yuxi/yuxi-logo.png',
                white: 'assets/img/login/yuxi/yuxi-logo-w.png'
            },
            splash: [
                {
                    image: "assets/img/login/yuxi/b1.jpg",
                    name: "聂耳音乐广场"
                },
                {
                    image: "assets/img/login/yuxi/b2.jpg",
                    name: "科技公园"
                },
                {
                    image: "assets/img/login/yuxi/b3.jpg",
                    name: "红塔"
                },
                {
                    image: "assets/img/login/yuxi/b4.jpg",
                    name: "聂耳公园"
                },
                {
                    image: "assets/img/login/yuxi/b5.jpg",
                    name: "东风广场"
                },
                {
                    image: "assets/img/login/yuxi/b6.jpg",
                    name: "红塔山公园"
                },
                {
                    image: "assets/img/login/yuxi/b7.jpg",
                    name: "红塔夜景"
                },
                {
                    image: "assets/img/login/yuxi/b8.jpg",
                    name: "聂耳音乐广场"
                }
            ],
            app: {
                name: '海绵玉溪',
                title: '玉溪市智慧城市海绵城市监测监管平台',
                description: '玉溪市住房和城乡建设局',
                year: ((new Date()).getFullYear())
            },
            monitor: {
                type : [{
                    name: '雨量',
                    value: 'rain'
                },{
                    name: '流量',
                    value: 'flow'
                },{
                    name: '水质',
                    value: 'quality'
                }],
                level :[{
                    name: '下垫面',
                    value: 'underlying_surface'
                },{
                    name: '易涝点',
                    value: 'flooding'
                },{
                    name: '设施',
                    value: 'facility'
                },{
                    name: '项目',
                    value: 'project'
                },{
                    name: '汇水分区',
                    value: 'catchment'
                },{
                    name: '排污口',
                    value: 'drain_outlet'
                },{
                    name: '水系',
                    value: 'river'
                }],
                indexs:[{
                    name:'quantity',
                    description:'流量',
                    unit:'m³/s'
                },{
                    name:'level',
                    description:'液位',
                    unit:'m'
                },{
                    name:'velocity',
                    description:'流速',
                    unit:'m/s'
                },{
                    name:'PN05',
                    description:'雨量',
                    unit:'mm'
                },{
                    name:'TSS',
                    description:'悬浮物',
                    unit:'mg/L'
                }],
                missing_rule:{
                    quantity:{
                        check:true,
                        name:'流量'
                    },
                    level:{
                        check:true,
                        name:'液位'
                    },
                    velocity:{
                        check:true,
                        name:'流速'
                    },
                    voltage:{
                        check:true,
                        name:'电压'
                    },
                    TSS:{
                        check:true,
                        name:'悬浮物'
                    },
                    temperature:{
                        check:true,
                        name:'温度'
                    },
                    humidity:{
                        check:true,
                        name:'湿度'
                    },
                    PN05:{
                        check:true,
                        name:'雨量'
                    },
                },
                abnormal_rule:{
                    quantity:{
                        max: 150,
                        min: 0,
                        name:'流量'
                    },
                    level:{
                        max: 5,
                        min: 0,
                        name:'液位'
                    },
                    velocity:{
                        max: 100,
                        min: 0,
                        name:'流速'
                    },
                    voltage:{
                        max: 100,
                        min: 0,
                        name:'电压'
                    },
                    SS:{
                        max: 100,
                        min: 0
                    },
                    temperature:{
                        max: 45,
                        min: -20,
                        name:'温度'
                    },
                    humidity:{
                        max: 100,
                        min: 0,
                        name:'湿度'
                    },
                    PN05:{
                        max: 200,
                        min: 0,
                        name:'雨量'
                    }
                }
            }
        }
    };
    public city_name: string = "SanYa";

    public web_api: string = this.city_list[this.city_name].web_api;
    public upload_path: string = this.city_list[this.city_name].web_api + '/files';

    public data_map_server: string = this.city_list[this.city_name].data_map_server;//'http://115.28.153.216:6080/arcgis/rest/services/YJDataMap/MapServer';
    public geometry_server: string = this.city_list[this.city_name].geometry_server;//'http://115.28.153.216:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer';
    public main_map_center = this.city_list[this.city_name].main_map_center;//{x:116.836756,y:39.973822,zoom:12};
    //public jd_api_key = "0dbbeac2e11a29c579299641bec7e7f2";
    public city_info: any = this.city_list[this.city_name].city_info;
    public city : any = this.city_list[this.city_name];
    public image_map_server: string = this.city_list[this.city_name].image_map_server;

    public logo: any = this.city_list[this.city_name].logo;
    public splash: any = this.city_list[this.city_name].splash;
    public app: any = this.city_list[this.city_name].app;

    public data_map_config_json: any = "assets/json/map/data/" + this.city_name + ".json";

    constructor() {
    }

}
