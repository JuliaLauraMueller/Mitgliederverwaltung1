import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_TOKEN,
  LOGOUT
} from '../types/authTypes';
import jwtDecode from 'jwt-decode';

const userToken = localStorage.getItem('user');
const user = userToken ? jwtDecode(userToken) : undefined;

const initialState = user ? { loggedIn: true, user } : {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload
      };
    case LOGIN_FAILURE:
      return {};
    case LOGOUT:
      return {};
    case UPDATE_TOKEN:
      return {
        loggedIn: state.loggedIn,
        user: action.payload
      };
    default:
      return state;
  }
}
