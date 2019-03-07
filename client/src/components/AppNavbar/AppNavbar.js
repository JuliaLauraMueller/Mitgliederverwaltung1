import React, { Component } from 'react';
import { Button } from 'reactstrap';
import store from '../../helpers/store';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import '../../css/AppNavbar.css';

import { connect } from 'react-redux';
import BurgerNav from '../BurgerNav/BurgerNav';

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
    windowWith: window.innerWidth,
    sideDrawerOpen: false,
    isMobile: false,
    navigationClasses: 'app-nav-bar invisible',
    previouslyVisible: false
  };

  //window with
  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
    this.props.toggleSideMenu();
  };

  render() {
    if (window.innerWidth <= 768) {
      return (
        <div className={this.state.navigationClasses}>
          <BurgerNav />
        </div>
      );
    } else {
      return (
        <div className={this.state.navigationClasses}>
          <div style={{ height: '100%' }}>
            <Toolbar
              className="tool-bar"
              drawerClickHandler={this.drawerToggleClickHandler}
            />
            <SideDrawer
              className="side-drawer"
              drawerClickHandler={this.drawerToggleClickHandler}
              show={this.state.sideDrawerOpen}
            />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AppNavbar);
