import jwtDecode from 'jwt-decode';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_TOKEN,
  LOGOUT,
  USERDATA_FETCHED
} from '../types/authTypes';
import { ALERT_ERROR } from '../types/alertTypes';
import authService from '../../services/authService';
import history from '../../helpers/history';

export const login = (privateEmail, password) => dispatch => {
  authService.login(privateEmail, password).then(
    userToken => {
      var decodedToken = jwtDecode(userToken);
      authService.getUserData(decodedToken._id).then(userData => {
        if (userData.firstname && userData.surname) {
          dispatch({ type: USERDATA_FETCHED, payload: userData });
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
