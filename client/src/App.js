// Components
import React, { Component } from 'react';
import './App.css';
import Router from './Router';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Store
import store from './store';

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
