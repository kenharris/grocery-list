import { GroceryList } from './GroceryList';

export class User {
  _id: string;
  email: string;
  password: string;
  lists: GroceryList[];
}
