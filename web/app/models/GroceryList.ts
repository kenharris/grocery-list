import { GroceryListItem } from './GroceryListItem';

export class GroceryList {
  id: string;
  name: string;
  items: GroceryListItem[];

  constructor(id: string, name: string)
  {
    this.id = id;
    this.name = name;
    this.items = [];
  }
}
