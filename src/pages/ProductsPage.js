import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Page from 'components/Page';
import { productsActions } from '../data/actions/products';
import { ProductCounter } from '../components/ProductCounter';
import { NavLink } from 'react-router-dom';
import {
  NavLink as BSNavLink,
} from 'reactstrap';

import { cartsActions } from '../data/actions/carts';

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
        {this.props.products.length === 0 && <span className="view-cart-page-empty"> There are no products in this category.</span>}
      </Page>
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
