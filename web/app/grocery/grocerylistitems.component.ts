import { Component, OnInit }  from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../models/User';
import { GroceryList } from '../models/GroceryList'
import { GroceryListItem } from '../models/GroceryListItem'
import { UserService } from '../services/UserService';

@Component({
    selector: 'my-grocery-list-items',
    templateUrl: './app/grocery/grocerylistitems.component.html',
    styleUrls: ['./app/grocery/grocerylistitems.component.css'],
    providers: [UserService]
})
export class GroceryListItemsComponent implements OnInit {
  user: any;
  newItemName: string;
  groceryList: GroceryList;
  listId: string;

  constructor (private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params
          .map(params => params['listId'])
          .subscribe(listId => {
              this.listId = listId;
              this.getListItems();
          });
  }

  newItem() {
    if (this.newItemName == null || this.newItemName == '') return;
    
    let listItem = new GroceryListItem(this.newItemName, "1");
    this.groceryList.items.push(listItem);
    this.newItemName = '';

    this.userService
        .addItemToList(this.listId, listItem)
        .then(userData => this.groceryList = this.parseUserData(userData));
  }

  removeItem(itemId: string) {
    this.userService
        .removeItemFromList(this.listId, itemId)
        .then(userData => this.groceryList = this.parseUserData(userData));
    console.log(itemId);
  }

  toggleItemCompleted(itemId: string) {
    console.log(itemId);
    let item = this.groceryList.items.find(function(thisItem) {
      return thisItem.id === itemId;
    });
    item.completed = !item.completed;    
    this.userService
        .updateListItem(this.listId, itemId, item)
        .then(userData => this.groceryList = this.parseUserData(userData));
  }

  getListItems() {
    this.userService
    .getUser()
    .then(userData => {
      this.groceryList = this.parseUserData(userData);
    });
  }

  listItemKeypress(e:any) {
    if (e.keyCode !== 13) return;

    this.newItem();
  }

  parseUserData(user: User):GroceryList {
    let groceryList = user.lists.find(function(thisList:GroceryList) {
      return thisList.id === this.listId;
    }, this);

    if (!groceryList.items) {
      groceryList.items = [];
    }
    
    groceryList.items = groceryList.items.sort(this.sortGroceryItems);

    return groceryList;
  }

  sortGroceryItems(a:GroceryListItem, b:GroceryListItem) {
    if (a.completed == b.completed)
        return a.name.localeCompare(b.name);
      else
        return (a.completed ? 1 : -1);
  }
}
