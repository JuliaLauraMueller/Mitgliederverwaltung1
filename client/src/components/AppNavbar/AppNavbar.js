import React, { Component } from 'react';
import store from '../../helpers/store';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import '../../css/AppNavbar.css';

import { connect } from 'react-redux';
import BurgerNav from '../BurgerNav/BurgerNav';

import { setNavCollapsed } from '../../redux/actions/navigationActions';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    store.subscribe(() => {
      const visibleStatus = store.getState().navigation.visible;
      if (visibleStatus !== this.state.previouslyVisible) {
        if (visibleStatus) {
          this.state.visibleClass = 'visible';
        } else {
          this.state.visibleClass = 'invisible';
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
    visibleClass: 'invisible',
    previouslyVisible: false
  };

  //window with
  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
    if (window.innerWidth <= 768) {
      this.props.dispatch(setNavCollapsed());
      this.state.sideDrawerOpen = false;
    }
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
      return <BurgerNav visibleClass={this.state.visibleClass} />;
    } else {
      return (
        <div className={'app-nav-bar ' + this.state.visibleClass}>
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
