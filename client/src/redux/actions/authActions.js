import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types/authTypes';
import authService from '../../services/authService';
import history from '../../helpers/history';

export const login = (email, password) => dispatch => {
  authService.login(email, password).then(
    user => {
      dispatch({ type: LOGIN_SUCCESS, user });
      history.push('/');
    },
    error => {
      dispatch({ type: LOGIN_FAILURE, error });
    }
  );
};

export const logout = () => dispatch => {
  authService.logout();
  return { type: LOGOUT };
};
