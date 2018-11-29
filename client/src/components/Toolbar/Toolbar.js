import React from 'react';
import './ToolbarDesktop.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import admin from '../../resources/Admin.png';
import sponsoren from '../../resources/Sponsoren.png';
import group from '../../resources/Group.png';
import logo from '../../resources/logo black small.png';
import news from '../../resources/News.png';
import members from '../../resources/Members.png';
import vector from '../../resources/Vector.png';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                 <DrawerToggleButton image={vector} click={props.drawerClickHandler}/> 
            </div>
            <div className="toolbar_navigation-items">
                <ul>
                    <li><a href="/"><img className="icon" src={news}/></a></li>
                    <li><a href="/"><img className="icon" src={group}/></a></li>
                    <li><a href="/"><img className="icon"src={members}/></a></li>
                    <li><a href="/"><img className="icon" src={sponsoren}/></a></li>
                    <li><a href="/"><img className="icon" src={admin}/></a></li>
                </ul>
            </div>
            <div className="spacer"></div>
            <div className="toolbar_logo"><a href="/"><img className="icon" src={logo}/></a></div>
        </nav>
    </header>
);

export default toolbar;
