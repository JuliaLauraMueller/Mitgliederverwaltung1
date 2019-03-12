import {
  PROFILE_USER_FETCHED,
  PROFILE_COMP_FETCHED,
  PUT_PROFILE
} from '../types/profileTypes';
import store from '../../helpers/store';
import profileService from '../../services/profileService';
import history from '../../helpers/history';
import { alertError } from './alertActions';

export const fetchProfile = id => dispatch => {
  profileService
    .getUserData(id)
    .then(res => {
      if (res) {
        dispatch({ type: PROFILE_USER_FETCHED, payload: res.member });
        return profileService.getCompanyData(res.member.company_id);
      }
    })
    .then(res => {
      if (res) {
        dispatch({ type: PROFILE_COMP_FETCHED, payload: res.member });
      }
    })
    .catch(err => {
      // couldn't load member
      history.push('/');
      store.dispatch(alertError('Profil konnte nicht geladen werden.'));
    });
};

export function putProfile(profileData) {
  var test = profileService.setUserData(profileData).then(res => {});

  return function(dispatch) {
    dispatch({ type: PUT_PROFILE, payload: profileData });
  };
}

export function putCompany(companyData) {
  var test = profileService.setCompanyData(companyData).then(res => {});
  return function(dispatch) {
    dispatch({ type: PUT_PROFILE, payload: companyData });
  };
}
