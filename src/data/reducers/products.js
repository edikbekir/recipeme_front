import {
  productConstants
} from '../constants/products';

const initialState = {
  loading: false,
  products: [],
};

export default function reducer(state = initialState, action={}) {
  const { type, payload } = action;

  switch (type) {
    case productConstants.GET_PRODUCTS_BY_TYPE_ID_REQUEST:
      return { ...state, loading: true, products: []};
    case productConstants.GET_PRODUCTS_BY_TYPE_ID_SUCCESS:
      return { ...state, loading: false, products: payload};
    case productConstants.GET_PRODUCTS_BY_TYPE_ID_FAILURE:
      return { ...state, loading: false, products: []};
    default:
      return state;
  }
}
