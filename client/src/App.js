// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

// Components
import React, { Component } from 'react';
import Router from './Router';
import { Container } from 'reactstrap';

class App extends Component {
  // Add global layout components before route
  render() {
    return (
      <div className="App">
        <Container style={{ marginTop: '5rem' }}>
          <Router />
        </Container>
      </div>
    );
  }
}

export default App;
