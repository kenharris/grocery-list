"use strict";
var home_component_1 = require('./home/home.component');
var login_component_1 = require('./login/login.component');
var grocery_component_1 = require('./grocery/grocery.component');
exports.routes = [
    { path: '', component: home_component_1.HomeComponent, pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'grocery', component: grocery_component_1.GroceryComponent }
];
//# sourceMappingURL=app.routes.js.map