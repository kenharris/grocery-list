import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from '../models/User';
import { GroceryListItem } from '../models/GroceryListItem'

import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class UserService {
  private apiUrl = 'http://localhost:3002';
  private apiListsUrl = this.apiUrl + '/lists';
  private apiUsersUrl = this.apiUrl + '/users';

  constructor (private http: Http, private cookieService: CookieService) {}

  getUser(): Promise<User> {
    return this.http.get(this.apiListsUrl)
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  createList(listName:string): Promise<User> {
    return this.http.post(this.apiListsUrl, JSON.stringify({'listName': listName}))
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  removeList(listId:string): Promise<User> {
    let deleteUrl = this.apiListsUrl + '/' + listId;
    return this.http.delete(deleteUrl)
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  addItemToList(listId:string, listItem:GroceryListItem): Promise<User> {
    let postUrl = this.apiListsUrl + '/' + listId;
    return this.http.post(postUrl, listItem)
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  removeItemFromList(listId:string, itemId: string): Promise<User> {
    let deleteUrl = this.apiListsUrl + '/' + listId + '/' + itemId;
    return this.http.delete(deleteUrl)
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  updateListItem(listId:string, itemId: string, item:GroceryListItem): Promise<User> {
    let apiUrl = this.apiListsUrl + '/' + listId + '/' + itemId;
    return this.http.put(apiUrl, item)
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  signUp(email:string, password: string): Promise<User> {
    let apiUrl = this.apiUsersUrl;
    console.log(JSON.stringify({'email': email, 'password': password}));
    console.log({'email': email, 'password': password});
    return this.http.post(apiUrl, JSON.stringify({'email': email, 'password': password}))
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  authenticate(email:string, password: string): Promise<any> {
    let apiUrl = this.apiUsersUrl + '/authenticate';
    console.log(JSON.stringify({'email': email, 'password': password}));
    console.log({'email': email, 'password': password});
    return this.http.post(apiUrl, JSON.stringify({'email': email, 'password': password}))
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  private extractData(res: Response): User {
    let body = res.json();
    console.log(body);
    return body || { };
  }

  private handleError (error: any) {
    console.log(error);
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg).toPromise();
  }
}
