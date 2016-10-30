import { combineReducers } from 'redux';

import shoppingCart from '../components/ShoppingCart/reducer.js';

const dummy = (state=0, action) => {
  console.log('---- action:', action, 'state:', state);

  switch (action.type) {
    case 'DUMMY_ACTION':
      return state + 1;
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  dummy,
  shoppingCart,
});
