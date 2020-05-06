import { recipeService } from '../services/recipes';
import { recipeConstants } from '../constants/recipes';

export const recipeActions = {
  createRecipe,
  getPopularRecipes,
  getRecipeById
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

function getPopularRecipes(params){
  return dispatch => {
    dispatch(request());

    recipeService.getPopularRecipes(params)
    .then( response => {
      dispatch(success(response.data));
    })
    .catch( error => {
      dispatch(failure(error.response));
    })
  }

  function request() { return { type: recipeConstants.GET_POPULAR_RECIPES_REQUEST }};
  function success(payload) { return { type: recipeConstants.GET_POPULAR_RECIPES_SUCCESS, payload }};
  function failure(payload) { return {type: recipeConstants.GET_POPULAR_RECIPES_FAILURE, payload} };
}

function getRecipeById(id){
  return dispatch => {
    dispatch(request());

    recipeService.getRecipeById(id)
    .then( response => {
      dispatch(success(response));
    })
    .catch( error => {
      dispatch(failure(error.response));
    })
  }

  function request() { return { type: recipeConstants.GET_RECIPE_BY_ID_REQUEST }};
  function success(payload) { return { type: recipeConstants.GET_RECIPE_BY_ID_SUCCESS, payload }};
  function failure(payload) { return {type: recipeConstants.GET_RECIPE_BY_ID_FAILURE, payload} };
}
