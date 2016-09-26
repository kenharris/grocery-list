import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GroceryComponent } from './grocery/grocery.component';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'grocery', component: GroceryComponent }
];
