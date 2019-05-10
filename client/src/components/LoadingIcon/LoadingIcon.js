import React from 'react';

const LoadingIcon = props => (
  <img
    src={require('../../img/LoadingIcon.gif')}
    alt='loading-icon-app'
    className={props.cssClass}
  />
);

export default LoadingIcon;
