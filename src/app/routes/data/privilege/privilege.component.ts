import { Component, OnInit } from '@angular/core';
import {PrivilegeService} from "../../../shared/privilege/privilege.service";
import {default as swal} from 'sweetalert2';
@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent implements OnInit {

  privileges : any = [];
  search_privileges : any = [];
  option : any = {
    keyword : ''
  };
  constructor(private privilegeService:PrivilegeService) { }

  ngOnInit() {
    this.privilegeService.getAll()
        .subscribe( res => {
          this.privileges = res;
          this.search_privileges = res;
        });
  }

  search(){
    this.search_privileges = this.privileges.filter( item => {
      if (this.option.keyword.trim() ===''){
        return true;
      }
      if (item.name.indexOf(this.option.keyword) != -1){
        return true;
      }
      return false;
    });
  }

  submit(mode,privilege){
    if (mode){
      this.privileges.push(privilege);
      this.search();
      swal({
        title: '提醒',
        text: "添加成功！",
        type: 'success',
        confirmButtonText: '确认'
      });
    }else{
      const g = _.find(this.privileges, item => {
        return item._id === privilege._id;
      });
      g && Object.assign(g,privilege);
      swal({
        title: '提醒',
        text: "更新成功！",
        type: 'success',
        confirmButtonText: '确认'
      });
    }
  }

  delete(privilege){
    const me = this;
    swal({
      title: '删除模块',
      text: "该操作将删除当前模块？",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(function () {
      me.privilegeService.delete(privilege._id)
          .subscribe( res => {
            _.remove(me.privileges,function(item){ return item._id===privilege._id });
            _.remove(me.search_privileges,function(item){ return item._id===privilege._id });
          });
    },function(){
    });
  }

}
