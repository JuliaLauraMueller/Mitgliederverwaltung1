import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types/authTypes';
import { ALERT_ERROR } from '../types/alertTypes';
import authService from '../../services/authService';
import history from '../../helpers/history';

export const login = (privateEmail, password) => dispatch => {
  authService.login(privateEmail, password).then(
    user => {
      dispatch({ type: LOGIN_SUCCESS, user });
      history.push('/');
    },
    error => {
      dispatch({ type: LOGIN_FAILURE, error });
      dispatch({ type: ALERT_ERROR, payload: 'Email oder Passwort falsch...' });
    }
  );
};

export const logout = () => dispatch => {
  authService.logout();
  return { type: LOGOUT };
};
