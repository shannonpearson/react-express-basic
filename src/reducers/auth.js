import { LOCAL_AUTH } from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  console.log('A REDUCER IS HAPPENING');
  switch (action.type) {
    case LOCAL_AUTH:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
