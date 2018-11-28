import { FETCH_PROFILE } from './types';

export function fetchProfile() {
  return function(dispatch) {
    // add axios request
    dispatch({ type: FETCH_PROFILE });
  };
}
