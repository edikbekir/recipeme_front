import { combineReducers } from 'redux';

import recipes from './recipes';
import user from './user';
import types from './types';
import products from './products';
import carts from './carts';
import search from './search';
import recognitions from './recognitions';

const rootReducer = combineReducers({
  recipes,
  user,
  types,
  products,
  carts,
  search,
  recognitions
});

export default rootReducer;
