import axios from 'axios';
import AuthHeader from '../../helpers/AuthHeader';
import config from '../../config/config';

const API_URL = process.env.API_URL;

export const recipeService = {
  createRecipe,
  getPopularRecipes,
  getRecipeById
};

function getPopularRecipes(params){
  const url = `${config.apis.main}/recipes/popular`;

  return fetch(url, {
    method: 'get',
    headers: AuthHeader()
    })
  .then( response => response.json())
  .catch( error => new Error(error) )
}

function createRecipe(params) {
  const formData = new FormData();
  formData.append('image', params.file);
  formData.append('name', params.name);
  formData.append('description', params.description);

  const url =  `${config.apis.main}/recipes`;
  return fetch(url, {
    method: 'post',
    headers: AuthHeader({'Content-Type': 'multipart/form-data' }),
    body: formData
    })
  .then( response => response.json())
  .catch( error => new Error(error) )
}

function getRecipeById(id){
  const url = `${config.apis.main}/recipes/${id}`;

  return fetch(url, {
    method: 'get',
    headers: AuthHeader()
    })
  .then( response => response.json())
  .catch( error => new Error(error) )
}
