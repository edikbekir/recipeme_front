import { cartConstants } from '../constants/carts';

export const cartsActions = {
  addProductToCart
}

function addProductToCart(product, count){
  return (dispatch, getState) => {
    const currentState = getState();

    let cart = currentState.carts.cart.slice();

    let sameProduct = cart.find(cartProduct => cartProduct.id === product.id);
    if(sameProduct !== undefined ){
      count += sameProduct.count;
      cart = cart.filter(cartProduct => cartProduct.id !== sameProduct.id);
    }

    cart.push({ count, ...product });

    dispatch({ type: cartConstants.ADD_PRODUCT_TO_CART, payload: cart });
  }
}
