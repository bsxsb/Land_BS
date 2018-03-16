import { NgModule } from '@angular/core';
import { CoreModule } from "../../core/core.module";
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";

import { DataComponent } from './data.component';
import { UserComponent } from './user/user.component';
import { CompanyComponent } from './company/company.component';
import { DocumentComponent } from './document/document.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserPasswordComponent } from './user/user-password/user-password.component';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { AuthGuard } from "../../auth.guard";
import { PrivilegeComponent } from './privilege/privilege.component';
import { PrivilegeDetailComponent } from "./privilege/privilege-detail/privilege-detail.component";


const routes: Routes = [
  { path: '', component: DataComponent,
    children: [
      {
        path: 'res',
        children: [{
          path: 'document',
          component: DocumentComponent,
          canActivate: [AuthGuard],
          data:{
            module:'文档管理'
          }
        }]
      },
      {
        path: 'role',
        children: [
          {
            path:'user',
            component: UserComponent,
            canActivate: [AuthGuard],
            data:{
              module:'用户管理'
            }
          },
          {
            path: 'group',
            component: GroupComponent,
            canActivate: [AuthGuard],
            data:{
              module:'角色管理'
            }
          },
          {
            path: 'privilege',
            component: PrivilegeComponent,
            //canActivate: [AuthGuard],
            data:{
              module:'模块管理'
            }
          },
          {
            path: 'company',
            component: CompanyComponent,
            canActivate: [AuthGuard],
            data:{
              module:'企业列表'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreModule.forChild(),
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DataComponent, UserComponent, CompanyComponent, DocumentComponent, CompanyDetailComponent, UserDetailComponent, UserPasswordComponent, GroupComponent, GroupDetailComponent, DocumentDetailComponent, PrivilegeComponent, PrivilegeDetailComponent]

})
export class DataModule { }
