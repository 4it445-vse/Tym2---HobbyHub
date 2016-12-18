import throttle from 'lodash/throttle';
import { createStore } from 'redux'

import { rootReducer } from '../reducers'

function stateThatShouldBeSaved(state) {
  const {
    auth,
    userReducer,
  } = state;
  console.log('stateThatShouldBeSaved:', state);
  return {
    auth,
    userReducer,
  };
}

export function configureStore(preloadedState, saveState) {
  console.log('configureStore saveState', saveState);
  const store = createStore(
    rootReducer,
    preloadedState,
  );

  console.log(saveState)
  if (saveState == '0') {
    console.log('logged out ..........................')
    store.subscribe(throttle(() => {
      const state = {};
      console.log('configureStore state:', state);
      const stateToSave = stateThatShouldBeSaved(state);
      saveState(stateToSave);
    }, 1000))
  } else {
    store.subscribe(throttle(() => {
      const state = store.getState();
      console.log('configureStore state:', state);
      const stateToSave = stateThatShouldBeSaved(state);
      saveState(stateToSave);
    }, 1000));
  }

  return store;
}
