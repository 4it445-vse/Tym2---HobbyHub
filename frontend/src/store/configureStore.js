import { createStore } from 'redux'

import { rootReducer, userReducer } from '../reducers'

export const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  userReducer,
);
