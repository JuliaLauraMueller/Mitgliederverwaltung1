import React from 'react';

import '../../css/SideDrawer.css';

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
                        <li><a href="/"><img src="img/Marc.png"></img></a></li>
                        <li><a href="/">Marc Zimmermann</a></li>
                        <li><a href="/">Profil verwalten</a></li>
                    </ul>
                </div>
                <div className="spacer"/>
                <div className="pages">
                    <div className="pages-icons">
                    <ul>
                            <li><img src="img/News.png"></img><a href="/"></a></li>
                            <li><img src="img/Group.png"></img><a href="/"></a></li>
                            <li><img src="img/Members.png"></img><a href="/"></a></li>
                            <li><img src="img/Sponsoren.png"></img><a href="/"></a></li>
                            <li><img src="img/Admin.png"></img><a href="/"></a></li>
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
                    <DrawerToggleButton image="img/Vector.png" click={props.drawerClickHandler}/>
                </div>
            </div>
        </nav>
    );
};

export default sideDrawer;