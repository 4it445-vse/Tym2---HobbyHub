import throttle from 'lodash/throttle';
import { createStore } from 'redux'

import { rootReducer, userReducer } from '../reducers'

function stateThatShouldBeSaved(state) {
  const {
    auth,
    userReducer,
  } = state;

  return {
    auth,
    userReducer,
  };
}

export function configureStore(preloadedState, saveState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    userReducer,
  );

  if (saveState) {
    store.subscribe(throttle(() => {
      const state = store.getState();
      console.log('state:', state);
      const stateToSave = stateThatShouldBeSaved(state);
      saveState(stateToSave);
    }, 1000));
  }

  return store;
}
