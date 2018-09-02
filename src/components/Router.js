/* eslint react/prop-types:0 */

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthPage from './AuthPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={AuthPage} />
    </Router>
  </Provider>
);

export default Root;
