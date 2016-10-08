import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import { GroceryListItem } from '../models/GroceryListItem'

//import { HEROES } from './mock-heroes';

@Injectable()
export class UserService {
  private apiUrl = 'http://localhost:3002/lists';

  constructor (private http: Http) {}

  getUser(): Promise<User> {
    return this.http.get(this.apiUrl)
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  createList(listName:string): Promise<User> {
    return this.http.post(this.apiUrl, JSON.stringify({'listName': listName}))
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  removeList(listId:string): Promise<User> {
    let deleteUrl = this.apiUrl + '/' + listId;
    return this.http.delete(deleteUrl)
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  addItemToList(listId:string, listItem:GroceryListItem): Promise<User> {
    let postUrl = this.apiUrl + '/' + listId
    return this.http.post(postUrl, listItem)
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  removeItemFromList(listId:string, itemId: string): Promise<User> {
    let deleteUrl = this.apiUrl + '/' + listId + '/' + itemId
    return this.http.delete(deleteUrl)
                    .map(this.extractData)
                    .toPromise()
                    .catch(this.handleError);
  }

  updateListItem(listId:string, itemId: string, item:GroceryListItem): Promise<User> {
    let apiUrl = this.apiUrl + '/' + listId + '/' + itemId
    return this.http.put(apiUrl, item)
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
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
