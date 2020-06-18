import {
  recognitionConstants
} from '../constants/recognitions';

const initialState = {
  dishes: [],
  currentDish: {},
  ingredients: [],
  instructions: [],
  showDishes: true,
  error: null,
  loading: false
};

export default function reducer(state = initialState, action={}) {
  const { type, payload } = action;

  switch (type) {
    case recognitionConstants.GET_DISHES_REQUEST:
      return { ...state, error: null, loading: true, dishes: [], showDishes: true}
    case recognitionConstants.GET_DISHES_SUCCESS:
      return { ...state, dishes: payload, loading: false, error: null, showDishes: true};
    case recognitionConstants.RESET:
      return { ...initialState };
    case recognitionConstants.GET_DISHES_FAILURE:
      return { ...state, dishes: [], loading: false, error: payload, showDishes: true};
    case recognitionConstants.GET_INGREDIENTS_REQUEST:
      return { ...state, error: null, loading: true, ingredients: [], showDishes: false}
    case recognitionConstants.GET_INGREDIENTS_SUCCESS:
      return { ...state, ingredients: payload.ingredients, currentDish: payload.currentDish, loading: false, error: null, showDishes: false};
    case recognitionConstants.GET_INGREDIENTS_FAILURE:
      return { ...state, ingredients: [], loading: false, error: payload, showDishes: false};
    case recognitionConstants.GET_INSTRUCTIONS_REQUEST:
      return { ...state, error: null, loading: true, instructions: [] }
    case recognitionConstants.GET_INSTRUCTIONS_SUCCESS:
      return { ...state, instructions: payload, loading: false, error: null };
    case recognitionConstants.GET_INSTRUCTIONS_FAILURE:
      return { ...state, instructions: [], loading: false, error: payload};
    default:
      return state;
  }
}
