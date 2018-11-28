import React, { Component } from 'react';
import Login from '../components/Login';

import '../css/Login.css';

class LoginPage extends Component {
  render() {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <Login />
      </div>
    );
  }
}

export default LoginPage;
