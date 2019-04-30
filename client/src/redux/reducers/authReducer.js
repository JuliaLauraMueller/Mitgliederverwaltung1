import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_TOKEN,
  LOGOUT
} from '../types/authTypes';
import getUserToken from '../../helpers/jwtAccessor';

const initialState = { loggedIn: true, user: getUserToken() };

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
