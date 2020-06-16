import React, { useState } from 'react';
import Page from 'components/Page';
import { recognitionActions } from '../data/actions/recognition';
import MultiSearchSelect from 'components/MultiSearchSelect';
import PageSpinner from 'components/PageSpinner';
import {
  MdAccessAlarm,
  MdCheckCircle
} from 'react-icons/md';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

import {
  connect
} from 'react-redux';

const INGREDIENT_IMG_SIZE = "100x100"
const INGREDIENTS_IMAGE_URL = `https://spoonacular.com/cdn/ingredients_${INGREDIENT_IMG_SIZE}/`;
const RECIPE_IMAGE_URL = `https://spoonacular.com/recipeImages/`;

export class DishesRecognitionPage extends React.Component {
  state = {
    url: '',
    showIngredients: false,
    showInstructions: false
  }

  handleUrlChange = url => {
    this.setState({
      url
    });
  }

  formattedDishName = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  render(){
    console.log(this.props.t('welcome.title'))
    const { error, loading, dishes, showDishes, ingredients, currentDish, instructions} = this.props;
    const { showInstructions, showIngredients, showIngredientImageIndex, url} = this.state;
    return (
      <Page className="image-recognition-root" title="Recipes" breadcrumbs={[{ name: 'Image Recognition', active: true }]}>
        <Row className="image-recognition-container">
          {
            showDishes && (
              <>
                <div className="image-recognition-input">
                  <input onChange={e => this.handleUrlChange(e.target.value)} placeholder="Enter the path to the image of the dish" className="image-recognition-input" type="text" />
                </div>
                <div className="image-recognition-button">
                  <Button onClick={() => this.props.onGetDishes(url)} className="start-recognition-button" color="success">Start</Button>
                </div>
              </>
            )
          }
          {
            error !== null || dishes === null && (
              <div className="image-recognition-error"><span>Wrong url or image does not exist</span></div>
            )
          }
          {
            showDishes && dishes && dishes.length > 0 && (
              <div className="image-recognition-dishes">
                {
                  dishes.map( (dish, index) => {
                    const currentIndex = index + 1;
                    return (
                      <div onClick={() => this.props.onGetIngredients(dish)} className="image-recognition-dish">
                        <span>
                          {currentIndex}) { this.formattedDishName(dish.title) }
                        </span>
                        <span>
                          <MdAccessAlarm className="image-recognition-time"/>{dish.readyInMinutes} min
                        </span>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
          {
            ingredients && ingredients.length > 0 && (<div className="currentDish">
              <div className="currentDish-title">
                <span>
                  {currentDish.title}
                </span>
              </div>
              <div className="currentDish-image">
                <img src={`${RECIPE_IMAGE_URL + currentDish.id }-556x370.jpg`} />
              </div>
              <div className="currentDish-actions">
                <Button outline color="warning" onClick={() => this.setState({ showIngredients: !showIngredients, showInstructions: false })} > Ingredients </Button>
                <Button outline color="warning" onClick={() => this.setState({ showInstructions: !showInstructions, showIngredients: false })}> Instructions </Button>
              </div>
            </div>)
          }
          {
            ingredients && ingredients.length > 0 && showIngredients && (
              <div className="image-recognition-ingredients">
                {
                  ingredients.map( (ingredient, index) => {
                    const currentIndex = index + 1;
                    return (
                      <div key={ingredient.name} className={showIngredientImageIndex === index ? "active-ingredient" : "image-recognition-ingredient" } onMouseEnter={() => this.setState({ showIngredientImageIndex: index })} onMouseLeave={() => this.setState({ showIngredientImageIndex: null }) }>
                        <span>
                          {currentIndex}) { this.formattedDishName(ingredient.name) }
                        </span>
                        <span>
                          { ingredient.amount.metric.value } { ingredient.amount.metric.unit }
                        </span>
                        {showIngredientImageIndex === index && (<div>
                          <img src={INGREDIENTS_IMAGE_URL + ingredient.image} />
                        </div>)}
                      </div>
                    )
                  })
                }
              </div>
            )
          }
          {
            instructions && instructions.length > 0 && showInstructions && (
              <div className="image-recognition-instructions">
                {
                  instructions.map( (instruction, index) => {
                    return(
                      <div key={instruction.number} className="image-recognition-instruction">
                        <div className="image-recognition-instruction-icon">
                          <MdCheckCircle />
                          <span> Step </span>
                          <span>{instruction.number} </span>
                        </div>
                        <span className="image-recognition-instruction-step">{instruction.step}</span>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
          { ingredients && ingredients.length > 0 && (
            <div className="image-recognition-estimated-price">
              <span>
                Estimated price:
              </span>
              <span>
                $
              </span>
              <span>
                { currentDish.estimatedPrice }
              </span>
            </div>
          )}
          {
            ingredients && ingredients.length > 0 && (
              <div className="image-recognition-submit">
                <Button color="success"> Order </Button>
              </div>
            )
          }
          { loading && <PageSpinner /> }
        </Row>
      </Page>
    );
  }
};

const mapStateToProps = state => {
  const { dishes, loading, error, showDishes, ingredients, currentDish, instructions} = state.recognitions;
  return {
    dishes,
    loading,
    error,
    ingredients,
    showDishes,
    currentDish,
    instructions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetDishes: url => dispatch(recognitionActions.getDishes(url)),
    onGetIngredients: dish => dispatch(recognitionActions.getIngredients(dish))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DishesRecognitionPage);
