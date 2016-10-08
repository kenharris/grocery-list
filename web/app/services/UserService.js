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
//import { HEROES } from './mock-heroes';
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:3002/lists';
    }
    UserService.prototype.getUser = function () {
        return this.http.get(this.apiUrl)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.createList = function (listName) {
        return this.http.post(this.apiUrl, JSON.stringify({ 'listName': listName }))
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.removeList = function (listId) {
        var deleteUrl = this.apiUrl + '/' + listId;
        return this.http.delete(deleteUrl)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.addItemToList = function (listId, listItem) {
        var postUrl = this.apiUrl + '/' + listId;
        return this.http.post(postUrl, listItem)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.removeItemFromList = function (listId, itemId) {
        var deleteUrl = this.apiUrl + '/' + listId + '/' + itemId;
        return this.http.delete(deleteUrl)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.updateListItem = function (listId, itemId, item) {
        var apiUrl = this.apiUrl + '/' + listId + '/' + itemId;
        return this.http.put(apiUrl, item)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body || {};
    };
    UserService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map