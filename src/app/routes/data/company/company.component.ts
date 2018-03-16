import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../../shared/company/company.service";

import {default as swal} from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies : any = [];
  search_companies : any = [];
  option : any = {
    keyword : ''
  };
  constructor(private companyService:CompanyService) { }

  ngOnInit() {
    this.companyService.getAll()
        .subscribe( res => {
          this.companies = res;
          this.search_companies = res;
        });
  }

  search(){
    this.search_companies = this.companies.filter( item => {
      if (this.option.keyword.trim() ===''){
        return true;
      }
      if (item.name.indexOf(this.option.keyword) != -1){
        return true;
      }
      return false;
    });
  }

  submit(mode,company){
    if (mode){
      this.companies.push(company);
      this.search();
      swal({
        title: '提醒',
        text: "添加成功！",
        type: 'success',
        confirmButtonText: '确认'
      });
    }else{
      const c = _.find(this.companies, item => {
        return item._id === company._id;
      });
      c && Object.assign(c,company);
      swal({
        title: '提醒',
        text: "更新成功！",
        type: 'success',
        confirmButtonText: '确认'
      });
    }
  }

  delete(company){
    const me = this;
    swal({
      title: '删除企业',
      text: "该操作将删除当前企业？",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(function () {
      me.companyService.delete(company._id)
          .subscribe( res => {
            _.remove(me.companies,function(item){ return item._id===company._id });
            _.remove(me.search_companies,function(item){ return item._id===company._id });
          });
    },function(){
    });

  }
}
