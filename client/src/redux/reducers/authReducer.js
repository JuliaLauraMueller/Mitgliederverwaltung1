import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_TOKEN,
  LOGOUT,
  USERDATA_FETCHED
} from '../types/authTypes';
import getUserToken from '../../helpers/jwtAccessor';

const initialState = { loggedIn: true, user: getUserToken(), userData: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload,
        userData: state.userData
      };
    case LOGIN_FAILURE:
      return {};
    case LOGOUT:
      return {};
    case UPDATE_TOKEN:
      return {
        loggedIn: state.loggedIn,
        user: action.payload,
        userData: state.userData
      };
    case USERDATA_FETCHED:
      return {
        loggedIn: state.loggedIn,
        user: state.user,
        userData: action.payload
      };
    default:
      return state;
  }
}
