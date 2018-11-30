import { FETCH_PROFILE } from '../types/profileTypes';
import { PUT_PROFILE } from '../types/profileTypes';

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
