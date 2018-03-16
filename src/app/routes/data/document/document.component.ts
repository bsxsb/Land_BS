import { Component, OnInit } from '@angular/core';

import {default as swal} from 'sweetalert2';
import {DocumentService} from "../../../shared/document/document.service";
import {ConfigService} from "../../../core/config/config.service";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents : any = [];
  search_documents : any = [];
  option : any = {
    keyword : ''
  };
  constructor(private documentService:DocumentService,private configService:ConfigService) { }

  ngOnInit() {
    this.documentService.getAll()
        .subscribe( res => {
          this.documents = res;
          this.search_documents = res;
        });
  }

  search(){
    this.search_documents = this.documents.filter( item => {
      if (this.option.keyword.trim() ===''){
        return true;
      }
      if (item.filename.indexOf(this.option.keyword) != -1){
        return true;
      }
      return false;
    });
  }

  submit(mode,document){
    if (mode){
      this.documents.push(document);
      this.search();
      swal({
        title: '提醒',
        text: "添加成功！",
        type: 'success',
        confirmButtonText: '确认'
      });
    }else{
      const c = _.find(this.documents, item => {
        return item._id === document._id;
      });
      c && Object.assign(c,document);
      swal({
        title: '提醒',
        text: "更新成功！",
        type: 'success',
        confirmButtonText: '确认'
      });
    }
  }

  delete(document){
    const me = this;
    swal({
      title: '删除文档',
      text: "该操作将删除当前文档？",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(function () {
      me.documentService.delete(document._id)
          .subscribe( res => {
            _.remove(me.documents,function(item){ return item._id===document._id });
            _.remove(me.search_documents,function(item){ return item._id===document._id });
          });
    },function(){
    });
  }

  download(document){
    window.open(this.configService.web_api + '/files/documents/' + document.file);
  }

}
