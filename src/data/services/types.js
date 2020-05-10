import axios from 'axios';
import AuthHeader from '../../helpers/AuthHeader';
import config from '../../config/config';

export const typeService = {
  getTypes
}

const API_URL = process.env.REACT_APP_API_URL;

function getTypes(){
  const url = `${config.apis.main}/types`;

  return fetch(url, {
    method: 'get',
    headers: AuthHeader()
    })
  .then( response => response.json())
  .catch( error => new Error(error) )
}
