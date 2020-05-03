import store from 'store';

import {
  userConstants
} from '../constants/user';
import {
  userService
} from '../services/user';
import {
  history
} from '../../helpers/history';

export const userActions = {
  login,
  logout,
  signupOrLogin,
  signup
};

const DEFAULT_AUTH_STATE = "LOGIN";

function signupOrLogin(params, authState){
  return dispatch => {
    if(authState === DEFAULT_AUTH_STATE){
      dispatch(login(params));
    } else {
      dispatch(signup(params));
    }
  }
}

function signup(params){
  return dispatch => {
    dispatch(request())

    userService.signup(params)
    .then( response => {
      dispatch(login(params));
      return response;
    })
    .then( response => {
      return dispatch(success(response.data))
    })
    .catch( error => {
      dispatch(failure(error.response))
    })
  }
  function request() {
    return {
      type: userConstants.LOGIN_REQUEST
    }
  }

  function success(user) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.LOGIN_FAILURE,
      error
    }
  }
}

function login(params) {
  return dispatch => {
    dispatch(request());
    userService.login(params)
      .then(user => {
        store.set('user', user);
        dispatch(success(user));
      })
      .catch(error => {
        let errorMessage = 'API error';
        switch (error.status) {
          case 400:
            errorMessage = 'Please provide both email and password';
            break;
          case 401:
            errorMessage = 'Email and password combination is invalid';
            break;
        }
        dispatch(failure(errorMessage));
      });
  };

  function request() {
    return {
      type: userConstants.LOGIN_REQUEST
    }
  }

  function success(user) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.LOGIN_FAILURE,
      error
    }
  }
}

function logout() {
  return dispatch => {
    store.remove('user');
    dispatch(success());
    history.push('/login');
  };

  function success() {
    return {
      type: userConstants.LOGOUT_SUCCESS
    }
  }
}
