// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import React, { Component } from 'react';
import Router from './Router';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

//Store
import store from './store';

class App extends Component {
 // Add global layout components before route
 render() {
   return (
     <Provider store={store}>
       <div className="App">
         <div>
           <Helmet>
             <style>
               {'body { background-color: rgb(15, 25, 41, 100%); }'}
             </style>
           </Helmet>
         </div>
         <Container style={{ marginTop: '5rem' }}>
           <Router />
         </Container>
       </div>
     </Provider>
   );
 }
}

export default App;