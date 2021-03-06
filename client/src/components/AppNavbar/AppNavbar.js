import React, { Component } from 'react';
import classnames from 'classnames';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import '../../css/AppNavbar.css';

import { connect } from 'react-redux';
import BurgerNav from '../BurgerNav/BurgerNav';

import { setNavCollapsed } from '../../redux/actions/navigationActions';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWith: window.innerWidth,
      windowHeight: window.innerHeight,
      isMobile: false,
      prevScrollpos: window.pageYOffset,
      visible: true
    };
  }

  //window with
  handleResize() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
    if (
      (window.innerWidth <= 1200 || window.innerHeight <= 740) &&
      this.props.navigationExpanded
    ) {
      // close nav when changing to mobile view
      this.props.dispatch(setNavCollapsed());
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    window.removeEventListener('scroll', this.handleScroll);
  }

  drawerToggleClickHandler = () => {
    this.props.toggleSideMenu();
  };

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  render() {
    let visibleClass = 'invisible';
    if (this.props.navigationVisible) {
      visibleClass = 'visible';
    }
    if (window.innerWidth <= 1200 || window.innerHeight <= 740) {
      return (
        <nav
          className={classnames('navbar', {
            'navbar--hidden': !this.state.visible
          })}
        >
          {' '}
          <BurgerNav className="navbar--hidden" visibleClass={visibleClass} />
        </nav>
      );
    } else {
      return (
        <div className={'app-nav-bar ' + visibleClass}>
          <div style={{ height: '100%' }}>
            <Toolbar
              className="tool-bar"
              drawerClickHandler={this.drawerToggleClickHandler}
            />
            <SideDrawer
              className="side-drawer"
              drawerClickHandler={this.drawerToggleClickHandler}
              show={this.props.navigationExpanded}
            />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    navigationVisible: state.navigation.visible,
    navigationExpanded: state.navigation.expanded
  };
}

export default connect(mapStateToProps)(AppNavbar);
