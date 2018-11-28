// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

// Components
import React, { Component } from 'react';
import Routes from './routing/Routes';
import AuthHeader from './helpers/AuthHeader';
import { Container } from 'reactstrap';
import AlertToast from './components/AlertToast';
import { connect } from 'react-redux';

import history from './helpers/history';

import { alertClear } from './redux/actions/alertActions';

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    history.listen((location, action) => {
      dispatch(alertClear);
    });
  }

  // Add global layout components before route
  render() {
    const { alert } = this.props;

    return (
      <div className="App">
        <Container style={{ marginTop: '5rem' }}>
          {alert.message && (
            <AlertToast type={alert.type} message={alert.message} />
          )}
          <AuthHeader />
          <Routes />
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(App);
