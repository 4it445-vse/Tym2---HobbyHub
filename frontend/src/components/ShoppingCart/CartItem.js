import React, { Component } from 'react';

export class CartItem extends Component {
  render() {
    const {
      product,
      quantity,
      removeCartProduct,
    } = this.props;
    const {
      id,
      title,
      shortInfo,
      price,
    } = product;
    return (
      <div key={id}>
        <div className="row">
          <div className="col-xs-6">
            <h4 className="product-name"><strong>{title}</strong></h4><h4><small>{shortInfo}</small></h4>
          </div>
          <div className="col-xs-6">
            <div className="col-xs-6 text-right">
              <h6><strong>{price} Kč <span className="text-muted">x</span></strong></h6>
            </div>
            <div className="col-xs-4">
              <h6><strong>{quantity}</strong></h6>
            </div>
            <div className="col-xs-2">
              <button onClick={() => removeCartProduct(id)} type="button" className="btn btn-link btn-xs">
                <span className="glyphicon glyphicon-trash"> </span>
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
