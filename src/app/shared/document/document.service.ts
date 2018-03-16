import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ConfigService } from "../../core/config/config.service";
import { AuthService } from "../../login/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DocumentService {
  private baseUrl = this.configService.web_api +  '/documents';  // URL to web API
  constructor (private http: HttpClient, private authService: AuthService, private configService: ConfigService) {}

  create(document: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/create", { document : document }, options);
  }

  delete(id:string) :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/" + id + "/remove",options);
  }

  update(document: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/" + document._id + "/update", { document : document }, options);
  }

  getAll() :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/", options);
  }

  getByType(data) :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/type/" + data.base +"/"+ data.sub, options);
  }

  getOne(id:string):  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/" + id,options);
  }

}
