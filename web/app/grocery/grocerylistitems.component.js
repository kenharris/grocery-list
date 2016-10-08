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
var GroceryListItem_1 = require('../models/GroceryListItem');
var UserService_1 = require('../services/UserService');
var GroceryListItemsComponent = (function () {
    function GroceryListItemsComponent(route, userService) {
        this.route = route;
        this.userService = userService;
    }
    GroceryListItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .map(function (params) { return params['listId']; })
            .subscribe(function (listId) {
            _this.listId = listId;
            _this.getListItems();
        });
    };
    GroceryListItemsComponent.prototype.newItem = function () {
        var _this = this;
        if (this.newItemName == null || this.newItemName == '')
            return;
        var listItem = new GroceryListItem_1.GroceryListItem(this.newItemName, "1");
        this.groceryList.items.push(listItem);
        this.newItemName = '';
        this.userService
            .addItemToList(this.listId, listItem)
            .then(function (userData) { return _this.groceryList = _this.parseUserData(userData); });
    };
    GroceryListItemsComponent.prototype.removeItem = function (itemId) {
        var _this = this;
        this.userService
            .removeItemFromList(this.listId, itemId)
            .then(function (userData) { return _this.groceryList = _this.parseUserData(userData); });
        console.log(itemId);
    };
    GroceryListItemsComponent.prototype.toggleItemCompleted = function (itemId) {
        var _this = this;
        console.log(itemId);
        var item = this.groceryList.items.find(function (thisItem) {
            return thisItem.id === itemId;
        });
        item.completed = !item.completed;
        this.userService
            .updateListItem(this.listId, itemId, item)
            .then(function (userData) { return _this.groceryList = _this.parseUserData(userData); });
    };
    GroceryListItemsComponent.prototype.getListItems = function () {
        var _this = this;
        this.userService
            .getUser()
            .then(function (userData) {
            _this.groceryList = _this.parseUserData(userData);
        });
    };
    GroceryListItemsComponent.prototype.listItemKeypress = function (e) {
        if (e.keyCode !== 13)
            return;
        this.newItem();
    };
    GroceryListItemsComponent.prototype.parseUserData = function (user) {
        var groceryList = user.lists.find(function (thisList) {
            return thisList.id === this.listId;
        }, this);
        if (!groceryList.items) {
            groceryList.items = [];
        }
        groceryList.items = groceryList.items.sort(this.sortGroceryItems);
        return groceryList;
    };
    GroceryListItemsComponent.prototype.sortGroceryItems = function (a, b) {
        if (a.completed == b.completed)
            return a.name.localeCompare(b.name);
        else
            return (a.completed ? 1 : -1);
    };
    GroceryListItemsComponent = __decorate([
        core_1.Component({
            selector: 'my-grocery-list-items',
            templateUrl: './app/grocery/grocerylistitems.component.html',
            styleUrls: ['./app/grocery/grocerylistitems.component.css'],
            providers: [UserService_1.UserService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, UserService_1.UserService])
    ], GroceryListItemsComponent);
    return GroceryListItemsComponent;
}());
exports.GroceryListItemsComponent = GroceryListItemsComponent;
//# sourceMappingURL=grocerylistitems.component.js.map