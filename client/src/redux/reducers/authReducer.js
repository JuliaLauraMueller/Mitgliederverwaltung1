import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types/authTypes';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
