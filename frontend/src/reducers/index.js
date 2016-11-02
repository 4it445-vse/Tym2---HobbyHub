import { combineReducers } from 'redux';

import { IS_USER_LOGGED, USER_LOGGED } from '../actions'

const dummy = (state=0, action) => {
  //console.log('---- action:', action, 'state:', state);

  switch (action.type) {
    case 'DUMMY_ACTION':
      return state + 1;
    default:
      return state;
  }
}

const initialUserState = {
  isUserLogged: false
}

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case IS_USER_LOGGED:
      return state;

    case USER_LOGGED:
      return {
        ...state,
        isUserLogged: action.payload
      };

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  dummy,
  userReducer,
});
