import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Product} from "../models/product";
import {AddToCart, ClearCart, RemoveFromCart} from "../actions/cart.actions";

export class CartStateModel {
  products: Product[] = [];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    products: []
  }
})
export class CartState {
  @Action(AddToCart)
  add({ getState, patchState }: StateContext<CartStateModel>, { payload }: AddToCart) {
    const state = getState();
    const nextId = state.products.length > 0 ? Math.max(...state.products.map(p => p.id)) + 1 : 1;
    const productWithId = { ...payload, id: nextId };
    patchState({
      products: [...state.products, productWithId]
    });
  }

  @Action(RemoveFromCart)
  remove({ getState, patchState }: StateContext<CartStateModel>, { payload }: RemoveFromCart) {
    const state = getState();
    patchState({
      products: state.products.filter(product => product.id !== payload)
    });
  }

  @Action(ClearCart)
  clear({ setState }: StateContext<CartStateModel>) {
    setState({
      products: []
    });
  }

  @Selector()
  static cartProducts(state: CartStateModel) {
    return state.products;
  }
}
