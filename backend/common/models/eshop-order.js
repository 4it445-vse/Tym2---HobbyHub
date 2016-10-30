'use strict';

module.exports = function(EshopOrder) {
  EshopOrder.submit = function(items, firstName, lastName, address, callback) {
    const orderData = {
      firstName,
      lastName,
      address,
      items,
    };

    callback(null, orderData);
  };
};
