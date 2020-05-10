import { cartConstants } from '../constants/carts';
import store from 'store';

export const cartsActions = {
  addProductToCart,
  removeProductFromCart
}

function addProductToCart(product, count){
  return (dispatch, getState) => {
    const storageCart = store.get('cart');
    const existCart = storageCart ? storageCart : [];
    let cart = existCart.slice();
    let sameProduct = cart.find(cartProduct => cartProduct.id === product.id);
    if(sameProduct !== undefined ){
      cart = cart.filter(cartProduct => cartProduct.id !== sameProduct.id);
    }

    cart.push({ count, ...product });

    store.set('cart', cart);

    dispatch({ type: cartConstants.ADD_PRODUCT_TO_CART, payload: cart });
  }
}

function removeProductFromCart(removedProduct){
  return (dispatch, getState) => {
    const storageCart = store.get('cart');
    const existCart = storageCart ? storageCart : [];
    let cart = existCart.slice();

    cart = cart.filter(product => product.id !== removedProduct.id);

    store.set('cart', cart);

    dispatch({ type: cartConstants.REMOVE_PRODUCT_FROM_CART, payload: cart });

  }
}
