import React from 'react';

import { Row, Col } from 'reactstrap';

import Page from 'components/Page';
import { NumberWidget, IconWidget } from 'components/Widget';

import { iconWidgetsData, numberWidgetsData } from 'demos/widgetPage';

import { connect } from 'react-redux';

import { MdLocalDining } from 'react-icons/md';
import { cartsActions } from '../data/actions/carts';

export class ViewCartPage extends React.Component {
  render(){
    return (
      <Page
        className="ViewCartPage"
        title="Your cart page"
        breadcrumbs={[{ name: `Your cart page`, active: true }]}
      >
        <Row className="view-cart-page">
          <Col>
            Product
          </Col>
          <Col>
            Price
          </Col>
          <Col>
            Quantity
          </Col>
          <Col>
            Total
          </Col>
        </Row>
          {
            this.props.cart.map(product => {
              return(
                <Row key={product.id} className="view-cart-page-item">
                  <Col className="view-cart-page-product">
                    <img src={product.image} />
                    <span >{product.title}</span>
                  </Col>
                  <Col className="view-cart-page-col">
                    <span>
                      ${product.price}
                    </span>
                  </Col>
                  <Col className="view-cart-page-col" >
                    <span>
                      {product.count}
                    </span>
                  </Col>
                  <Col className="view-cart-page-col-total" >
                    <span>
                      ${product.count * product.price }
                    </span>
                    <span onClick={() => this.props.onRemoveProductFromCart(product)} className="view-cart-page-col-remove">
                      X
                    </span>

                  </Col>
                </Row>
              )
            })
          }
          {this.props.cart.length === 0 && <span className="view-cart-page-empty"> Your cart is empty. </span>}

      </Page>
    );
  }
};

function mapDispatchToProps(dispatch){
  return {
    onRemoveProductFromCart: product => dispatch(cartsActions.removeProductFromCart(product))
  }
}

function mapStateToProps(state){
  const { cart } = state.carts;
  return {
    cart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCartPage);
