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

export const login = (privateEmail, password) => dispatch => {
  authService.login(privateEmail, password).then(
    userToken => {
      dispatch({ type: LOGIN_SUCCESS, payload: jwtDecode(userToken) });
      history.push('/');
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
