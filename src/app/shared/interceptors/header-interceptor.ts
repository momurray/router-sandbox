import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { OktaService } from '../services/okta.service';

@Injectable({
    providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private oktaService:OktaService) {    } 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // This is where I can communal headers, auth token, etc.
        let dummyrequest;
        let sessionToken=this.oktaService.getSessionToken();
        if (sessionToken) {
 
            dummyrequest = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}` 
                }
            });
        }
        else{
            dummyrequest = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Do this if I want to handle the errors centrally and not pass on the error message. 
        return next.handle(dummyrequest)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError((error) => {
                    let errorMessage = this.processError(error);
                    console.log(errorMessage);

                    // I'm doing this so that my local error handling can also do something if it wants to. This is typically useful when
                    // something like a spinner needs to be taken down. 
                    return throwError(error);
                })
            );
    }

    // Do a better job of deciphering http status codes :)
    processError(error: any): string {
        let errorMessage = `(${error.status}) : ${error.error}`;

        switch (error.status) {
            case 0:
                errorMessage = "Unable to connect to the remote service. Please check your internet connection.";
                break;

            case 500:
                errorMessage = "An error has occurred on the server. Please try again.";
                break;

            case 401:
                errorMessage = "Unable to authenticate with server. Have you changed your network connection?";
                break;

            case 400:
                if( error.error ){
                    errorMessage = error.error;
                }
                break;

            case 404:
                errorMessage = "The requested endpoint does not exist.";
                break;

        }

        return errorMessage;
    }
}