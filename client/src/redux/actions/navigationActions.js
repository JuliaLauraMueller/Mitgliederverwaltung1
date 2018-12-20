import { SET_NAV_VISIBLE } from '../types/navigationTypes';
import { SET_NAV_INVISIBLE } from '../types/navigationTypes';
import { SET_NAV_COLLAPSED } from '../types/navigationTypes';
import { SET_NAV_EXPANDED } from '../types/navigationTypes';

export function setNavVisible() {
  return function(dispatch) {
    // add axios request
    dispatch({ type: SET_NAV_VISIBLE });
  };
}

export function setNavInvisible() {
  return function(dispatch) {
    // add axios request
    dispatch({ type: SET_NAV_INVISIBLE });
  };
}

export function setNavExpanded() {
  return function(dispatch) {
    // add axios request
    dispatch({ type: SET_NAV_EXPANDED });
  };
}

export function setNavCollapsed() {
  return function(dispatch) {
    // add axios request
    dispatch({ type: SET_NAV_COLLAPSED });
  };
}
