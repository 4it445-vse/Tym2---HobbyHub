import lodashValues from 'lodash/values';

import {
  SESSION_LOG_IN,
  SESSION_LOG_OUT,
  SESSION_SAVE_TOKEN,
  SESSION_DELETE_TOKEN,
} from './actions.js';

const initialDummyState = {
    email: null
    password: null,
  }
};
// FIXME - pičovina
export const sessionReducer = (state = initialDummyState, action) => {
  switch (action.type) {
    case SESSION_LOG_IN:
      const { email } = action;
      const { quantity: oldQuantity } = state[product.id] || { quantity: 0 };

      const newCartItem = {
        quantity: 1 + oldQuantity,
        product,
      };

      return {
        ...state,
        [product.id]: newCartItem,
      };

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
