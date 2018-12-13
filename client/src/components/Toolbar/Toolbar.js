import React from 'react';
import '../../css/ToolbarDesktop.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                 <DrawerToggleButton image="img/Vector.png" click={props.drawerClickHandler}/> 
            </div>
            <div className="toolbar_navigation-items">
                <ul>
                    <li><a href="/"><img className="icon" src="img/News.png"/></a></li>
                    <li><a href="/"><img className="icon" src="img/Group.png"/></a></li>
                    <li><a href="/"><img className="icon"src="img/Members.png"/></a></li>
                    <li><a href="/"><img className="icon" src="img/Sponsoren.png"/></a></li>
                    <li><a href="/"><img className="icon" src="img/Admin.png"/></a></li>
                </ul>
            </div>
            <div className="spacer"></div>
            <div className="toolbar_logo"><a href="/"><img className="icon" src="img/logo_black_small.png"/></a></div>
        </nav>
    </header>
);

export default toolbar;
