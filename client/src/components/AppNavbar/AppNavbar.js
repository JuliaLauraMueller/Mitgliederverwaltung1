import React, { Component } from 'react';
import store from '../../helpers/store';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import '../../css/AppNavbar.css';

import { connect } from 'react-redux';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    store.subscribe(() => {
      const visibleStatus = store.getState().navigation.visible;
      if (visibleStatus !== this.state.previouslyVisible) {
        if (visibleStatus) {
          this.state.navigationClasses = 'app-nav-bar visible';
        } else {
          this.state.navigationClasses = 'app-nav-bar invisible';
        }
        this.state.previouslyVisible = visibleStatus;
        this.forceUpdate();
      }
    });
  }

  state = {
    sideDrawerOpen: false,
    isMobile: false,
    navigationClasses: 'app-nav-bar invisible',
    previouslyVisible: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
    this.props.toggleSideMenu();
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backDrop;

    if (this.state.sideDrawerOpen && this.state.isMobile) {
      backDrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div className={this.state.navigationClasses}>
        <div style={{ height: '100%' }}>
          <Toolbar
            className='tool-bar'
            drawerClickHandler={this.drawerToggleClickHandler}
          />
          <SideDrawer
            className='side-drawer'
            drawerClickHandler={this.drawerToggleClickHandler}
            show={this.state.sideDrawerOpen}
          />
          {backDrop}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AppNavbar);
