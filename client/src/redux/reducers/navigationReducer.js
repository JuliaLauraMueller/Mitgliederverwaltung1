import { SET_NAV_VISIBLE } from '../types/navigationTypes';
import { SET_NAV_INVISIBLE } from '../types/navigationTypes';
import { SET_NAV_COLLAPSED } from '../types/navigationTypes';
import { SET_NAV_EXPANDED } from '../types/navigationTypes';
import { UPDATE_NAV_USERDATA } from '../types/navigationTypes';

const initialState = {
  expanded: true,
  visible: true,
  userData: {}
};

export default function(state = initialState, action, payload) {
  switch (action.type) {
    case SET_NAV_VISIBLE:
      return { ...state, visible: true };
    case SET_NAV_INVISIBLE:
      return { ...state, visible: false };
    case SET_NAV_COLLAPSED:
      return { ...state, expanded: false };
    case SET_NAV_EXPANDED:
      return { ...state, expanded: true };
    case UPDATE_NAV_USERDATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
