import {
  recipeConstants
} from '../constants/recipes';

const initialState = {
  loading: false,
  recipe: {},
  popularRecipes: [],
  error: null,
  success: false
};

export default function reducer(state = initialState, action={}) {
  const { type, payload } = action;

  switch (type) {
    case recipeConstants.CREATE_RECIPE_REQUEST:
      return { ...state, loading: true, error: null, recipe: {}, success: false};
    case recipeConstants.CREATE_RECIPE_SUCCESS:
      return { ...state, loading: false, error: null, recipe: payload, success: true};
    case recipeConstants.CREATE_RECIPE_FAILURE:
      return { ...state, loading: false, error: payload, recipe: {}, success: false};

    case recipeConstants.GET_POPULAR_RECIPES_REQUEST:
      return { ...state, loading: true, error: null, popularRecipes: [], success: false};
    case recipeConstants.GET_POPULAR_RECIPES_SUCCESS:
      return { ...state, loading: false, error: null, popularRecipes: payload, success: true};
    case recipeConstants.GET_POPULAR_RECIPES_FAILURE:
      return { ...state, loading: false, error: payload, popularRecipes: [], success: false};

    default:
      return state
  }
}
