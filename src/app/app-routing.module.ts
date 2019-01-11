import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedComponent } from './components/protected/protected.component';
import { UnprotectedComponent } from './components/unprotected/unprotected.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ViewTokenComponent } from './components/view-token/view-token.component';
import { SendMailComponent } from './components/send-mail/send-mail.component';

const routes: Routes = [
    {
        path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard]
    },
    {
        path: 'unprotected', component: UnprotectedComponent
    },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
    },
    {
        path: 'viewtoken', component: ViewTokenComponent
    },
    {
        path: 'sendmail', component: SendMailComponent
    },
    {
        path: '', pathMatch: 'full', redirectTo: 'dashboard'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
