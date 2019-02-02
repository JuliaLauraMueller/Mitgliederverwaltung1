import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_TOKEN,
  LOGOUT
} from '../types/authTypes';
import userInfo from '../../helpers/jwtAccessor';

const initialState = { loggedIn: true, user: userInfo };

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
