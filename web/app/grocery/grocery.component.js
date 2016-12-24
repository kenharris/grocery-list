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
var GroceryComponent = (function () {
    function GroceryComponent(userService, router) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.userService.authenticationAnnounced.subscribe(function (loggedIn) {
            if (loggedIn === false) {
                _this.router.navigate(['/login']);
            }
        });
    }
    GroceryComponent.prototype.ngOnInit = function () { this.getLists(); };
    GroceryComponent.prototype.getLists = function () {
        var _this = this;
        this.userService
            .getUser()
            .then(function (user) { return _this.user = user; });
    };
    GroceryComponent.prototype.newList = function () {
        var _this = this;
        this.userService
            .createList(this.newListName)
            .then(function (user) { return _this.user = user; });
        this.newListName = '';
    };
    GroceryComponent.prototype.listNameKeypress = function (e) {
        if (e.keyCode !== 13)
            return;
        if (this.newListName == null || this.newListName == '')
            return;
        this.newList();
    };
    GroceryComponent.prototype.removeList = function (listId) {
        var _this = this;
        this.userService
            .removeList(listId)
            .then(function (user) { return _this.user = user; });
    };
    GroceryComponent = __decorate([
        core_1.Component({
            selector: 'my-grocery',
            templateUrl: './app/grocery/grocery.component.html',
            styleUrls: ['./app/grocery/grocery.component.css']
        }), 
        __metadata('design:paramtypes', [UserService_1.UserService, router_1.Router])
    ], GroceryComponent);
    return GroceryComponent;
}());
exports.GroceryComponent = GroceryComponent;
//# sourceMappingURL=grocery.component.js.map