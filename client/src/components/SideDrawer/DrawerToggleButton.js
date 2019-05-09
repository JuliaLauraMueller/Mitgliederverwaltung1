import React, { Component } from 'react';

import '../../css/DrawerToggleButton.css';

export default class DrawerToggleButton extends Component {
  render() {
    if (this.props.image === 'burger') {
      return (
        <button className="toggle-button" onClick={this.props.click}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 256"
            className="svg-svg"
            height="35px"
            width="40px"
          >
            <path
              fill="white"
              className="path-svg"
              d="M0,277.33H384V320H0ZM0,170.67H384v42.66H0ZM0,64H384v42.67H0Z"
              transform="translate(0 -64)"
            />
          </svg>
        </button>
      );
    } else if (this.props.image === 'arrow') {
      return (
        <button className="toggle-button-arrow" onClick={this.props.click}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="27px"
            height="25px"
            viewBox="0 0 284.935 284.936"
            className="svg-svg"
          >
            <path
              fill="white"
              className="path-svg"
              d="M110.488,142.468L222.694,30.264c1.902-1.903,2.854-4.093,2.854-6.567c0-2.474-0.951-4.664-2.854-6.563L208.417,2.857
		C206.513,0.955,204.324,0,201.856,0c-2.475,0-4.664,0.955-6.567,2.857L62.24,135.9c-1.903,1.903-2.852,4.093-2.852,6.567
		c0,2.475,0.949,4.664,2.852,6.567l133.042,133.043c1.906,1.906,4.097,2.857,6.571,2.857c2.471,0,4.66-0.951,6.563-2.857
		l14.277-14.267c1.902-1.903,2.851-4.094,2.851-6.57c0-2.472-0.948-4.661-2.851-6.564L110.488,142.468z"
            />
          </svg>
        </button>
      );
    }
  }
}
