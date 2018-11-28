import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import authService from './services/authService';
import config from './config/keys';

axios.defaults.baseURL = config.api;
axios.interceptors.request.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      authService.logout();
      window.location.reload(true);
    }
    return Promise.reject(error.statusText);
  }
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
