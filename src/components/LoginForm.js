/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localAuth } from '../actions/auth';
class LoginForm extends Component {
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
    event.preventDefault();
    console.log('submitting')
    const result = this.props.localAuth({ username: this.state.username, password: this.state.password});
    console.log('result', result);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1> Log in! </h1>
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

const mapStateToProps = (state) => (
  {...state}
);

const mapDispatchToProps = (dispatch) => {
  return {
    localAuth: () => dispatch(localAuth()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
