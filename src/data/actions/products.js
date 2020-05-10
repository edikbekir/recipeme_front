import { productService } from '../services/products';
import { productConstants } from '../constants/products';

export const productsActions = {
  getProductsByTypeId
}

function getProductsByTypeId(type_id){
  return dispatch => {
    dispatch(request());

    productService.getProductsByTypeId(type_id)
    .then( response => {
      dispatch(success(response.products));
    })
    .catch( response => {
      dispatch(failure(response.data));
    })
  }
  function request() { return { type: productConstants.GET_PRODUCTS_BY_TYPE_ID_REQUEST }};
  function success(payload) { return { type: productConstants.GET_PRODUCTS_BY_TYPE_ID_SUCCESS, payload }};
  function failure(payload) { return {type: productConstants.GET_PRODUCTS_BY_TYPE_ID_FAILURE, payload} };
}
