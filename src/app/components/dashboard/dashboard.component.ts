import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaService } from 'src/app/shared/services/okta.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    apiUrl: string;
    data: string = "";
    showSpinner: boolean = false;

    constructor(private http: HttpClient, private cdRef: ChangeDetectorRef, private oktaService: OktaService) {
        this.apiUrl = "https://oktatest.oqlist.co.uk"
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.cdRef.detectChanges();
    }

    getMembers() {
        this.showSpinner = true;

        console.log("get all members");

        this.http.get(`${this.apiUrl}/api/Member/GetAllMembers`).subscribe(
            (resp) => this.handleResponse(resp),
            (error) => this.handleResponse(error)
        );
    }

    getAllMemberships() {
        this.showSpinner = true;

        console.log("get all memberships");

        this.http.get(`${this.apiUrl}/api/Membership/GetAllMemberships`).subscribe(
            (resp) => this.handleResponse(resp),
            (error) => this.handleResponse(error)
        );
    }

    handleResponse(resp: any) {
        console.log(resp);
        this.data = JSON.stringify(resp);
        this.showSpinner = false;
        this.cdRef.detectChanges();
    }
}
