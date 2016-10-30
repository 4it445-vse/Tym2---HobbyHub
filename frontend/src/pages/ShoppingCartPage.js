import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ShoppingCart } from '../components/ShoppingCart/ShoppingCart.js';
import {
  resetCart,
  removeCartProduct,
} from '../components/ShoppingCart/actions.js';
import {
  getItems,
  getTotal,
} from '../components/ShoppingCart/reducer.js';

export class ShoppingCartPageRaw extends Component {
  render() {
    return (
      <div>
        <ShoppingCart {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { shoppingCart } = state;

  return {
    items: getItems(shoppingCart),
    total: getTotal(shoppingCart),
  };
}

export const ShoppingCartPage = connect(
  mapStateToProps,
  {
    resetCart,
    removeCartProduct,
  }
)(ShoppingCartPageRaw);
