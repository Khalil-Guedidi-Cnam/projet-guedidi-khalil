import {Product} from "../models/product";

export class AddToCart {
  static readonly type = '[Cart] Add';
  constructor(public payload: Product) {}
}

export class RemoveFromCart {
  static readonly type = '[Cart] Remove';
  constructor(public payload: number) {}
}

export class ClearCart {
  static readonly type = '[Cart] Clear';
}

