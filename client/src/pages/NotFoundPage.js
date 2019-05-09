import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { setNavInvisible } from '../redux/actions/navigationActions';

class NotFoundPage extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(setNavInvisible());
  }

  render() {
    return (
      <div>
        Seite nicht gefunden.
        <br />
        <Link to="/">HomePage</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(NotFoundPage);
