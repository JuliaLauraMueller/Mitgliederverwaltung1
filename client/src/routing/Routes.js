import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../helpers/history';

import { PrivateRoute } from './PrivateRoute';

import { connect } from 'react-redux';

// Import pages
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProfilePage from '../pages/ProfilePage';
import MemberPage from '../pages/MemberPage';
import EventPage from '../pages/EventPage';
import AdminPage from '../pages/AdminPage';
import SingleEventPage from '../pages/SingleEventPage';
import NewsPage from '../pages/NewsPage';
import AppNavbar from '../components/AppNavbar/AppNavbar';
import store from '../helpers/store';

class Routes extends Component {
  render() {
    let AdminRoute;
    if (
      store.getState().auth.user !== undefined &&
      store.getState().auth.user.role >= 2
    ) {
      AdminRoute = <PrivateRoute exact path="/admin" component={AdminPage} />;
    }

    return (
      <Router history={history}>
        <div>
          <AppNavbar toggleSideMenu={this.props.toggleSideMenu} />
          <div id="page-wrap">
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <PrivateRoute exact path="/" component={NewsPage} />
              <PrivateRoute
                exact
                path={'/member/:id'}
                component={ProfilePage}
              />
              <PrivateRoute exact path="/news" component={NewsPage} />
              <PrivateRoute exact path="/members" component={MemberPage} />
              <PrivateRoute exact path="/events" component={EventPage} />
              <PrivateRoute
                exact
                path="/event/:id"
                component={SingleEventPage}
              />
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
  return { loggedIn: state.auth.loggedIn }; // trigger rerender when loggedIn state has changed
}

export default connect(mapStateToProps)(Routes);
