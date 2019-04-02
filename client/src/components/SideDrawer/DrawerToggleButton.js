import React from 'react';

import '../../css/DrawerToggleButton.css';

const drawerToggleButton = props => (
  <button className="toggle-button" onClick={props.click}>
    <img src={require(`../../img/${props.image}`)} alt="button_image" />
  </button>
);

export default drawerToggleButton;
