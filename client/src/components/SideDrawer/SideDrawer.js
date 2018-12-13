import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/SideDrawer.css';

import DrawerToggleButton from './DrawerToggleButton';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  if (!props.show) {
    drawerClasses = 'side-drawer close';
  }
  return (
    <nav className={drawerClasses}>
      <div className='navigation'>
        <div className='user-part'>
          <ul>
            <li>
              <Link to='/profile'>
                <img src='img/Marc.png' alt='Marc' />
              </Link>
            </li>
            <li>
              <Link to='/profile'>Marc Zimmermann</Link>
            </li>
            <li>
              <Link to='/profile'>Profil verwalten</Link>
            </li>
          </ul>
        </div>
        <div className='spacer' />
        <div className='pages'>
          <div className='pages-icons'>
            <ul>
              <li>
                <Link to='/'>
                  <img src='img/News.png' alt='News' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <img src='img/Group.png' alt='Events' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <img src='img/Members.png' alt='Members' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <img src='img/Sponsoren.png' alt='Sponsoren' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <img src='img/Admin.png' alt='Admin' />
                </Link>
              </li>
            </ul>
          </div>
          <div className='pages-link'>
            <ul>
              <li>
                <Link to='/'>News</Link>
              </li>
              <li>
                <Link to='/'>Events</Link>
              </li>
              <li>
                <Link to='/'>Mitglieder</Link>
              </li>
              <li>
                <Link to='/'>Sponsoren</Link>
              </li>
              <li>
                <Link to='/'>Administration</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='bottom-part'>
          <DrawerToggleButton
            image='img/Vector.png'
            click={props.drawerClickHandler}
          />
        </div>
      </div>
    </nav>
  );
};

export default sideDrawer;
