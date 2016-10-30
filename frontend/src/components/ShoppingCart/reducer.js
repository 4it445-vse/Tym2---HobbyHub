import lodashValues from 'lodash/values';

import {
  SHOPPING_CART_ADD_PRODUCT,
  SHOPPING_CART_RESET,
  SHOPPING_CART_REMOVE_PRODUCT,
} from './actions.js';

const initialDummyState = {
  1: {
    product: {
      id: 1,
      title: 'Škoda Superb',
      price: 750000,
      shortInfo: 'Luxury car produced in the Czech Republic.',
    },
    quantity: 1,
  }
};

export const shoppingCartReducer = (state = initialDummyState, action) => {
  switch (action.type) {
    case SHOPPING_CART_RESET:
      return {};

    case SHOPPING_CART_ADD_PRODUCT:
      const { product } = action;
      const { quantity: oldQuantity } = state[product.id] || { quantity: 0 };

      const newCartItem = {
        quantity: 1 + oldQuantity,
        product,
      };

      return {
        ...state,
        [product.id]: newCartItem,
      };

    case SHOPPING_CART_REMOVE_PRODUCT:
      const { productId } = action;

      const newState = {
        ...state,
      };
      delete newState[productId];

      return newState;

    default:
      return state;
  }
}

export default shoppingCartReducer;

// selectors

export function getItems(state) {
  return lodashValues(state);
}

export function getTotal(state) {
  return getItems(state).reduce((total, { product, quantity }) =>
    total + product.price * quantity
  , 0);
}
