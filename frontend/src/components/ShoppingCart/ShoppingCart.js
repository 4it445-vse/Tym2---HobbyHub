import React, { Component } from 'react';

import { CartFooter } from './CartFooter.js';
import { CartHeader } from './CartHeader.js';
import { CartItem } from './CartItem.js';

export class ShoppingCart extends Component {
  render() {
    const {
      items,
      total,
      removeCartProduct,
      resetCart,
    } = this.props;
    return (
      <div>
        <div className="panel panel-info">
          <CartHeader resetCart={resetCart} />
          <div className="panel-body">
            {items.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                removeCartProduct={removeCartProduct}
              />
            ))}
          </div>
          <CartFooter total={total} />
        </div>
      </div>
    );
  }
}
