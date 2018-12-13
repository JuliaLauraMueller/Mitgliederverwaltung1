import React, { Component } from 'react';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import '../../css/AppNavbar.css';

class AppNavbar extends Component {
    //constructor(props) {
    //  super(props);
    state = {
        sideDrawerOpen: false,
        isMobile: false
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
        this.props.expandSideMenu();
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
    };

    render() {
            let backDrop;

            if(this.state.sideDrawerOpen && this.state.isMobile){
                backDrop = <Backdrop click={this.backdropClickHandler}/>;
            }
            return (
                <div className="app-nav-bar">
                    <div style={{height: '100%'}}>
                        <Toolbar className="tool-bar" drawerClickHandler={this.drawerToggleClickHandler} />
                        <SideDrawer className="side-drawer" drawerClickHandler={this.drawerToggleClickHandler} show={this.state.sideDrawerOpen}/>
                        {backDrop}
                    </div>
                </div>
            );
    }
}

export default AppNavbar;