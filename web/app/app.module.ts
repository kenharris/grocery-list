import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { AppComponent }   from './app.component';
import { routes }         from './app.routes';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GroceryComponent } from './grocery/grocery.component';

@NgModule({
  imports: [ BrowserModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, HomeComponent, LoginComponent, GroceryComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
