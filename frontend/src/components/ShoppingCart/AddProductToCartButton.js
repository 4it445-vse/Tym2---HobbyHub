import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addToCart } from './actions';

export class AddProductToCartButton extends Component {
  render() {
    const {
      product,
      addToCart,
    } = this.props;
    return (
      <button
        onClick={() => addToCart(product)}
        type="button"
        className="btn btn-success"
      >
        <span
          className="glyphicon glyphicon-shopping-cart"
          aria-hidden="true">
        </span> Add to cart
      </button>
    );
  }
}

export const AddProductToCartButtonContainer = connect(
  () => ({}),
  { addToCart },
)(AddProductToCartButton);
