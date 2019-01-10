import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-router-outlet',
    templateUrl: './router-outlet.component.html',
    styleUrls: ['./router-outlet.component.css']
})
export class RouterOutletComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
        // If I had a url when started, go back to it. This is handled in conjunction with the 
        // app.component.ts that sets this value on app initialisation.
        let startupUrl: string = localStorage.getItem('startupUrl');
        if (!startupUrl) {
            startupUrl = "/";
        }
        this.router.navigate([startupUrl]);
    }

}
