import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../../shared/group/group.service";
import {default as swal} from 'sweetalert2';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups : any = [];
  search_groups : any = [];
  option : any = {
    keyword : ''
  };
  constructor(private groupService:GroupService) { }

  ngOnInit() {
    this.groupService.getAll()
        .subscribe( res => {
          this.groups = res;
          this.search_groups = res;
        });
  }

  search(){
    this.search_groups = this.groups.filter( item => {
      if (this.option.keyword.trim() ===''){
        return true;
      }
      if (item.name.indexOf(this.option.keyword) != -1){
        return true;
      }
      return false;
    });
  }

  submit(mode,group){
    if (mode){
      this.groups.push(group);
      this.search();
      swal({
        title: '提醒',
        text: "添加成功！",
        type: 'success',
        confirmButtonText: '确认'
      });
    }else{
      const g = _.find(this.groups, item => {
        return item._id === group._id;
      });
      g && Object.assign(g,group);
      swal({
        title: '提醒',
        text: "更新成功！",
        type: 'success',
        confirmButtonText: '确认'
      });
    }
  }

  delete(group){
    const me = this;
    swal({
      title: '删除角色',
      text: "该操作将删除当前角色？",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(function () {
      me.groupService.delete(group._id)
          .subscribe( res => {
            _.remove(me.groups,function(item){ return item._id===group._id });
            _.remove(me.search_groups,function(item){ return item._id===group._id });
          });
    },function(){
    });
  }
}
