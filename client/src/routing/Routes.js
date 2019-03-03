import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../helpers/history';

import { PrivateRoute } from './PrivateRoute';

import { connect } from 'react-redux';

// Import pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProfilePage from '../pages/ProfilePage';
import MemberPage from '../pages/MemberPage';
import AdminPage from '../pages/AdminPage';
import AppNavbar from '../components/AppNavbar/AppNavbar';

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <div className="navbar-app">
            <AppNavbar toggleSideMenu={this.props.toggleSideMenu} />
          </div>
          <div>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute
                exact
                path={'/member/:id'}
                component={ProfilePage}
              />
              <PrivateRoute exact path="/members" component={MemberPage} />
              <PrivateRoute exact path="/admin" component={AdminPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Routes);
