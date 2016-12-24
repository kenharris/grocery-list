import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { User } from '../models/User';
import { GroceryListItem } from '../models/GroceryListItem'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class UserService {
  private apiUrl = 'http://localhost:3002';
  private apiListsUrl = this.apiUrl + '/lists';
  private apiUsersUrl = this.apiUrl + '/users';

  private authenticationSource = new Subject<boolean>();
  public authenticationAnnounced = this.authenticationSource.asObservable(); 

  constructor (private http: Http, private cookieService: CookieService) {}

  getUser(): Promise<User> {
    var headers = new Headers();
    headers.append('Authorization', this.cookieService.get('token'));

    return this.http.get(this.apiListsUrl, { headers: headers })
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  createList(listName:string): Promise<User> {
    var headers = new Headers();
    headers.append('Authorization', this.cookieService.get('token'));

    return this.http.post(this.apiListsUrl, 
                          JSON.stringify({'listName': listName}), 
                          { headers: headers })
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  removeList(listId:string): Promise<User> {
    var headers = new Headers();
    headers.append('Authorization', this.cookieService.get('token'));

    let deleteUrl = this.apiListsUrl + '/' + listId;
    return this.http.delete(deleteUrl, { headers: headers })
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  addItemToList(listId:string, listItem:GroceryListItem): Promise<User> {
    var headers = new Headers();
    headers.append('Authorization', this.cookieService.get('token'));

    let postUrl = this.apiListsUrl + '/' + listId;
    return this.http.post(postUrl, listItem, { headers: headers })
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  removeItemFromList(listId:string, itemId: string): Promise<User> {
    var headers = new Headers();
    headers.append('Authorization', this.cookieService.get('token'));

    let deleteUrl = this.apiListsUrl + '/' + listId + '/' + itemId;
    return this.http.delete(deleteUrl, { headers: headers })
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  updateListItem(listId:string, itemId: string, item:GroceryListItem): Promise<User> {
    var headers = new Headers();
    headers.append('Authorization', this.cookieService.get('token'));

    let apiUrl = this.apiListsUrl + '/' + listId + '/' + itemId;
    return this.http.put(apiUrl, item, { headers: headers })
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  signUp(email:string, password: string): Promise<User> {
    let apiUrl = this.apiUsersUrl;
    return this.http.post(apiUrl, JSON.stringify({'email': email, 'password': password}))
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  authenticate(email:string, password: string): Promise<any> {
    let apiUrl = this.apiUsersUrl + '/authenticate';
    return this.http.post(apiUrl, JSON.stringify({'email': email, 'password': password}))
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  logOut(): void {
    this.cookieService.remove('token');
  }

  isLoggedIn(): boolean {
    return this.cookieService.get('token') != null;
  }

  announceLogIn(): void {
    this.authenticationSource.next(true);
  }

  announceLogOut(): void {
    this.authenticationSource.next(false);
  }

  private extractData(res: Response): User {
    let body = res.json();
    console.log(body);
    return body || { };
  }

  private handleError (error: any) {
    let responseBody = JSON.parse(error._body);

    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (responseBody.message) ? responseBody.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg).toPromise();
  }
}
