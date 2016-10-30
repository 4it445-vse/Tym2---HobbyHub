import React from 'react';

export const CartHeader = ({ resetCart }) => (
  <div className="panel-heading">
    <div className="panel-title">
      <div className="row">
        <div className="col-xs-9">
          <h5><span className="glyphicon glyphicon-shopping-cart" /> Shopping Cart</h5>
        </div>
        <div className="col-xs-3">
          <button onClick={() => resetCart()} type="button" className="btn btn-danger btn-sm btn-block">
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
);
