import { recognitionService } from '../services/recognitions';
import { recognitionConstants } from '../constants/recognitions';

export const recognitionActions = {
  getDishes,
  getIngredients,
  getInstructions
}

function getDishes(id){
  return dispatch => {
    dispatch(request());

    recognitionService.getDishes(id)
    .then( response => {
      const res = response.data.length > 0 ? response.data : null;
      dispatch(success(res));
      if(response.status === 400){
        throw new Error(response.notice);
      }
    })
    .catch( error => {
      dispatch(failure({ notice: "Wrong url or image does not exist"}));
    })
  }

  function request() { return { type: recognitionConstants.GET_DISHES_REQUEST }};
  function success(payload) { return { type: recognitionConstants.GET_DISHES_SUCCESS, payload }};
  function failure(payload) { return {type: recognitionConstants.GET_DISHES_FAILURE, payload} };
}

function formatEstimatedPrice(cents){
  return (cents / 10).toFixed(1);
}

function getIngredients(dish){
  return dispatch => {
    dispatch(request());

    recognitionService.getIngredients(dish.id)
    .then( response => {
      const estimatedPrice = formatEstimatedPrice(response.totalCostPerServing);

      dispatch(success({ ingredients: response.ingredients, currentDish: {...dish, estimatedPrice}  }));
      if(response.status === 400){
        throw new Error(response.notice);
      }
      return response;
    })
    .then( response => { dispatch(getInstructions(dish)) })
    .catch( error => {
      dispatch(failure({ notice: "Ingredients does not exist"}));
    })
  }

  function request() { return { type: recognitionConstants.GET_INGREDIENTS_REQUEST }};
  function success(payload) { return { type: recognitionConstants.GET_INGREDIENTS_SUCCESS, payload }};
  function failure(payload) { return {type: recognitionConstants.GET_INGREDIENTS_FAILURE, payload} };
}

function getInstructions(dish){
  return dispatch => {
    dispatch(request());

    recognitionService.getInstructions(dish.id)
    .then( response => {
      if(response.status === 400){
        throw new Error(response.notice);
      }
      dispatch(success(response[0].steps));

    })
    .catch( error => {
      dispatch(failure({ notice: "Ingredients does not exist"}));
    })
  }

  function request() { return { type: recognitionConstants.GET_INSTRUCTIONS_REQUEST }};
  function success(payload) { return { type: recognitionConstants.GET_INSTRUCTIONS_SUCCESS, payload }};
  function failure(payload) { return {type: recognitionConstants.GET_INSTRUCTIONS_FAILURE, payload} };
}
