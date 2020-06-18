import React from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import store from 'store';

export class ProductCounter extends React.Component {
  constructor(props){
    super(props);
    const productFromStore = store.get('cart') && store.get('cart').find(existProduct => existProduct.title === props.product.title)
    const product = productFromStore ? productFromStore : props.product;
    this.state = {
      counter: product.count || 0
    }
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

    return(
      <div className="product-counter">
        <div className="counter-block">
          <div className="button" onClick={() => this.reduceCounter()}>-</div>
          <div className="counter">
            <input min="0" onChange={this.changeProductCount} type="number" value={this.state.counter} />
          </div>
          <div className="button" onClick={() => this.increaseCounter()}>+</div>
        </div>
        <div className="total">{this.props.t('total')}: ${this.state.counter * this.props.product.price}</div>
        <div className="add-to-cart" onClick={() => this.state.counter > 0 ? this.props.onAddProductToCart(this.props.product, this.state.counter) : () => ({})} ><MdAddShoppingCart /> {this.props.t('add_to_cart')}</div>
      </div>
    )
  }
}

function mapStateToProps(state){
}

function mapDispatchToProps(dispatch){
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCounter);
