import { Component, Output, EventEmitter } from '@angular/core';

import { UserService } from '../services/UserService';

@Component({
    selector: 'gl-header',
    templateUrl: './app/header/header.component.html',
    styleUrls: ['./app/header/header.component.css']    
})
export class HeaderComponent {
    @Output() onLoggedOut = new EventEmitter<boolean>();

    private isLoggedIn: boolean = false;

    constructor(private userService: UserService) {
        this.isLoggedIn = this.userService.isLoggedIn();

        this.userService.authenticationAnnounced.subscribe(loggedIn => {
            this.isLoggedIn = loggedIn;
        });
    }

    logOut(): void {
        this.userService.logOut();
        this.userService.announceLogOut();
        
        this.isLoggedIn = false;
        this.onLoggedOut.emit(true);
    }
}