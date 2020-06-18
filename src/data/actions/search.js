import { searchService } from '../services/search';
import { searchConstants } from '../constants/search';

export const searchActions = {
  search,
  reset
}

function search(query){
  return dispatch => {
    dispatch(request());

    searchService.search(query)
    .then( response => {
      dispatch(success(response.data));
    })
    .catch( error => {
      dispatch(failure(error.response));
    })
  }

  function request() { return { type: searchConstants.SEARCH_REQUEST }};
  function success(payload) { return { type: searchConstants.SEARCH_SUCCESS, payload }};
  function failure(payload) { return {type: searchConstants.SEARCH_FAILURE, payload} };
}

function reset(){
  return dispatch => {
    dispatch({ type: searchConstants.SEARCH_RESET });
  }
}
