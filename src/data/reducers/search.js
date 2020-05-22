import {
  searchConstants
} from '../constants/search';

const initialState = {
  search: [],
};

export default function reducer(state = initialState, action={}) {
  const { type, payload } = action;

  switch (type) {
    case searchConstants.SEARCH_SUCCESS:
      return { ...state, search: payload };
    case searchConstants.SEARCH_FAILURE:
      return { ...state, search: [] };
    default:
      return state;
  }
}
