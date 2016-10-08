import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { RouterModule }     from '@angular/router';
import { HttpModule }       from '@angular/http';
import { FormsModule }      from '@angular/forms';

import { AppComponent }     from './app.component';
import { routes }           from './app.routes';

import { HomeComponent }    from './home/home.component';
import { LoginComponent }   from './login/login.component';
import { GroceryComponent } from './grocery/grocery.component';
import { GroceryListItemsComponent } from './grocery/grocerylistitems.component';
import { HeaderComponent }  from './header/header.component';
import { FooterComponent }  from './footer/footer.component';

@NgModule({
  imports: [ BrowserModule, RouterModule.forRoot(routes), HttpModule, FormsModule ],
  declarations: [ AppComponent, HomeComponent, LoginComponent,
                  GroceryComponent,GroceryListItemsComponent, HeaderComponent, FooterComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
