import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Page from 'components/Page';
import { typesActions } from '../data/actions/types';
import { NavLink } from 'react-router-dom';
import {
  NavLink as BSNavLink,
} from 'reactstrap';
export class FoodTypesPage extends React.Component {
  componentDidMount(){
    this.props.onGetTypes();
  }

  render(){
    const newRow = (types, index) => {
      return(<Row key={index}>
        {column(types[index])}
        {column(types[index + 1])}
        {column(types[index + 2])}
      </Row>);
    };

    const column = type => {
      return type && (
        (
          <Col md={4} sm={4} xs={12}>
          <BSNavLink
            id="showNavItem"
            to={`/shop/types/${type.id}/products`}
            tag={NavLink}
            activeClassName="active"
            exact={true}
          >
            <div className="type">
              <div className="type-name">
                <span>
                  {type.name}
                </span>
              </div>
              <img width="400" height="350" src={type.image} />
            </div>
          </BSNavLink>
          </Col>
        )
      )
    }
    return(
      <Page
        className="types-page"
      >
        {this.props.types.map((type, index) => {
          return index % 3 === 0 && newRow(this.props.types, index);
        })}
      </Page>
    )
  }
}

function mapStateToProps(state){
  const { types } = state.types;
  return {
    types
  };
}

function mapDispatchToProps(dispatch){
  return {
    onGetTypes: () => dispatch(typesActions.getTypes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodTypesPage);
