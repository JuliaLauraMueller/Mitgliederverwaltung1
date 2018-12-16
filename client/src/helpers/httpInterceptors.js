import axios from 'axios';

import store from './store';
import config from '../config/settings';
import history from './history';
import { alertError } from '../redux/actions/alertActions';
import { updateToken } from '../redux/actions/authActions';
import authService from '../services/authService';

export default () => {
  axios.defaults.baseURL = config.api;
  axios.interceptors.request.use(
    request => {
      const user = localStorage.getItem('user');
      if (user) {
        request.headers.Authorization = 'Bearer ' + user;
      } else {
        request.headers.Authorization = null;
      }
      return request;
    },
    error => {
      return error;
    }
  );

  axios.interceptors.response.use(
    response => {
      updateLocalStorage(response);
      return response;
    },
    error => {
      if (error.response.status === 401) {
        authService.logout();
      } else if (error.response.status === 403) {
        updateLocalStorage(error.response);
        history.push('/');
        store.dispatch(
          alertError(
            'Ihre Berechtigungen haben geändert, bitte loggen Sie sich erneut ein.'
          )
        );
      }
      return Promise.reject(error.statusText);
    }
  );
};

function updateLocalStorage(response) {
  const token = response.headers['set-authorization'];
  if (token) {
    localStorage.setItem('user', token);
    store.dispatch(updateToken(token));
  }
}
