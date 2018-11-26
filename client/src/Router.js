import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

class Router extends Component{
    render() {
        // Add Routes to Switch
        return (
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
            </Switch>
        );
    }
}

export default Router;