import axios from 'axios';
import AuthHeader from '../../helpers/AuthHeader';
const API_URL = process.env.API_URL;


export const recipeService = {
  createRecipe
};

function createRecipe(params) {
  const formData = new FormData();
  formData.append('image', params.file);
  formData.append('name', params.name);
  formData.append('description', params.description);
  // Need to stash to .env
  return axios({
    method: 'post',
    url: 'http://localhost:3001/api/v1/recipes',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data' }
    })
  .then( response => response.json())
  .catch( error => new Error(error) )
}
