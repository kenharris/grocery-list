import { Component } from '@angular/core';

import './rxjs-operators';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [ CookieService ]
})
export class AppComponent { }
