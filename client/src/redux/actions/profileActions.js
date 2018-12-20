import {
  PROFILE_USER_FETCHED,
  PROFILE_COMPLOC_FETCHED,
  PROFILE_COMP_FETCHED,
  PUT_PROFILE
} from '../types/profileTypes';
import profileService from '../../services/profileService';

export const fetchProfile = id => dispatch => {
  profileService
    .getUserData(id)
    .then(res => {
      if (res) {
        dispatch({ type: PROFILE_USER_FETCHED, payload: res.member });
        return profileService.getCompanyLocationData(res.member.company);
      }
    })
    .then(res => {
      if (res) {
        dispatch({ type: PROFILE_COMPLOC_FETCHED, payload: res.member });
        return profileService.getCompanyData(res.member.companyID);
      }
    })
    .then(res => {
      if (res) {
        dispatch({ type: PROFILE_COMP_FETCHED, payload: res.member });
      }
    });
};

export function putProfile(profileData) {
  return function(dispatch) {
    dispatch({ type: PUT_PROFILE, payload: profileData });
  };
}
