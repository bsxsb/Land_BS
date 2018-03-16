import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {default as swal} from 'sweetalert2';
import {DocumentService} from "../../../../shared/document/document.service";
import {FileItem, FileUploader} from "ng2-file-upload";
import {ConfigService} from "../../../../core/config/config.service";
import {AuthService} from "../../../../login/auth.service";

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  isShow: boolean = false;
  document: any = {
    base_type: null,
    sub_type: null
  };
  mode: any = {
    create: true,
    readonly: false
  };
  uploader1: FileUploader = new FileUploader({ url : this.configService.web_api + '/document-upload',autoUpload : true  });
  @Output() public onSubmit = new EventEmitter<DocumentDetailComponent>();

  document_type : any =[
      {
        "name" : "建设组织工作机制",
         "sub_type" : ["组织机制文件","定期例会","工作职责要求"]
      },{
        "name" : "专项规划",
        "sub_type" : ["规划文件","评审批复"]
      },{
         "name" : "详细规划",
        "sub_type" : ["规划文件","评审批复"]
      },{
        "name" : "规划落实",
        "sub_type" : ["管控文件","编制标准","规划审查"]
      },{
        "name" : "建设宣传及公众参与",
        "sub_type" : ["宣传计划","培训交流","公众参与"]
      },{
        "name" : "工程与设施运营维护",
        "sub_type" :["制度文件","制度实施","运行记录"]
     },{
        "name" : "资金保障制度实施",
        "sub_type" :["保障制度","制度实施"]
     },{
        "name" : "制度创新",
        "sub_type" :["标准规范","管理制度"]
     },{
        "name" : "技术经济创新",
        "sub_type" :["资本参与","评估考核","投资效益"]
     }];

  constructor(private configService:ConfigService, private documentService: DocumentService, private authService: AuthService) {
  }

  compareDocBaseType(g1: any, g2: any): boolean {
    return g1 && g2 ? g1.name === g2.name : g1 === g2;
  };

  ngOnInit() {
    const me = this;
    this.uploader1.onSuccessItem = (item, response, status, headers) => {
      this.document.filename = item.file.name;
      this.document.name = item.file.name.substr(0,item.file.name.indexOf("."));
      this.document.file = response;
    };
    this.uploader1.onBeforeUploadItem = (fileItem:FileItem)=> {
      fileItem.withCredentials  = false;
    };
  }

  show(document) {
    if (document) {
      this.mode.create = false;
      this.documentService.getOne(document._id)
          .subscribe( res => {
            this.document = res;
            this.isShow = true;
          });
    } else {
      this.mode.create = true;
      this.document = {
        author : this.authService.user,
        base_type : null,
        sub_type: ''
      };
      this.isShow = true;
    }
  }

  hide() {
    this.isShow = false;
    this.document = {};
  }

  submit() {
    if (this.mode.create) {
      this.documentService.create(this.document)
          .subscribe(res => {
            this.document._id = res.document._id;
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
      this.documentService.update(this.document)
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

  fileChange(evt:any) {
    evt.target.value = null;
  }
}
