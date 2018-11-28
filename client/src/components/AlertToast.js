import React, { Component } from 'react';
import '../css/ToastComponent.css';

import { connect } from 'react-redux';
import { alertClear } from '../redux/actions/alertActions';

class AlertToast extends Component {
  componentDidMount() {
    var x = document.getElementById('toast');
    x.className = x.className + ' show';

    const self = this;

    setTimeout(function() {
      x.className = x.className.replace(' show', '');
      self.props.dispatch(alertClear());
    }, 4000);
  }

  render() {
    return (
      <div id="toast" className={`toast toast-${this.props.type}`}>
        {this.props.message}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AlertToast);
