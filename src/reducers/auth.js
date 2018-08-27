import { SIGNUP, LOGIN } from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
    case LOGIN:
      return action.user;
    default:
      return state;
  }
};
