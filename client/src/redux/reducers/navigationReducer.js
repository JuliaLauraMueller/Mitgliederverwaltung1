import { SET_NAV_VISIBLE } from '../types/navigationTypes';
import { SET_NAV_INVISIBLE } from '../types/navigationTypes';
import { SET_NAV_COLLAPSED } from '../types/navigationTypes';
import { SET_NAV_EXPANDED } from '../types/navigationTypes';

const initialState = {
  expanded: false,
  visible: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NAV_VISIBLE:
      return { ...state, visible: true };
    case SET_NAV_INVISIBLE:
      return { ...state, visible: false };
    case SET_NAV_COLLAPSED:
      return { ...state, expanded: false };
    case SET_NAV_EXPANDED:
      return { ...state, expanded: true };
    default:
      return state;
  }
}
