import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {
  @ViewChild('lgModal') modal:ModalDirective;
  result : boolean = false;
  user : any = {};
  password: string;
  @Output() public onSubmit = new EventEmitter<UserPasswordComponent>();
  @Output() public onCancel = new EventEmitter<UserPasswordComponent>();
  constructor() { }

  ngOnInit() {
  }

  show(user) {
    this.password = "";
    this.user = user;
    this.modal.show();
  }

  submit(){
    this.result = true;
    this.modal.hide();
    this.onSubmit.emit(this);
  }

  cancel() {
    this.result = false;
    this.modal.hide();
    this.onCancel.emit(this);
  }

}
