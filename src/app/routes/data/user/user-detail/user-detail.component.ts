import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {default as swal} from 'sweetalert2';
import {UserService} from "../../../../shared/user/user.service";
import {GroupService} from "../../../../shared/group/group.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  isShow: boolean = false;
  user: any = {};
  groups : any = [];
  mode: any = {
    create: true,
    readonly: false
  };

  @Output() public onSubmit = new EventEmitter<UserDetailComponent>();

  constructor(private userService: UserService,private groupService:GroupService) {
  }

  ngOnInit() {
  }

  show(user) {
    this.groupService.getAll()
        .subscribe( res => {
          this.groups = res;
        });
    if (user) {
      this.mode.create = false;
      this.userService.getOne(user._id)
          .subscribe( res => {
            this.user = res;
            this.isShow = true;
          });
    } else {
      this.mode.create = true;
      this.user = {
        password:"000000"
      };
      this.isShow = true;
    }
  }

  hide() {
    this.isShow = false;
    this.user = {};
  }

  submit() {
    if (this.mode.create) {
      this.userService.create(this.user)
          .subscribe(res => {
            this.user._id = res.user._id;
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
      this.userService.update(this.user)
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

  compareGroup(g1: any, g2: any): boolean {
    return g1 && g2 ? g1._id === g2._id : g1 === g2;
  }

}
