import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CompanyService} from "../../../../shared/company/company.service";
import {default as swal} from 'sweetalert2';
import {UserService} from "../../../../shared/user/user.service";
import {isArray} from "util";

declare var _: any;

@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
    isShow: boolean = false;
    company: any = {
        users:[]
    };
    mode: any = {
        create: true,
        readonly: false
    };
    users: any = [];
    add_user : any;
    remove_user : any;
    @Output() public onSubmit = new EventEmitter<CompanyDetailComponent>();

    constructor(private companyService: CompanyService, private userService: UserService) {
    }

    ngOnInit() {
    }

    show(company) {
        if (company) {
            this.mode.create = false;
            this.companyService.getOne(company._id)
                .subscribe( res => {
                    this.company = res;
                    this.changeType();
                    this.isShow = true;
                });
        } else {
            this.mode.create = true;
            this.company = {
                users:[]
            };
            this.users = [];
            this.isShow = true;
        }
    }

    hide() {
        this.isShow = false;
        this.company = {
            users:[]
        };
        this.users = [];
    }

    submit() {
        if (this.mode.create) {
            this.companyService.create(this.company)
                .subscribe(res => {
                    this.company._id = res.company._id;

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
            this.companyService.update(this.company)
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

    changeType() {
        const me = this;
        if (this.company.type === '施工单位') {
            this.userService.getConstructWorker()
                .subscribe(res => {
                    this.users = res.filter(item => this.filterUser(this.company.users, item));
                });
        }
        else if (this.company.type === '规划设计单位') {
            this.userService.getDesignWorker()
                .subscribe(res => {
                    this.users = res.filter(item => this.filterUser(this.company.users, item));
                });
        }
        else if (this.company.type === '监理单位') {
            this.userService.getSupervisionWorker()
                .subscribe(res => {
                    this.users = res.filter(item => this.filterUser(this.company.users, item));
                });
        }
        else if (this.company.type === '运营单位') {
            this.userService.getMaintainWorker()
                .subscribe(res => {
                    this.users = res.filter(item => this.filterUser(this.company.users, item));
                });
        }
        else if (this.company.type === '应急单位') {
            this.userService.getEmergencyWorker()
                .subscribe(res => {
                    this.users = res.filter(item => this.filterUser(this.company.users, item));
                });
        }
        else {
            this.users = [];
        }
    }

    filterUser(users, item) {
        if (isArray(users)) {
            const index = _.findIndex(users, function (obj) {
                return obj._id === item._id;
            });
            if (index != -1) {
                return false;
            } else {
                return true;
            }
        }
        return true;
    }

    addUser(){
        if (this.add_user){
            if (!this.company.users){
                this.company.users = [];
            }
            this.company.users.push(this.add_user);
            _.remove(this.users,item => {
                return item._id === this.add_user._id;
            });
            this.add_user = null;
        }
    }
    removeUser(){
        if (this.remove_user){
            this.users.push(this.remove_user);
            _.remove(this.company.users,item => {
                return item._id === this.remove_user._id;
            });
            this.remove_user = null;
        }
    }


}
