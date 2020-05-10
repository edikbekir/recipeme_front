import {
  typeConstants
} from '../constants/types';

const initialState = {
  loading: false,
  types: [],
};

export default function reducer(state = initialState, action={}) {
  const { type, payload } = action;

  switch (type) {
    case typeConstants.GET_TYPES_REQUEST:
      return { ...state, loading: true, types: []};
    case typeConstants.GET_TYPES_SUCCESS:
      return { ...state, loading: false, types: payload};
    case typeConstants.GET_TYPES_FAILURE:
      return { ...state, loading: false, types: []};
    default:
      return state;
  }
}
