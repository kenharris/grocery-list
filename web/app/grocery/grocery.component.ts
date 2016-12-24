import { Component, OnInit }  from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/User';
import { UserService } from '../services/UserService';

@Component({
    selector: 'my-grocery',
    templateUrl: './app/grocery/grocery.component.html',
    styleUrls: [ './app/grocery/grocery.component.css' ]
})
export class GroceryComponent implements OnInit {
  user: any;
  newListName: string;

  constructor (private userService: UserService, private router: Router) {
    this.userService.authenticationAnnounced.subscribe(loggedIn => {
      if (loggedIn === false) {
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnInit() { this.getLists(); }

  getLists() {
    this.userService
        .getUser()
        .then(
          user => this.user = user
        );
  }

  newList() {
    this.userService
        .createList(this.newListName)
        .then(
          user => this.user = user
        );
    this.newListName = '';
  }

  listNameKeypress(e:any) {
    if (e.keyCode !== 13) return;
    if (this.newListName == null || this.newListName == '') return;

    this.newList();
  }

  removeList(listId: string) {
    this.userService
        .removeList(listId)
        .then(
          user => this.user = user
        );
  }

}
