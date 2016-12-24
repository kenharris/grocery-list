"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var cookies_service_1 = require('angular2-cookie/services/cookies.service');
var UserService = (function () {
    function UserService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.apiUrl = 'http://localhost:3002';
        this.apiListsUrl = this.apiUrl + '/lists';
        this.apiUsersUrl = this.apiUrl + '/users';
        this.authenticationSource = new Subject_1.Subject();
        this.authenticationAnnounced = this.authenticationSource.asObservable();
    }
    UserService.prototype.getUser = function () {
        var headers = new http_1.Headers();
        headers.append('Authorization', this.cookieService.get('token'));
        return this.http.get(this.apiListsUrl, { headers: headers })
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.createList = function (listName) {
        var headers = new http_1.Headers();
        headers.append('Authorization', this.cookieService.get('token'));
        return this.http.post(this.apiListsUrl, JSON.stringify({ 'listName': listName }), { headers: headers })
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.removeList = function (listId) {
        var headers = new http_1.Headers();
        headers.append('Authorization', this.cookieService.get('token'));
        var deleteUrl = this.apiListsUrl + '/' + listId;
        return this.http.delete(deleteUrl, { headers: headers })
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.addItemToList = function (listId, listItem) {
        var headers = new http_1.Headers();
        headers.append('Authorization', this.cookieService.get('token'));
        var postUrl = this.apiListsUrl + '/' + listId;
        return this.http.post(postUrl, listItem, { headers: headers })
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.removeItemFromList = function (listId, itemId) {
        var headers = new http_1.Headers();
        headers.append('Authorization', this.cookieService.get('token'));
        var deleteUrl = this.apiListsUrl + '/' + listId + '/' + itemId;
        return this.http.delete(deleteUrl, { headers: headers })
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.updateListItem = function (listId, itemId, item) {
        var headers = new http_1.Headers();
        headers.append('Authorization', this.cookieService.get('token'));
        var apiUrl = this.apiListsUrl + '/' + listId + '/' + itemId;
        return this.http.put(apiUrl, item, { headers: headers })
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.signUp = function (email, password) {
        var apiUrl = this.apiUsersUrl;
        return this.http.post(apiUrl, JSON.stringify({ 'email': email, 'password': password }))
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.authenticate = function (email, password) {
        var apiUrl = this.apiUsersUrl + '/authenticate';
        return this.http.post(apiUrl, JSON.stringify({ 'email': email, 'password': password }))
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.logOut = function () {
        this.cookieService.remove('token');
    };
    UserService.prototype.isLoggedIn = function () {
        return this.cookieService.get('token') != null;
    };
    UserService.prototype.announceLogIn = function () {
        this.authenticationSource.next(true);
    };
    UserService.prototype.announceLogOut = function () {
        this.authenticationSource.next(false);
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body || {};
    };
    UserService.prototype.handleError = function (error) {
        var responseBody = JSON.parse(error._body);
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (responseBody.message) ? responseBody.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg).toPromise();
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, cookies_service_1.CookieService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map