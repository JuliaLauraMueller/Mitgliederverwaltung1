import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ToolbarDesktop.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

import { connect } from 'react-redux';

class Toolbar extends Component {
  render() {
    let AdminIcon = {};
    if (this.props.user !== undefined && this.props.user.role >= 2) {
      AdminIcon = (
        <Link to='/admin'>
          <svg
            width='24'
            height='26'
            viewBox='0 0 24 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='navbar-desktop-extended-logo'
          >
            <path
              d='M3.9006 25.6C3.67347 25.6 3.50516 25.516 3.3884 25.3809C3.2671 25.2406 3.17673 25.015 3.17673 24.7V1.3C3.17673 0.984952 3.2671 0.759403 3.3884 0.6191C3.50516 0.484037 3.67347 0.4 3.9006 0.4C4.12774 0.4 4.29605 0.484037 4.41281 0.6191C4.53411 0.759403 4.62448 0.984952 4.62448 1.3V24.7C4.62448 25.015 4.53411 25.2406 4.41281 25.3809C4.29605 25.516 4.12774 25.6 3.9006 25.6Z'
              fill='white'
              stroke='#4D5460'
              strokeWidth='0.8'
            />
            <path
              d='M11.7677 25.6C11.5406 25.6 11.3723 25.5159 11.2555 25.3809C11.1342 25.2406 11.0439 25.015 11.0439 24.7V13.91C11.0439 13.5949 11.1342 13.3694 11.2555 13.2291C11.3723 13.094 11.5406 13.01 11.7677 13.01C11.9949 13.01 12.1632 13.094 12.2799 13.2291C12.4012 13.3694 12.4916 13.5949 12.4916 13.91V24.7C12.4916 25.015 12.4012 25.2406 12.2799 25.3809C12.1632 25.5159 11.9949 25.6 11.7677 25.6Z'
              fill='white'
              stroke='#4D5460'
              strokeWidth='0.8'
            />
            <path
              d='M11.7677 9.87C11.5406 9.87 11.3723 9.78596 11.2555 9.6509C11.1342 9.5106 11.0439 9.28505 11.0439 8.97V1.3C11.0439 0.984952 11.1342 0.759404 11.2555 0.6191C11.3723 0.484037 11.5406 0.4 11.7677 0.4C11.9949 0.4 12.1632 0.484037 12.2799 0.6191C12.4012 0.759404 12.4916 0.984952 12.4916 1.3V8.97C12.4916 9.48352 12.1453 9.87 11.7677 9.87Z'
              fill='white'
              stroke='#4D5460'
              strokeWidth='0.8'
            />
            <path
              d='M19.6349 25.6C19.4077 25.6 19.2394 25.516 19.1226 25.3809C19.0014 25.2406 18.911 25.015 18.911 24.7V1.3C18.911 0.984952 19.0014 0.759403 19.1226 0.6191C19.2394 0.484037 19.4077 0.4 19.6349 0.4C19.862 0.4 20.0303 0.484037 20.1471 0.6191C20.2684 0.759403 20.3587 0.984952 20.3587 1.3V24.7C20.3587 25.015 20.2684 25.2406 20.1471 25.3809C20.0303 25.516 19.862 25.6 19.6349 25.6Z'
              fill='white'
              stroke='#4D5460'
              strokeWidth='0.8'
            />
            <path
              d='M6.14841 7.00994H1.65292C1.42579 7.00994 1.25748 6.9259 1.14071 6.79084C1.01942 6.65053 0.929053 6.42498 0.929053 6.10994C0.929053 5.79489 1.01942 5.56934 1.14071 5.42904C1.25748 5.29397 1.42579 5.20994 1.65292 5.20994H6.14841C6.37554 5.20994 6.54385 5.29397 6.66062 5.42904C6.78191 5.56934 6.87228 5.79489 6.87228 6.10994C6.87228 6.42498 6.78191 6.65053 6.66062 6.79084C6.54385 6.9259 6.37554 7.00994 6.14841 7.00994Z'
              fill='white'
              stroke='#4D5460'
              strokeWidth='0.8'
            />
            <path
              d='M14.0155 14.29H9.51999C9.29286 14.29 9.12454 14.2059 9.00778 14.0709C8.88649 13.9306 8.79612 13.705 8.79612 13.39C8.79612 13.0749 8.88649 12.8494 9.00778 12.7091C9.12454 12.574 9.29286 12.49 9.51999 12.49H14.0155C14.2426 12.49 14.4109 12.574 14.5277 12.7091C14.649 12.8494 14.7393 13.0749 14.7393 13.39C14.7393 13.9785 14.3282 14.29 14.0155 14.29Z'
              fill='white'
              stroke='#4D5460'
              strokeWidth='0.8'
            />
            <path
              d='M21.8826 21.7H17.3871C17.16 21.7 16.9917 21.616 16.8749 21.4809C16.7536 21.3406 16.6632 21.115 16.6632 20.8C16.6632 20.485 16.7536 20.2594 16.8749 20.1191C16.9917 19.984 17.16 19.9 17.3871 19.9H21.8826C22.1097 19.9 22.278 19.984 22.3948 20.1191C22.5161 20.2594 22.6065 20.485 22.6065 20.8C22.6065 21.115 22.5161 21.3406 22.3948 21.4809C22.278 21.616 22.1097 21.7 21.8826 21.7Z'
              fill='white'
              stroke='#4D5460'
              strokeWidth='0.8'
            />
          </svg>
        </Link>
      );
    } else {
      AdminIcon = <div />;
    }
    return (
      <div className='toolbar'>
        <nav className='toolbar_navigation'>
          <span className='toolbar-burger-menu'>
            <DrawerToggleButton
              image='burger'
              click={this.props.drawerClickHandler}
            />
          </span>
          <div className='toolbar_navigation-items'>
            <div className='toolbar_navigation-links'>
              <ul>
                <li>
                  <Link to='/'>
                    <svg
                      height='26'
                      width='18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='navbar-desktop-extended-logo'
                    >
                      <path
                        d='M1.2137 24.7619V24.8869H1.3387H16.4677H16.5927V24.7619V1.2381V1.1131H16.4677H1.3387H1.2137V1.2381V24.7619ZM17.0081 25.875H0.798379C0.670241 25.875 0.570265 25.8271 0.500819 25.7476C0.430034 25.6665 0.383057 25.5429 0.383057 25.381V0.619048C0.383057 0.457055 0.430033 0.333534 0.500819 0.252435C0.570265 0.17287 0.670241 0.125 0.798379 0.125H17.0081C17.1362 0.125 17.2362 0.172871 17.3056 0.252435C17.3764 0.333534 17.4234 0.457055 17.4234 0.619048V25.381C17.4234 25.6914 17.2014 25.875 17.0081 25.875Z'
                        fill='white'
                        stroke='#4D5460'
                        strokeWidth='0.25'
                      />
                      <path
                        d='M3.73309 13.9893V13.0012H14.2895V13.9893H3.73309Z'
                        fill='white'
                        stroke='#4D5460'
                        strokeWidth='0.25'
                      />
                      <path
                        d='M3.73309 17.7035V16.7155H14.2895V17.7035H3.73309Z'
                        fill='white'
                        stroke='#4D5460'
                        strokeWidth='0.25'
                      />
                      <path
                        d='M3.73309 21.4179V20.4298H14.2895V21.4179H3.73309Z'
                        fill='white'
                        stroke='#4D5460'
                        strokeWidth='0.25'
                      />
                      <path
                        d='M9.13629 6.56073V5.57263H14.2895V6.56073H9.13629Z'
                        fill='white'
                        stroke='#4D5460'
                        strokeWidth='0.25'
                      />
                      <path
                        d='M9.13629 10.275V9.28687H14.2895V10.275H9.13629Z'
                        fill='white'
                        stroke='#4D5460'
                        strokeWidth='0.25'
                      />
                      <path
                        d='M5.19815 9.2857C4.26924 9.2857 3.55145 8.42855 3.55145 7.42855C3.55145 6.38094 4.31147 5.57141 5.19815 5.57141C6.12706 5.57141 6.84485 6.42855 6.84485 7.42855C6.84485 8.47617 6.12706 9.2857 5.19815 9.2857Z'
                        fill='white'
                      />
                      <path
                        d='M5.19815 9.2857C4.26924 9.2857 3.55145 8.42855 3.55145 7.42855C3.55145 6.38094 4.31147 5.57141 5.19815 5.57141C6.12706 5.57141 6.84485 6.42855 6.84485 7.42855C6.84485 8.47617 6.12706 9.2857 5.19815 9.2857Z'
                        stroke='#EBECED'
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to='/events'>
                    <svg
                      width='14'
                      height='26'
                      viewBox='0 0 32 32'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='navbar-desktop-extended-logo'
                    >
                      <path
                        d='M29.334,3H25V1c0-0.553-0.447-1-1-1s-1,0.447-1,1v2h-6V1c0-0.553-0.448-1-1-1s-1,0.447-1,1v2H9V1   c0-0.553-0.448-1-1-1S7,0.447,7,1v2H2.667C1.194,3,0,4.193,0,5.666v23.667C0,30.806,1.194,32,2.667,32h26.667   C30.807,32,32,30.806,32,29.333V5.666C32,4.193,30.807,3,29.334,3z M30,29.333C30,29.701,29.701,30,29.334,30H2.667   C2.299,30,2,29.701,2,29.333V5.666C2,5.299,2.299,5,2.667,5H7v2c0,0.553,0.448,1,1,1s1-0.447,1-1V5h6v2c0,0.553,0.448,1,1,1   s1-0.447,1-1V5h6v2c0,0.553,0.447,1,1,1s1-0.447,1-1V5h4.334C29.701,5,30,5.299,30,5.666V29.333z'
                        fill='white'
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to='/members'>
                    <svg
                      width='22'
                      height='26'
                      viewBox='0 0 22 26'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='navbar-desktop-extended-logo'
                    >
                      <path
                        d='M19.6466 24.3722H19.7716V24.2472V23.2533C19.7716 20.2916 18.6765 18.2688 17.0576 16.9896C15.4433 15.714 13.3216 15.1879 11.2802 15.1879H10.2543C8.21294 15.1879 6.09118 15.714 4.47691 16.9896C2.85799 18.2688 1.76286 20.2916 1.76286 23.2533V24.2472V24.3722H1.88786H1.88836H19.6466ZM20.394 25.875H1.14096C0.815355 25.875 0.518555 25.5577 0.518555 25.1236V23.2533C0.518555 20.3372 1.47648 17.9478 3.16548 16.2877C4.85468 14.6273 7.28648 13.685 10.2548 13.685H11.2807C14.249 13.685 16.6808 14.6273 18.37 16.2877C20.059 17.9478 21.0169 20.3372 21.0169 23.2533V25.1234C21.0165 25.5577 20.7196 25.875 20.394 25.875ZM10.7675 12.6486C8.18075 12.6486 6.04385 10.1736 6.04385 7.08852V5.68624C6.04385 2.60059 8.18077 0.125 10.7675 0.125C13.3542 0.125 15.4911 2.60059 15.4911 5.68624V7.08852C15.4911 10.1736 13.3542 12.6486 10.7675 12.6486ZM10.7675 1.62726C8.83093 1.62726 7.28866 3.46779 7.28866 5.68566V7.08793C7.28866 9.30586 8.83148 11.1452 10.7675 11.1452C12.7035 11.1452 14.2463 9.30526 14.2463 7.08793V5.68566C14.2463 3.46779 12.7041 1.62726 10.7675 1.62726Z'
                        fill='white'
                        strokeWidth='0.25'
                      />
                    </svg>
                  </Link>
                </li>
                <li>{AdminIcon}</li>
                <li>
                  <svg
                    width='13'
                    height='26'
                    viewBox='0 0 13 26'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='navbar-desktop-extended-logo'
                  />
                </li>
              </ul>
            </div>
            <div className='toolbar_logo'>
              <a href='/'>
                <img
                  className='toolbar-icon'
                  src={require('../../img/logo_black_small.png')}
                  alt='logo'
                />
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(mapStateToProps)(Toolbar);
