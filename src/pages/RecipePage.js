import React from 'react';

import { Row, Col } from 'reactstrap';

import Page from 'components/Page';
import { NumberWidget, IconWidget } from 'components/Widget';

import { iconWidgetsData, numberWidgetsData } from 'demos/widgetPage';

import { connect } from 'react-redux';
import { recipeActions } from '../data/actions/recipes';
import recipeImage from 'assets/img/recipes/recipe.jpg';
import chefImage from 'assets/img/recipes/chef.jpg';

import { MdLocalDining } from 'react-icons/md';

export class RecipePage extends React.Component {
  componentDidMount = () => {
    this.props.getRecipeById(this.props.match.params.id)
  }

  render(){
    return (
      <Page
        className="recipe-page"
        title={this.props.recipe.name}
        breadcrumbs={[{ name: `${this.props.recipe.name}`, active: true }]}
      >
        <Row>
          <Col md={8} sm={8} xs={12}>
            <img className="recipe-image"
              src={recipeImage}
              alt="recipe"
            />
            <RecipeInfo />
            <hr />

            <div className="ingredients-chef-section">
              <Col md={8} sm={8} xs={12}>
                <Ingredients ingredients={this.props.recipe.ingredients}/>
              </Col>
              <Col md={4} sm={4} xs={12}>
                <ChefInfo user={this.props.recipe.user}/>
              </Col>
            </div>

            <div className="steps-nutritions-section">
              <Col md={8} sm={8} xs={12}>
                <Steps steps={this.props.recipe.steps}/>
              </Col>
              <Col md={4} sm={4} xs={12}>
              </Col>
            </div>
          </Col>
          <Col md={4} sm={4} xs={12}>
            2
          </Col>
        </Row>
      </Page>
    );
  }
};

function mapDispatchToProps(dispatch){
  return {
    getRecipeById: id => dispatch(recipeActions.getRecipeById(id))
  }
}

function mapStateToProps(state){
  const { recipe } = state.recipes;
  return {
    recipe
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);

export class RecipeInfo extends React.Component {
  render(){
    return(
      <div className="recipe-info">
        <div>
          Yield: 2 Pizzas
        </div>
        <div>
          Servings: 4
        </div>
        <div>
          Prep Time: 35
        </div>
        <div>
          Cook Time: 60m
        </div>
        <div>
          Ready In: 1:30 h
        </div>
      </div>
    );
  }
}

export class Ingredients extends React.Component {
  _capitalize = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  render(){
    return(
      <div className="ingredients">
      <div className="ingredients-header">
        Ingredients
      </div>
      {
        this.props.ingredients && this.props.ingredients.map( (ingredient, index) => {
          return (
            <div className="ingredient">
              <div className="ingredient-left">
                {index + 1} ) { this._capitalize(ingredient.name) }
              </div>
              <div className="ingredient-right">
                {ingredient.quantity}
              </div>
              <hr />
            </div>
          )
        })
      }
      </div>
    );
  }
}

export class Steps extends React.Component {
  render(){
    return(
      <div className="steps">
      <div className="steps-header">
        Steps
      </div>
      {
        this.props.steps && this.props.steps.map( (step, index) => {
          return (
            <div className="step">
              <span>
                {step.number} ) { step.name }
              </span>
              <hr />
            </div>
          )
        })
      }
      </div>
    );
  }
}

export class ChefInfo extends React.Component {
  render(){
    const forks = [MdLocalDining, MdLocalDining, MdLocalDining, MdLocalDining, MdLocalDining].map( fork => {
      return <MdLocalDining style={{width: 40, height: 40}}/>;
    });

    const user = this.props.user;

    return(
      <div className="chef-info">
        {
          user && (
            <React.Fragment>
              <div className="chef-image-with-link">
                <img width="100" height="100" src={chefImage} />
                <div> {`${user.first_name} ${user.last_name}`} </div>
              </div>
              <div className="chef-rating">
                <div>
                  <span> Average Member Rating </span>
                  <div> {forks} </div>
                </div>
                <div>
                  <span> Rate this recipe </span>
                  <div> {forks} </div>
                </div>
                <div>
                  <span> 28 people rated this recipe </span>
                  <div> {forks} </div>
                </div>
              </div>
            </React.Fragment>
          )
        }
      </div>
    );
  }
}
