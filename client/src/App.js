// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './css/App.css';

// Components

import React, { Component } from 'react';

import Routes from './routing/Routes';
import { Container } from 'reactstrap';
import AlertToast from './components/AlertToast';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import store from './helpers/store';

import history from './helpers/history';

import {
  setNavExpanded,
  setNavCollapsed
} from './redux/actions/navigationActions';

import { alertClear } from './redux/actions/alertActions';

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    store.subscribe(() => {
      const visibleStatus = store.getState().navigation.visible;
      const expandedStatus = store.getState().navigation.expanded;

      if (
        visibleStatus !== this.state.previouslyVisible ||
        expandedStatus !== this.state.previouslyExpanded
      ) {
        if (!this.state.previouslyVisible && visibleStatus) {
          // Changed from invisible to visible
          this.state.AppClassNames = 'app collapsed';
        } else if (this.state.previouslyVisible && visibleStatus) {
          // Remained visible
          if (expandedStatus) {
            this.state.AppClassNames = 'app expanded';
          } else {
            this.state.AppClassNames = 'app collapsed';
          }
        } else {
          this.state.AppClassNames = 'app';
        }

        if (this.state.previouslyVisible !== visibleStatus) {
          this.forceUpdate();
        }
        this.state.previouslyVisible = visibleStatus;
        this.state.previouslyExpanded = expandedStatus;
      }
    });

    history.listen((location, action) => {
      dispatch(alertClear);
    });

    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  // Add global layout components before route
  state = {
    previouslyVisible: false,
    previouslyExpanded: false,
    AppClassNames: 'app'
  };

  toggleSideMenu() {
    if (this.state.previouslyExpanded) {
      this.props.dispatch(setNavCollapsed());
    } else {
      this.props.dispatch(setNavExpanded());
    }

    if (this.props.sideMenuExpanded) {
      this.setState(prevState => {
        return { AppClassNames: 'app collapsed' };
      });
    } else {
      this.setState(prevState => {
        return { AppClassNames: 'app expanded' };
      });
    }
  }

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
          <Routes toggleSideMenu={this.toggleSideMenu} />
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    alert: state.alert,
    sideMenuExpanded: state.navigation.expanded
  };
}

export default connect(mapStateToProps)(App);
