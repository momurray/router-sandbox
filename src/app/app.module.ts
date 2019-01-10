import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { UnprotectedComponent } from './components/unprotected/unprotected.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterOutletComponent } from './components/router-outlet/router-outlet.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserService } from './shared/services/user.service';
import { OktaService } from './shared/services/okta.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './shared/interceptors/header-interceptor';
import { ViewTokenComponent } from './components/view-token/view-token.component';

@NgModule({
    declarations: [
        AppComponent,
        ProtectedComponent,
        UnprotectedComponent,
        DashboardComponent,
        RouterOutletComponent,
        ViewTokenComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        AuthGuard,
        UserService,
        OktaService,
        // This interceptor fires for all http calls (bug fixed in Ang 5).
        { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
