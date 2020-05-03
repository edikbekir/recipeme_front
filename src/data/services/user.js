import config from '../../config/config';
import AuthHeader from '../../helpers/AuthHeader';

export const userService = {
  login,
  signup
};

function login(params) {
  const { email, password } = params;

  const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

  const baseUrl = `${config.apis.main}/sessions/login?email=${email}&password=${password}`;

  return fetch(baseUrl, requestOptions)
    .then(res => {
      return res.ok ? res.json() : Promise.reject(res)
    })
    .catch(ex => Promise.reject(ex))
}

function signup(params){
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...params
      })
    };

  const baseUrl = `${config.apis.main}/users/signup`;

  return fetch(baseUrl, requestOptions)
    .then(res => {
      return res.ok ? res.json() : Promise.reject(res)
    })
    .catch(ex => Promise.reject(ex))
}
