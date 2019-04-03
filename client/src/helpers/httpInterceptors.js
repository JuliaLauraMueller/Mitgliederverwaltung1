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
      return response;
    },
    error => {
      if (error.response.status === 401) {
        authService.logout();
        history.push('/login');
      } else if (error.response.status === 403) {
        updateLocalStorage(error.response);
        authService.logout();
        history.push('/login');
        store.dispatch(
          alertError(
            'Sie sind nicht für diese Aktion berechtigt. Bitte wenden Sie sich an den Systemadministrator.'
          )
        );
      }
      return Promise.reject(error.response);
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
