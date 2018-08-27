import React, { Component } from 'react';

/* eslint-disable */
class SpotifyAuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  // componentDidMount: function() {
  //   window.fbAsyncInit = function() {
  //     FB.init({
  //       appId      : '<YOUR_APP_ID>',
  //       cookie     : true,  // enable cookies to allow the server to access
  //                         // the session
  //       xfbml      : true,  // parse social plugins on this page
  //       version    : 'v2.1' // use version 2.1
  //     });
  
  //     // Now that we've initialized the JavaScript SDK, we call
  //     // FB.getLoginStatus().  This function gets the state of the
  //     // person visiting this page and can return one of three states to
  //     // the callback you provide.  They can be:
  //     //
  //     // 1. Logged into your app ('connected')
  //     // 2. Logged into Facebook, but not your app ('not_authorized')
  //     // 3. Not logged into Facebook and can't tell if they are logged into
  //     //    your app or not.
  //     //
  //     // These three cases are handled in the callback function.
  //     FB.getLoginStatus(function(response) {
  //       this.statusChangeCallback(response);
  //     }.bind(this));
  //   }.bind(this);
  
  //   // Load the SDK asynchronously
  //   (function(d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s); js.id = id;
  //     js.src = "//connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
  // },
  
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // handleSubmit = (event) => {
  //   axios.get('/auth/'
  //   // , { username: this.state.username, password: this.state.password })
  //   //   .then((response) => { console.log('success on spotify auth route, i suppose', typeof response); })
  //   //   .catch((err) => { console.log('error', err); }
  //   )
  //   .then((success) => {
  //     console.log('success', success);
  //     // SUCCESS RESPONSE is the spotify data!!!!! the stuff that shows up in postman but in JSON 
  //     // something must be going wrong with the passport callback
  //     window.location = success.data.url;
  //   })
  //   .catch((err) => {
  //     console.log('errrrror', err)
  //   })
  //   event.preventDefault();
  // }

  render() {
    return (
      <div>
        <h1> Spotify </h1>
        {/* <form onSubmit={this.handleSubmit}> */}
          {/* Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          <br />
          Password:
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
          <br /> */}
          {/* <input type="submit" value="Log in with Spotify" /> */}
        {/* </form> */}
        <button type="button"> <a href="/auth/spotify"> Login with Spotify</a></button>
      </div>
    );
  }
}

export default SpotifyAuthForm;
