import axios from 'axios';
import { LOCAL_AUTH } from './actionTypes';

const localAuth = (credentials = {}) => {
  console.log('*local signup action*', credentials);
  return (dispatch) => {
    console.log('dispatch');
    axios.get('/auth/success').then(() => { console.log('finished auth get'); })
      .then(() => {
        axios.post('/auth/local', { credentials })
          .then((res) => {
            console.log('action response', res);
          });
        dispatch({
          type: LOCAL_AUTH,
          payload: 'hi',
        });
      });
  };
  // });
};

module.exports = {
  localAuth,
};
