import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/ToolbarDesktop.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

const toolbar = props => (
  <header className='toolbar'>
    <nav className='toolbar_navigation'>
      <div>
        <DrawerToggleButton
          image='img/Vector.png'
          click={props.drawerClickHandler}
        />
      </div>
      <div className='toolbar_navigation-items'>
        <ul>
          <li>
            <Link to='/'>
              <img className='icon' src='img/News.png' alt='News' />
            </Link>
          </li>
          <li>
            <Link to='/'>
              <img className='icon' src='img/Group.png' alt='Events' />
            </Link>
          </li>
          <li>
            <Link to='/members'>
              <img className='icon' src='img/Members.png' alt='Mitglieder' />
            </Link>
          </li>
          <li>
            <Link to='/'>
              <img className='icon' src='img/Sponsoren.png' alt='Sponsoren' />
            </Link>
          </li>
          <li>
            <Link to='/'>
              <img className='icon' src='img/Admin.png' alt='Admin' />
            </Link>
          </li>
        </ul>
      </div>
      <div className='spacer' />
      <div className='toolbar_logo'>
        <a href='/'>
          <img className='icon' src='img/logo_black_small.png' alt='logo' />
        </a>
      </div>
    </nav>
  </header>
);

export default toolbar;
