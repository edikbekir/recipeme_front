import { typeService } from '../services/types';
import { typeConstants } from '../constants/types';

export const typesActions = {
  getTypes
}

function getTypes(){
  return dispatch => {
    dispatch(request());

    typeService.getTypes()
    .then( response => {
      dispatch(success(response.types));
    })
    .catch( response => {
      dispatch(failure(response.data));
    })
  }
  function request() { return { type: typeConstants.GET_TYPES_REQUEST }};
  function success(payload) { return { type: typeConstants.GET_TYPES_SUCCESS, payload }};
  function failure(payload) { return {type: typeConstants.GET_TYPES_FAILURE, payload} };
}
