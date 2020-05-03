import store from 'store';
import { userConstants } from '../constants/user';

const currentUser = store.get('user');
const initialState = currentUser ? { loggedIn: true, user: currentUser } : {loggedIn: false};

export default function user(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case userConstants.LOGIN_SUCCESS:
            return {

                ...state,
                loading: false,
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                loggedIn: false,
                error: action.error
            };
        case userConstants.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case userConstants.SIGNUP_SUCCESS:
            return {

                ...state,
                loading: false,
                user: action.user
            };
        case userConstants.SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                loggedIn: false
            };
      default:
            return state
    }
}
