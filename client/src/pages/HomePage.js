import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar/AppNavbar';
import Backdrop from '../components/Backdrop/Backdrop';

class HomePage extends Component{

    state = {
        sideDrawerOpen: false
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
    };

    render() {
        let backDrop;

        if(this.state.sideDrawerOpen){
            backDrop = <Backdrop click={this.backdropClickHandler}/>;
        }
        return (
            <div>
                <div style={{height: '100%', width:'100%'}}>
        {/*<Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
                    <SideDrawer show={this.state.sideDrawerOpen}/>
                    {backDrop}*/}
                    <AppNavbar className="nav-bar"/>
                    <h1>Hello World! This is the HomePage</h1>
                    <Link to="/login">Login</Link>
                    <main style={{marginTop: '64px'}}>
                        <p>this is the page content</p>
                    </main>
                </div> 
            </div> 
        );
    }
}

export default HomePage;