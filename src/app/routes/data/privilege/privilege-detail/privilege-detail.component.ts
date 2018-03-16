import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {default as swal} from 'sweetalert2';
import {PrivilegeService} from "../../../../shared/privilege/privilege.service";

@Component({
    selector: 'app-privilege-detail',
    templateUrl: './privilege-detail.component.html',
    styleUrls: ['./privilege-detail.component.css']
})
export class PrivilegeDetailComponent implements OnInit {

    isShow: boolean = false;
    privilege: any = {};
    privileges: any = [];
    filter_privileges: any = [];
    mode: any = {
        create: true,
        readonly: false
    };

    @Output() public onSubmit = new EventEmitter<PrivilegeDetailComponent>();

    constructor(private privilegeService: PrivilegeService) {
    }

    ngOnInit() {

    }

    show(privilege, privileges) {
        this.filter_privileges = [];
        this.privileges = privileges;
        if (privilege) {
            this.mode.create = false;
            this.privilegeService.getOne(privilege._id)
                .subscribe(res => {
                    this.privilege = res;
                    this.changeType();
                    this.isShow = true;
                });
        } else {
            this.mode.create = true;
            this.privilege = {};
            this.isShow = true;
        }
    }

    hide() {
        this.isShow = false;
        this.privilege = {};
    }

    submit() {
        if (this.mode.create) {
            this.privilegeService.create(this.privilege)
                .subscribe(res => {
                    if (res.result){
                        this.privilege._id = res.privilege._id;
                        this.onSubmit.emit(this);
                        this.isShow = false;
                    }else{
                        swal({
                            title: '提醒',
                            text: "模块名称已存在！",
                            type: 'warning',
                            confirmButtonText: '确认'
                        });
                    }
                }, err => {
                    swal({
                        title: '提醒',
                        text: "添加失败！",
                        type: 'warning',
                        confirmButtonText: '确认'
                    });
                });
        } else {
            this.privilegeService.update(this.privilege)
                .subscribe(res => {
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

    comparePrivilege(g1: any, g2: any): boolean {
        return g1 && g2 ? g1._id === g2._id : g1 === g2;
    }

    changeType() {
        if (this.privilege.type !== 99) {
            this.filter_privileges = this.privileges.filter(item => item.type === this.privilege.type - 1);
        } else {
            this.filter_privileges = this.privileges.filter(item => item.type !== 99);
        }
    }

}
