import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {default as swal} from 'sweetalert2';
import {GroupService} from "../../../../shared/group/group.service";
import {JsonService} from "../../../../shared/util/json.service";
import {PrivilegeService} from "../../../../shared/privilege/privilege.service";

@Component({
    selector: 'app-group-detail',
    templateUrl: './group-detail.component.html',
    styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

    isShow: boolean = false;

    privileges : any = [];
    systems : any = []; //系统级

    filter_privileges : any = [];
    group: any = {};
    mode: any = {
        create: true,
        readonly: false
    };

    @Output() public onSubmit = new EventEmitter<GroupDetailComponent>();

    constructor(private jsonService: JsonService, private groupService: GroupService, private privilegeService:PrivilegeService) {
    }

    ngOnInit() {
        this.privilegeService.getAll()
            .subscribe( data => {
                this.privileges = data;
                this.privileges.forEach(item => {
                    item.isCollapsed = true;
                    item.selected = false;
                });
            })
    }

    show(group) {
        this.privileges.forEach(item => {
            item.isCollapsed = true;
            item.selected = false;
        });
        this.loadTree();
        if (group) {
            this.mode.create = false;
            group.privileges && group.privileges.map(item => {
                const module = this.privileges.find( obj => obj._id === item._id);
                module && (module.selected = true);
            });
            this.filter_privileges = this.privileges.filter( item => item.route && item.route != '' && item.selected);
            this.groupService.getOne(group._id)
                .subscribe(res => {
                    this.group = res;
                    this.isShow = true;
                });
        } else {
            this.mode.create = true;
            this.group = {};
            this.filter_privileges = [];
            this.isShow = true;
        }
    }

    hide() {
        this.isShow = false;
        this.group = {};
    }

    loadTree(){
        this.systems = this.privileges.filter( item => item.type ===1 );
        this.systems.forEach( item => this.loadModule(item));
        this.systems.push( this.privileges.find ( item => item.type === -1));
    }

    loadModule(module){
        module.children = this.privileges.filter( item => item.parent && item.parent._id === module._id);
        module.children.forEach( item => this.loadModule(item));
    }

    submit() {
        this.group.privileges = this.privileges.filter( item => item.selected).map( item => {
            return { _id :item._id};
        });
        if (this.mode.create) {
            this.groupService.create(this.group)
                .subscribe(res => {
                    this.group._id = res.group._id;
                    this.group.privileges = this.privileges.filter( item => item.selected);
                    this.onSubmit.emit(this);
                    this.isShow = false;
                }, err => {
                    swal({
                        title: '提醒',
                        text: "添加失败！",
                        type: 'warning',
                        confirmButtonText: '确认'
                    });
                });
        } else {
            this.groupService.update(this.group)
                .subscribe(res => {
                    this.group.privileges = this.privileges.filter( item => item.selected);
                    this.onSubmit.emit(this);
                    this.isShow = false;
                }, err => {
                    swal({
                        title: '提醒',
                        text: "更新失败！",
                        type: 'warning',
                        confirmButtonText: '确认'
                    });
                });
        }
    }

    collapse(module) {
        module.isCollapsed = !module.isCollapsed;
        if (!module.isCollapsed) {
            this.systems.forEach( item => {
                if (item._id != module._id) {
                    item.isCollapsed = true;
                }
            });
        }
    }

    select(module) {
        if (module.children) {
            this.selectChildren(module);
        }
        if (module.parent) {
            this.selectParent(module);
        }
        this.filter_privileges = this.privileges.filter( item => item.route && item.route != '' && item.selected);
    }

    selectChildren(module) {
        if (module.children) {
            module.children.forEach(item => {
                item.selected = module.selected;
                this.selectChildren(item);
            });
        }
    }

    selectParent(module) {
        if (module.parent) {
            const par = this.privileges.find ( item => item._id === module.parent._id);
            if (par) {
                par.selected = true;
                this.selectParent(par);
            }
        }
    }

    comparePrivilege(g1: any, g2: any): boolean {
        return g1 && g2 ? g1._id === g2._id : g1 === g2;
    }

}
