import { FETCH_PROFILE } from './types';
import { PUT_PROFILE } from './types';

export function fetchProfile() {
  return function(dispatch) {
    // add axios request
    dispatch({ type: FETCH_PROFILE });
  };
}

export function putProfile(profileData) {
  return function(dispatch) {
    // add axios request
    dispatch({ type: PUT_PROFILE, payload: profileData });
  };
}
