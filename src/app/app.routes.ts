import { Routes } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminOnlyComponent } from './authorize.demo/admin-only/admin-only.component';
import { RepoComponent } from './authorize.demo/repo/repo.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './shared/auth.guard';
import { claimReq } from './shared/utils/claimReq-utils';
import { CustomerComponent } from './authorize.demo/customer/customer.component';
import { ProductListComponent } from './layouts/product-list/product-list.component';

export const routes: Routes = [
    {path:'',redirectTo:'signin',pathMatch:'full'},

    {path:'',component:UserComponent,
        children:[
            {path:'signup',component:RegistrationComponent},
            {path:'signin',component:LoginComponent}
        ]
    },
    {path:'',component:MainLayoutComponent,canActivate:[authGuard],
        canActivateChild:[authGuard],
        children:[
            {path:'admin-only',component:AdminOnlyComponent,
                data: {claimReq: claimReq.adminOnly}
            },
            {path:'repo',component:RepoComponent,
                data: {claimReq: claimReq.adminOrRepo}
            },
            {path:'customer',component:CustomerComponent,
                data:{claimReq:claimReq.adminOnly}
            },

            {path:'product-list',component:ProductListComponent},
            

            {path:'forbidden',component:ForbiddenComponent}
        ]
    }

];
