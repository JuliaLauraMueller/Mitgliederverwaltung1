import React from 'react';

import './SideDrawer.css';
import vector from '../../resources/Vector.png';
import admin from '../../resources/Admin.png';
import sponsoren from '../../resources/Sponsoren.png';
import group from '../../resources/Group.png';
import logo from '../../resources/logo black small.png';
import news from '../../resources/News.png';
import members from '../../resources/Members.png';
import marc from '../../resources/Marc.png';

import DrawerToggleButton from './DrawerToggleButton';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses = 'side-drawer open'
    }
    if(!props.show){
        drawerClasses = 'side-drawer close'
    }
    return(
        <nav className={drawerClasses}>
            <div className="navigation">
                <div className="user-part">
                    <ul>
                        <li><a href="/"><img src={marc}></img></a></li>
                        <li><a href="/">Marc Zimmermann</a></li>
                        <li><a href="/">Profil verwalten</a></li>
                    </ul>
                </div>
                <div className="spacer"/>
                <div className="pages">
                    <div className="pages-icons">
                    <ul>
                            <li><img src={news}></img><a href="/"></a></li>
                            <li><img src={group}></img><a href="/"></a></li>
                            <li><img src={members}></img><a href="/"></a></li>
                            <li><img src={sponsoren}></img><a href="/"></a></li>
                            <li><img src={admin}></img><a href="/"></a></li>
                        </ul>
                    </div>
                    <div className="pages-link">
                        <ul>
                            <li><a href="/">News</a></li>
                            <li><a href="/">Events</a></li>
                            <li><a href="/">Mitglieder</a></li>
                            <li><a href="/">Sponsoren</a></li>
                            <li><a href="/">Administration</a></li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-part">
                    <DrawerToggleButton image={vector} click={props.drawerClickHandler}/>
                </div>
            </div>
        </nav>
    );
};

export default sideDrawer;