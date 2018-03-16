import { Component, OnInit } from '@angular/core';
import {default as swal} from 'sweetalert2';
import {UserService} from "../../../shared/user/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users : any = [];
  search_users : any = [];
  option : any = {
    keyword : ''
  };
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAll()
        .subscribe( res => {
          this.users = res;
          this.search_users = res;
        });
  }

  search(){
    this.search_users = this.users.filter( item => {
      if (this.option.keyword.trim() ===''){
        return true;
      }
      if (item.username.indexOf(this.option.keyword) != -1){
        return true;
      }
      return false;
    });
  }

  submit(mode,user){
    if (mode){
      this.users.push(user);
      this.search();
      swal({
        title: '提醒',
        text: "添加成功！",
        type: 'success',
        confirmButtonText: '确认'
      });
    }else{
      const u = _.find(this.users, item => {
        return item._id === user._id;
      });
      u && Object.assign(u,user);
      swal({
        title: '提醒',
        text: "更新成功！",
        type: 'success',
        confirmButtonText: '确认'
      });
    }
  }

  delete(user){
    const me = this;
    swal({
      title: '删除用户',
      text: "该操作将删除当前用户？",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(function () {
      me.userService.delete(user._id)
          .subscribe( res => {
            _.remove(me.users,function(item){ return item._id===user._id });
            _.remove(me.search_users,function(item){ return item._id===user._id });
          });
    },function(){
    });
  }

  password(user,password){
    user.password = password;
    this.userService.password(user)
        .subscribe( res => {
          swal({
            title: '提醒',
            text: "重设成功！",
            type: 'success',
            confirmButtonText: '确认'
          });
        })
  }

  unbind(user){
    const me = this;
    swal({
      title: '解绑用户',
      text: "该操作将解除用户的微信绑定？",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(function () {
      user.weixin = '';
      me.userService.update(user)
          .subscribe( res => {
          });
    },function(){
    });
  }

}
