import React, { Component } from 'react';

class SignupForm extends Component {
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
          <br />
          Password:
          <input type="text" name="password" />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignupForm;
