export class GroceryListItem {
  id: string;
  name: string;
  quantity: string;
  completed: boolean;

  constructor(name: string, quantity: string) {
    this.id = null;
    this.name = name;
    this.quantity = quantity;
    this.completed = false;
  }
}
