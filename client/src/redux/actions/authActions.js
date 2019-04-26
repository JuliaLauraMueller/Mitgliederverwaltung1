import jwtDecode from 'jwt-decode';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_TOKEN,
  LOGOUT
} from '../types/authTypes';
import { ALERT_ERROR } from '../types/alertTypes';
import authService from '../../services/authService';
import history from '../../helpers/history';
import store from '../../helpers/store';
import { updateNavUserdata } from '../actions/navigationActions';

export const login = (privateEmail, password) => dispatch => {
  authService.login(privateEmail, password).then(
    userToken => {
      var decodedToken = jwtDecode(userToken);
      authService.getUserData(decodedToken._id).then(userData => {
        if (userData.firstname && userData.surname) {
          var navData = {};
          if (userData.avatar) {
            navData = {
              firstname: userData.firstname,
              surname: userData.surname,
              avatar: userData.avatar,
              avatarTag: userData.avatarTag
            };
          } else {
            navData = {
              firstname: userData.firstname,
              surname: userData.surname
            };
          }
          store.dispatch(updateNavUserdata(navData));
        }

        dispatch({ type: LOGIN_SUCCESS, payload: decodedToken });
        history.push('/');
      });
    },
    error => {
      dispatch({ type: LOGIN_FAILURE, error });
      dispatch({ type: ALERT_ERROR, payload: 'Email oder Passwort falsch...' });
    }
  );
};

export const updateToken = newToken => dispatch => {
  dispatch({ type: UPDATE_TOKEN, payload: jwtDecode(newToken) });
};

export const logout = () => dispatch => {
  authService.logout();
  dispatch({ type: LOGOUT });
};
