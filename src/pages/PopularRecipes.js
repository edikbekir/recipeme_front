import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg18Image from 'assets/img/bg/background_1920-18.jpg';
import bg1Image from 'assets/img/bg/background_640-1.jpg';
import bg3Image from 'assets/img/bg/background_640-3.jpg';
import user1Image from 'assets/img/users/100_1.jpg';
import { UserCard } from 'components/Card';
import { recipeActions } from '../data/actions/recipes';
import Page from 'components/Page';
import { bgCards, gradientCards, overlayCards } from 'demos/cardPage';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';

import {
  connect
} from 'react-redux';

export class PopularRecipes extends React.Component {
  componentDidMount = () => {
    this.props.getPopularRecipes();
  }

  render(){

    return (
      <Page title="Recipes" breadcrumbs={[{ name: 'Recipes', active: true }]}>
        <Row>
          {
            this.props.recipe.popularRecipes.map( (recipe, index) => {
              return (
                  <Col md={6} sm={6} xs={12} className="mb-3">
                    <Card className="flex-row">
                      {index % 2 === 0 && <CardImg
                        className="card-img-left"
                        src={bg1Image}
                        style={{ width: 'auto', height: 150 }}
                      />}
                      <CardBody>
                        <CardTitle style={{fontWeight: 'bold', fontSize: '24px'}}>{ recipe.name }</CardTitle>
                        <CardText>
                          { recipe.description }
                        </CardText>
                      </CardBody>
                      {index % 2 !== 0 && <CardImg
                        className="card-img-right"
                        src={bg1Image}
                        style={{ width: 'auto', height: 150 }}
                      />}
                    </Card>
                  </Col>)
            })
          }
        </Row>
      </Page>
    );
  }
};

const mapStateToProps = state => {
  return {
    recipe: state.recipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPopularRecipes: params => dispatch(recipeActions.getPopularRecipes(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PopularRecipes);
