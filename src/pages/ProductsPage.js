import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Page from 'components/Page';
import { productsActions } from '../data/actions/products';
import { cartsActions } from '../data/actions/carts';
import { NavLink } from 'react-router-dom';
import {
  NavLink as BSNavLink,
} from 'reactstrap';

import { MdAddShoppingCart } from 'react-icons/md';

export class ProductsPage extends React.Component {
  componentDidMount(){
    const params = this.props.match.params;
    if(params.id){
      this.props.onGetProductsByTypeId(params.id);
    }
  }

  render(){
    const newRow = (products, index) => {
      return(<Row key={index}>
        {column(products[index])}
        {column(products[index + 1])}
        {column(products[index + 2])}
        {column(products[index + 3])}
      </Row>);
    };

    const column = product => {
      return product && (
        (
          <Col md={3} sm={3} xs={12}>
            <div className="product">
              <div className="product-image">
                <img src={product.image} />
              </div>
              <div className="product-title">
                <BSNavLink
                  id="showNavItem"
                  to={`/shop/types/${this.props.match.params.id}/products/${product.id}`}
                  tag={NavLink}
                  activeClassName="active"
                  exact={true}
                >
                  <span>
                    {product.title}
                  </span>
                </BSNavLink>
              </div>
              <div className="product-price">
                <span>
                  ${product.price} / {product.measurement}
                </span>
              </div>
              <ProductCounter product={product} onAddProductToCart={this.props.onAddProductToCart}/>
            </div>
          </Col>
        )
      )
    }
    return(
      <Page className="products-page">
        {this.props.products.map((product, index) => {
          return index % 4 === 0 && newRow(this.props.products, index);
        })}
      </Page>
    )
  }
}

export class ProductCounter extends React.Component {
  state = {
    counter: 0
  }

  reduceCounter = () => {
    if(this.state.counter === 0) {
      return
    }
    this.setState({
      counter: parseInt(this.state.counter) - 1
    })
  }

  increaseCounter = () => {
    this.setState({
      counter: parseInt(this.state.counter) + 1
    })
  }

  roundPrice = price => {
    return Math.round((price + Number.EPSILON) * 100) / 100
  }

  changeProductCount = e => {
    let currentValue = e.target.value
    if(parseInt(currentValue) < 0 || !currentValue) {
      currentValue = 0
    }
    this.setState({
      counter: parseInt(currentValue)
    })
  }

  render(){
    const product = this.props.product;
    return(
      <div className="product-counter">
        <div className="counter-block">
          <div className="button" onClick={() => this.reduceCounter()}>-</div>
          <div className="counter">
            <input min="0" onChange={this.changeProductCount} type="number" value={this.state.counter} />
          </div>
          <div className="button" onClick={() => this.increaseCounter()}>+</div>
        </div>
        <div className="total">Total: ${this.state.counter * product.price}</div>
        <div className="add-to-cart" onClick={() => this.state.counter > 0 ? this.props.onAddProductToCart(product, this.state.counter) : () => ({})} ><MdAddShoppingCart /> Add to cart</div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const { products } = state.products;
  return {
    products
  }
}

function mapDispatchToProps(dispatch){
  return {
    onGetProductsByTypeId: type_id => dispatch(productsActions.getProductsByTypeId(type_id)),
    onAddProductToCart: (product, counter) => dispatch(cartsActions.addProductToCart(product, counter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
