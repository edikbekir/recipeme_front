import {
  cartConstants
} from '../constants/carts';

import store from 'store';

const initialState = {
  cart: store.get('cart') || [],
};

export default function reducer(state = initialState, action={}) {
  const { type, payload } = action;

  switch (type) {
    case cartConstants.ADD_PRODUCT_TO_CART:
      return { ...state, cart: payload };
    case cartConstants.REMOVE_PRODUCT_FROM_CART:
      return { ...state, cart: payload };
    default:
      return state;
  }
}
