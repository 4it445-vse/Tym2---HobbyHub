import React from 'react';
import { Link } from 'react-router';

export const CartFooter = ({ total }) => (
  <div className="panel-footer">
    <div className="row text-center">
      <div className="col-xs-9">
        <h4 className="text-right">Total <strong>{total} Kč</strong></h4>
      </div>
      <div className="col-xs-3">
        <Link to="/cart/checkout" className="btn btn-success btn-block">
          Checkout
        </Link>
      </div>
    </div>
  </div>
);
