import axios from 'axios';
// import { LOCAL_AUTH } from './actionTypes';

const localAuth = (credentials = {}) => {
  console.log('*local signup action*', credentials);
  return () => {
    console.log('dispatch');
    axios.post('/auth/local', credentials).then(() => { console.log('finished /auth/login'); })
      // .then((response) => {
      //   console.log('/auth/local response: ', response);
      //   dispatch({
      //     type: LOCAL_AUTH,
      //     payload: 'hi',
      //   });
      // })
      .catch((error) => {
        console.log('CAUGHT ERROR', error);
      });
  };
};

module.exports = {
  localAuth,
};
