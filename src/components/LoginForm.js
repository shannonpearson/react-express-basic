
import React, { Component } from 'react';

class LoginForm extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleSubmit = () => {

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Username:
          <input type="text" name="username" />
          Password:
          <input type="text" name="password" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
