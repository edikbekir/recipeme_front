import axios from 'axios';
import AuthHeader from '../../helpers/AuthHeader';
import config from '../../config/config';

const API_URL = process.env.REACT_APP_API_URL;

export const searchService = {
  search
};

function search(query){
  const url = `${config.apis.main}/recipes/autocomplete?query=${query}`;

  return fetch(url, {
    method: 'get',
    headers: AuthHeader()
    })
  .then( response => response.json())
  .catch( error => new Error(error) )
}
