import { Component } from 'react';
import axios from 'axios';

export default class AuthHeader extends Component {
  updateAuthHeader() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      }
    } else {
      axios.defaults.headers.common['Authorization'] = null;
    }
  }

  render() {
    this.updateAuthHeader();
    return null;
  }
}
