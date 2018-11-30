// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

// Components
import React, { Component } from 'react';
import Router from './Routes';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';

//Store
import store from './helpers/store';

class App extends Component {
  // Add global layout components before route
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Container style={{ marginTop: '5rem' }}>
            <Router />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
