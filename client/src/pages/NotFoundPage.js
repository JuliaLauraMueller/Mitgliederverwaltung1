import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div>
        404 - Page not found <br />
        <Link to="/">HomePage</Link>
      </div>
    );
  }
}
