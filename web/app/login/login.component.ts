import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/UserService';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
    selector: 'my-login',
    templateUrl: './app/login/login.component.html',
    styleUrls: [ './app/login/login.component.css' ],
    providers: [ UserService ]
})
export class LoginComponent { 
    loginEmail: string;
    loginPassword: string;

    signupEmail: string;
    signupPassword: string;
    signupConfirmPassword: string;

    loginError: boolean = false;
    loginErrorMessage: string;

    constructor(private userService: UserService, private cookieService: CookieService,
                private router: Router) { }

    signup(email: string, password: string, isValid: boolean) {
        this.userService
            .signUp(email, password)
            .then(userData => console.log(userData));
    } 

    login(email: string, password: string, isValid: boolean) {
        this.loginError = false;
        this.loginErrorMessage = null;

        this.userService
            .authenticate(email, password)
            .then(tokenData => {
                    this.cookieService.put('token', tokenData.token);
                    this.router.navigate(['/grocery']);
                },
                error => {
                    this.loginError = true;
                    this.loginErrorMessage = "Your information did not match our records; please try again.";
                })
    }
}
