// Components
import React, { Component } from 'react';
import './css/App.css';
import Router from './Router';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar/AppNavbar';

class App extends Component {
  // Add global layout components before route
  state = {
    sideMenuExpanded: false,
    AppClassName: 'App collapsed'
  };
  
  expandSideMenu = () => {
    this.setState((prevState) => {
        return {sideMenuExpanded: !prevState.sideMenuExpanded};
    });
    if(this.state.sideMenuExpanded){
        this.setState((prevState) => { return {AppClassName: 'App collapsed'};
      });
    }
    else{
        this.setState((prevState) => { return {AppClassName: 'App expanded'};
      });
    }
  };

  render() {
    return (
      <div className={this.state.AppClassName} style={{height:"100%"}}>
        <div className="navbar-ours">
          <AppNavbar expandSideMenu={this.expandSideMenu}/>
        </div>  
        <div className="container-bla">  
            <Router />
        </div>
      </div>
    );
  }
}

export default App;
