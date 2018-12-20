import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { setNavVisible } from '../redux/actions/navigationActions';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(setNavVisible());
  }

  render() {
    return (
      <div>
        <h1>Hello World! This is the HomePage</h1>
        <Link to="/login">Logout</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(HomePage);
