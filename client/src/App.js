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

import store from './helpers/store';

import history from './helpers/history';

import {
  setNavExpanded,
  setNavCollapsed
} from './redux/actions/navigationActions';

import { alertClear } from './redux/actions/alertActions';

import {
  setNavVisible,
  setNavInvisible
} from './redux/actions/navigationActions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };

    const { dispatch } = this.props;

    if (this.state.windowWidth <= 1200 || this.state.windowHeight <= 740) {
      store.dispatch(setNavInvisible());
    } else {
      store.dispatch(setNavVisible());
    }

    history.listen((location, action) => {
      dispatch(alertClear);
    });

    this.toggleSideMenu = this.toggleSideMenu.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  //window with
  handleResize() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  toggleSideMenu() {
    if (this.props.sideMenuExpanded) {
      this.props.dispatch(setNavCollapsed());
    } else {
      this.props.dispatch(setNavExpanded());
    }
  }

  render() {
    let navigationClassNames = 'app';
    if (this.props.sideMenuVisible) {
      if (
        this.props.sideMenuExpanded &&
        this.state.windowWidth > 1200 &&
        window.innerHeight > 740
      ) {
        navigationClassNames = 'app expanded';
      } else {
        navigationClassNames = 'app collapsed';
      }
    }

    const { alert } = this.props;
    return (
      <div id="App" className={navigationClassNames} style={{ height: '100%' }}>
        <Helmet>
          <style>
            {'body { background-color: rgb(230, 231, 233, 100%); }'}
          </style>
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
    sideMenuExpanded: state.navigation.expanded,
    sideMenuVisible: state.navigation.visible
  };
}

export default connect(mapStateToProps)(App);
