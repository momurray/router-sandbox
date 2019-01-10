import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    loggedIn: boolean = false;
    loggedIn$: Subject<boolean> = new Subject<boolean>();

    constructor() {
    }

    getLoginStatus(): boolean {
        return this.loggedIn;
    }

    setLoginStatus(status: boolean) {
        localStorage.setItem('loggedIn', JSON.stringify(status));
        this.loggedIn = status;
        this.loggedIn$.next(status);
    }
}
