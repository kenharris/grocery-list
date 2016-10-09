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
var router_1 = require('@angular/router');
var UserService_1 = require('../services/UserService');
var cookies_service_1 = require('angular2-cookie/services/cookies.service');
var LoginComponent = (function () {
    function LoginComponent(userService, cookieService, router) {
        this.userService = userService;
        this.cookieService = cookieService;
        this.router = router;
        this.loginError = false;
    }
    LoginComponent.prototype.signup = function (email, password, isValid) {
        this.userService
            .signUp(email, password)
            .then(function (userData) { return console.log(userData); });
    };
    LoginComponent.prototype.login = function (email, password, isValid) {
        var _this = this;
        this.loginError = false;
        this.loginErrorMessage = null;
        this.userService
            .authenticate(email, password)
            .then(function (tokenData) {
            _this.cookieService.put('token', tokenData.token);
            _this.router.navigate(['/grocery']);
        }, function (error) {
            _this.loginError = true;
            _this.loginErrorMessage = "Your information did not match our records; please try again.";
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'my-login',
            templateUrl: './app/login/login.component.html',
            styleUrls: ['./app/login/login.component.css'],
            providers: [UserService_1.UserService]
        }), 
        __metadata('design:paramtypes', [UserService_1.UserService, cookies_service_1.CookieService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map