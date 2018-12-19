import React, { Component } from 'react';
import Login from '../components/Login';
import { connect } from 'react-redux';

import { setNavInvisible } from '../redux/actions/navigationActions';

import '../css/Login.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setNavInvisible());
  }
  render() {
    return <Login />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(LoginPage);
