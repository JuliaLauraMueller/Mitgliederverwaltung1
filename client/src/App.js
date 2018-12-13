// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

// Components

import React, { Component } from 'react';

import Routes from './routing/Routes';
import { Container } from 'reactstrap';
import AlertToast from './components/AlertToast';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

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
  state = {
    sideMenuExpanded: false,
    AppClassNames: 'app collapsed'
  };

  expandSideMenu = () => {
    this.setState(prevState => {
      return { sideMenuExpanded: !prevState.sideMenuExpanded };
    });
    if (this.state.sideMenuExpanded) {
      this.setState(prevState => {
        return { AppClassNames: 'app collapsed' };
      });
    } else {
      this.setState(prevState => {
        return { AppClassNames: 'app expanded' };
      });
    }
  };

  render() {
    const { alert } = this.props;

    return (
      <div className={this.state.AppClassNames} style={{ height: '100%' }}>
        <Helmet>
          <style>{'body { background-color: rgb(15, 25, 41, 10%); }'}</style>
        </Helmet>
        <Container style={{ marginTop: '5rem' }}>
          {alert.message && (
            <AlertToast type={alert.type} message={alert.message} />
          )}
          <Routes expandSideMenu={this.expandSideMenu} />
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
