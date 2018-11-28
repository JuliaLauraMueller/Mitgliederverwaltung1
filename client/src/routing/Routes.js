import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../helpers/history';

import { PrivateRoute } from './PrivateRoute';

// Import pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';

class Routes extends Component {
  render() {
    // Add Routes to Switch
    return (
      <Router history={history}>
        <div>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;
