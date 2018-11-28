// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

// Components
import React, { Component } from 'react';
import Routes from './routing/Routes';
import AuthHeader from './helpers/AuthHeader';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';

import store from './helpers/store';

class App extends Component {
  // Add global layout components before route
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Container style={{ marginTop: '5rem' }}>
            <AuthHeader />
            <Routes />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
