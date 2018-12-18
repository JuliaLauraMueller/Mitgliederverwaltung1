import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Hello World! This is the HomePage</h1>
        <Link to="/login">Logout</Link>
      </div>
    );
  }
}

export default HomePage;
