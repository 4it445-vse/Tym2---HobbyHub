import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { configureStore } from './store/configureStore.js';
import { loadState, saveState } from './store/localState.js';
import { setAuthToken } from './api.js'

const persistedState = loadState();

if (persistedState && persistedState.auth && persistedState.auth.authToken) {
  const { authToken } = persistedState.auth
  setAuthToken(authToken)
}
console.log('persistedState', persistedState)
const store = configureStore(persistedState, saveState);

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
