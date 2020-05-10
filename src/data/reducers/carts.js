import {
  cartConstants
} from '../constants/carts';

const initialState = {
  cart: [],
};

export default function reducer(state = initialState, action={}) {
  const { type, payload } = action;

  switch (type) {
    case cartConstants.ADD_PRODUCT_TO_CART:
      return { ...state, cart: payload };
    default:
      return state;
  }
}
