import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Hello World! This is the HomePage</h1>
        <Link to="/" onClick={logout()}>
          Login
        </Link>
        <br />
        <Link to="/profile">Profile</Link>
        <br />
        <Link to="/members">Members</Link>
      </div>
    );
  }
}

export default HomePage;
