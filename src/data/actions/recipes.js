import { recipeService } from '../services/recipes';
import { recipeConstants } from '../constants/recipes';

export const recipeActions = {
  createRecipe
}

function createRecipe(params){
  return dispatch => {
    dispatch(request());

    recipeService.createRecipe(params)
    .then( response => {
      dispatch(success(response.data));
    })
    .catch( error => {
      dispatch(failure(error.response));
    })
  }

  function request() { return { type: recipeConstants.CREATE_RECIPE_REQUEST }};
  function success(payload) { return { type: recipeConstants.CREATE_RECIPE_SUCCESS, payload }};
  function failure(payload) { return {type: recipeConstants.CREATE_RECIPE_FAILURE, payload} };
}
