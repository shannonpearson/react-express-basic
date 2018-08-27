/*eslint-disable*/
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import Reducer from '../src/reducers/Reducer';
import Root from './components/Router';

if (module.hot) {
  module.hot.accept();
}

const store = createStore(Reducer);
// render the app
render(
  <Root store={store} />,
  document.getElementById('root')
);
