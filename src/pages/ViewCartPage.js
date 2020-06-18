import React from 'react';

import { Row, Col } from 'reactstrap';

import Page from 'components/Page';
import { NumberWidget, IconWidget } from 'components/Widget';

import { iconWidgetsData, numberWidgetsData } from 'demos/widgetPage';

import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

import { MdLocalDining } from 'react-icons/md';
import { cartsActions } from '../data/actions/carts';

export class ViewCartPage extends React.Component {
  state = {
    isOpen: false
  }
  onShowPopup = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render(){
    const { t } = this.props;
    return (
      <Page
        className="ViewCartPage"
        title={t('title_cart')}
        breadcrumbs={[{ name: t('title_cart'), active: true }]}
      >
        <Row className="view-cart-page">
          <Col>
            {t('product')}
          </Col>
          <Col>
            {t('price')}
          </Col>
          <Col>
            {t('quantity')}
          </Col>
          <Col>
            {t('total')}
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

          <Modal isOpen={this.state.isOpen}>
          <ModalHeader toggle={this.onShowPopup} />
            <ModalBody>
              <div className="modalRoot">
                Your order was created successfully.
              </div>
            </ModalBody>
          </Modal>

          <Button color="primary" onClick={this.onShowPopup}> {t('createOrderButton')}</Button>
          {this.props.cart.length === 0 && <span className="view-cart-page-empty"> {t('createdOrder')} </span>}
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
