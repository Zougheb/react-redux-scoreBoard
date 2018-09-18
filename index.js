import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import{ createStore } from 'redux';
import PlayerReducer from './src/reducers/player';
import Scoreboard from './src/containers/Scoreboard';

// create the store-- create store takes playerReducer and register it with redux
const store = createStore(
  PlayerReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  // wrap the scoreboard component with the provider component
  // and set the store property to the store created
  <Provider store={store}>
    <Scoreboard />
  </Provider>,
  document.getElementById('root')
);