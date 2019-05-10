import { SET_NAV_VISIBLE } from '../types/navigationTypes';
import { SET_NAV_INVISIBLE } from '../types/navigationTypes';
import { SET_NAV_COLLAPSED } from '../types/navigationTypes';
import { SET_NAV_EXPANDED } from '../types/navigationTypes';
import { UPDATE_NAV_USERDATA } from '../types/navigationTypes';
import profileService from '../../services/profileService';

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

export function updateNavUserdata(newData) {
  if (!newData) {
    try {
      newData = JSON.parse(localStorage.getItem('userData'));
    } catch {}
  }

  localStorage.setItem('userData', JSON.stringify(newData));
  return function(dispatch) {
    dispatch({ type: UPDATE_NAV_USERDATA, payload: newData });
  };
}

export const changePassword = data => async dispatch => {
  return profileService
    .changePassword(data)
    .then(res => {
      Promise.resolve();
    })
    .catch(err => {
      return Promise.reject(err);
    });
};
