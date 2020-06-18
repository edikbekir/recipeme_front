import axios from 'axios';
import AuthHeader from '../../helpers/AuthHeader';
import config from '../../config/config';

const API_URL = process.env.REACT_APP_API_URL;

export const recognitionService = {
  getDishes,
  getIngredients,
  getInstructions
};

function getDishes(image_url, flag){
  const url = `${config.apis.main}/recognitions/recipes?url=${image_url}&flag=${flag}`;

  return fetch(url, {
    method: 'get',
    headers: AuthHeader()
    })
  .then( response => response.json())
  .catch( error => new Error(error) )
}

function getIngredients(recipe_id){
  const url = `${config.apis.main}/recipes_api/ingredients?recipe_id=${recipe_id}`;

  return fetch(url, {
    method: 'get',
    headers: AuthHeader()
    })
  .then( response => response.json())
  .catch( error => new Error(error) )
}

function getInstructions(recipe_id){
  const url = `${config.apis.main}/recipes_api/instructions?recipe_id=${recipe_id}`;

  return fetch(url, {
    method: 'get',
    headers: AuthHeader()
    })
  .then( response => response.json())
  .catch( error => new Error(error) )
}
