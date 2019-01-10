import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { OktaService } from './shared/services/okta.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor(private location:Location, private userService: UserService, private oktaService:OktaService) {
        
        // I'm doing this to save the URL I was started with as once my router is loaded (after login), I 
        // want to be able to navigate to that URL. 
        localStorage.setItem('startupUrl', this.location.path());

        // Subscribe to login changes. 
        this.userService.loggedIn$.subscribe((resp: boolean) => {
            console.log("status change: " + resp);
            this.isLoggedIn = resp;
            
            // If I'm here and not logged in, I need to show the Okta signin widget. 
            if (!this.isLoggedIn) {
                this.login();
            }
        });

    }

    ngOnInit() {
        this.oktaService.checkOktaStatus();
    }

    login() {
        this.oktaService.login();
    }

    logout(){
        this.oktaService.logout();
    }


}
