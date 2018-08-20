import React, { Component } from 'react';
import axios from 'axios';
/* eslint-disable */
class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    axios.post('/signup', { username: this.state.username, password: this.state.password })
      .then((response) => { console.log('success', response); })
      .catch((err) => { console.log('error', err); });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          <br />
          Password:
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
          <br />
          <input type="submit" value="Submit" />
        </form>
        {/* <button type="button" onClick={this.handleSubmit}> Submit </button> */}
      </div>
    );
  }
}

export default SignupForm;
