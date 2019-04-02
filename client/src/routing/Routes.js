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
    let AdminRoute;
    if (this.props.user !== undefined && this.props.user.role >= 3) {
      AdminRoute = <PrivateRoute exact path="/admin" component={AdminPage} />;
    }

    return (
      <Router history={history}>
        <div>
          <AppNavbar toggleSideMenu={this.props.toggleSideMenu} />
          <div id="page-wrap">
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute
                exact
                path={'/member/:id'}
                component={ProfilePage}
              />
              <PrivateRoute exact path="/members" component={MemberPage} />
              {AdminRoute}
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Routes);
