import { FETCH_PROFILE } from '../types/profileTypes';
import { PUT_PROFILE } from '../types/profileTypes';
import profileService from '../../services/profileService';

export const fetchProfile = id => dispatch => {
  var userData = profileService.getUserData().then(res => {
    //console.log(res);
  });
  //console.log(userData);
  //UserData is a promise
  var companyLocationData = profileService.getCompanyLocationData(
    userData.company
  );
  var companyData = profileService.getCompanyData(companyLocationData.company);

  dispatch({ type: FETCH_PROFILE });
};

export function putProfile(profileData) {
  return function(dispatch) {
    // add axios request
    dispatch({ type: PUT_PROFILE, payload: profileData });
  };
}
