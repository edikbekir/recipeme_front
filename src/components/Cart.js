import React from 'react';
import { connect } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';

export class CartComponent extends React.Component {

  state = {
    showCartModal: false
  }

  onShowCartModal = () => {
    this.setState({
      showCartModal: !this.state.showCartModal
    })
  }

  render(){
    return(
      <div className="cart">
        <div className="cart-icon" onClick={() => this.onShowCartModal()} >
          <MdShoppingBasket className="icon"/>
        </div>
        <div className="cart-product-counter">
          <span>
            {this.props.cart.length}
          </span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const { cart } = state.carts;
  return {
    cart
  }
}

function mapDispatchToProps(dispatch){
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
