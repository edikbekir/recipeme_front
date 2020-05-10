import { combineReducers } from 'redux';

import recipes from './recipes';
import user from './user';
import types from './types';
import products from './products';
import carts from './carts';

const rootReducer = combineReducers({
  recipes,
  user,
  types,
  products,
  carts
});

export default rootReducer;
