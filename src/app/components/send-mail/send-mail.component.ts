import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjectProperties, InvalidEmail, BouncedEmails, SendEmail } from 'src/app/shared/models/properties.model';

@Component({
    selector: 'app-send-mail',
    templateUrl: './send-mail.component.html',
    styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

    apiUrl: string;
    message: string = "";
    props: Array<ObjectProperties> = [];

    constructor(private httpClient: HttpClient) {
        this.apiUrl = "https://mailerapi.oqlist.co.uk"
    }

    ngOnInit() {
    }

    getStatistics() {
        this.httpClient.get(`${this.apiUrl}/api/Mail/GetStatistics`).subscribe((resp: any) => {
            this.props = [];
            for (var p in resp) {
                this.props.push({ name: p, value: resp[p] });
            }
        });
    }

    invalidEmails() {
        this.httpClient.get<InvalidEmail[]>(`${this.apiUrl}/api/Mail/InvalidEmails`).subscribe((resp: InvalidEmail[]) => {
            this.props = [];
            resp.forEach(element => {
                this.props.push({ name: "email", value: JSON.stringify(element) })
            });
        });
    }

    bouncedEmails() {
        let startDate:string="1 Oct 2018";

        this.httpClient.get<BouncedEmails[]>(`${this.apiUrl}/api/Mail/BouncedEmails?startDate=${startDate}`).subscribe((resp: BouncedEmails[]) => {
            this.props = [];
            resp.forEach(element => {
                this.props.push({ name: "email", value: JSON.stringify(element) })
            });
        });
    }

    sendEmail() {
        let body: SendEmail = {
            to: 'markowenmurray@gmail.com',
            subject: 'Test email message from Mailer API',
            textContent: 'This is some text content.',
            htmlContent: '<strong>This is the text content in bold.</strong>'
        }
        this.httpClient.post(`${this.apiUrl}/api/Mail/SendEmail`, body).subscribe((resp:string) => {
            this.message = resp;
        });
    }

    sendEmailToMany() {
        let body: SendEmail = {
            to: 'markowenmurray@gmail.com;david.jamison@rewardinsight.com',
            subject: 'Test multi-email message from Mailer API',
            textContent: 'This is some text content.',
            htmlContent: '<strong>This is the text content in bold.</strong>'
        }
        this.httpClient.post<string>(`${this.apiUrl}/api/Mail/SendEmailToMany`, body).subscribe((resp: string) => {
            this.message = resp;
        });
    }
}
