import { Injectable } from '@angular/core';
import OktaSignIn from '@okta/okta-signin-widget';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class OktaService {

    signIn;

    constructor(private userService: UserService) {

        this.signIn = new OktaSignIn({
            baseUrl: 'https://dev-288917.oktapreview.com',
            clientId: '0oag6vxqecoBf267O0h7',
            redirectUri: 'http://localhost:4200',
            authParams: {
                issuer: 'default',
                responseType: ['id_token', 'token'],
                display: 'page'
            },
            logo: '../../../assets/logo-rms.png',
            language: 'en',
            i18n: {
                en: {
                    'primaryauth.title': 'Sign in to MOM RMS'
                }
            },
        });

    }

    checkOktaStatus() {
        // Does a token exist ? 
        let token = this.signIn.tokenManager.get('id_token');
        if (token) {
            console.log("token already exists");

            // Check it hasn't expired. 
            let timenow: number = Math.round((new Date().getTime()) / 1000);
            if (token.expiresAt > timenow) {
                console.log("token still valid");
                this.userService.setLoginStatus(true);
            }
            else {
                console.log("token has expired");
                this.userService.setLoginStatus(false);
            }
        }
        else {
            console.log("no existing token");
            this.userService.setLoginStatus(false);
        }
    }

    getSessionToken(): string {
        var token = this.signIn.tokenManager.get('id_token');
        if (token) {
            return token.idToken;
        }
        else {
            return "no token";
        }
    }

    getRawToken() {
        return this.signIn.tokenManager.get('id_token');
    }

    login() {
        if (!this.signIn.token.hasTokensInUrl()) {
            this.signIn.renderEl({ el: '#signin-widget' },
                function () { },
                function (err) { console.log(err) });
        }
        else {
            this.signIn.token.parseTokensFromUrl(
                (res) => {
                    // Add the token to tokenManager to automatically renew the token when needed
                    this.signIn.tokenManager.add('id_token', res[0]);
                    this.signIn.tokenManager.add('access_token', res[1]);
                    this.userService.setLoginStatus(true);
                },
                function error(err) {
                    console.log('handle error', err);
                }
            );
        }
    }

    logout() {
        this.signIn.session.close();
        this.signIn.tokenManager.clear();
        this.userService.setLoginStatus(false);
    }

}
