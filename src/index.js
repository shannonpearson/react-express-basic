/*eslint-disable*/
import React from 'react';
import { render } from 'react-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

if (module.hot) {
  module.hot.accept();
}

const App = () => {
  return (
    <div>
      <h1> boi </h1>
      <h2> wat </h2>
      <SignupForm />
      <LoginForm />
    </div>
  );
};

// render the app
render(<App />, document.getElementById('app'));
