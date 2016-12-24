import { Component } from '@angular/core';

import './rxjs-operators';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { UserService } from './services/UserService';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [ CookieService, UserService  ]
})
export class AppComponent {
    constructor (private userService: UserService) { }

    logOut(e: any): void {
        console.log("Logged Out!");
        console.log(e);
        this.userService.announceLogOut();
    }
}
