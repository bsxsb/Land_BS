import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from "../login/login/login.component";
import { AuthGuard } from "../auth.guard";


export const routes = [

    { path: 'login', component: LoginComponent },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutComponent
        /*canActivate: [AuthGuard],*/,
        children: [
            {
                path: 'map',
                canActivate: [AuthGuard],
                loadChildren: './map/map.module#MapModule',
                data:{
                    module:'海绵地图'
                }
            },
            {
                path: 'data',
                loadChildren: './data/data.module#DataModule',
                canActivate: [AuthGuard],
                data:{
                    module:'数据中心'
                }
            }
        ]
    },

    // Not found
    { path: '**', redirectTo: 'login' }

];
