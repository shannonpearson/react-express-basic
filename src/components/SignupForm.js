import React, { Component } from 'react';
import axios from 'axios';

class SignupForm extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleSubmit = () => {
    console.log('submit');
    axios.post('/signup')
      .then((response) => { console.log('success', response); })
      .catch((err) => { console.log('error', err); });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Username:
          <input type="text" name="username" />
          <br />
          Password:
          <input type="text" name="password" />
          <br />
        </form>
        <button type="button" onClick={this.handleSubmit}> Submit </button>
      </div>
    );
  }
}

export default SignupForm;
