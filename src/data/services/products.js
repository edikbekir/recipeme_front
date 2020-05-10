import axios from 'axios';
import AuthHeader from '../../helpers/AuthHeader';
import config from '../../config/config';

export const productService = {
  getProductsByTypeId
}

const API_URL = process.env.REACT_APP_API_URL;

function getProductsByTypeId(type_id){
  const url = `${config.apis.main}/types/${type_id}/products`;

  return fetch(url, {
    method: 'get',
    headers: AuthHeader()
    })
  .then( response => response.json())
  .catch( error => new Error(error) )
}
