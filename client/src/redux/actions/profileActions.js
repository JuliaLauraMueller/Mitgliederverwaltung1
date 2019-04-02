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
  //profileService.setUserData(profileData);

  return function(dispatch) {
    dispatch({ type: PUT_PROFILE, payload: profileData });
  };
}

export function putCompany(companyData) {
  var result = profileService.setCompanyData(companyData);
  if (result) {
    companyData.company = companyData.companyName;
  }
  return function(dispatch) {
    dispatch({ type: PUT_PROFILE, payload: companyData });
  };
}

/*
export const putWholeData = data => async dispatch => {
  var profileMainData = data.profileMainData;
  var profileBasicData = data.profileBasicData;
  var companyData = data.companyData;

  Object.assign(profileMainData, profileBasicData);
  return await profileService
    .setUserData(profileMainData, companyData)
    .then(res => {
      console.log(res);
      console.log(profileMainData);
      console.log(companyData);

      dispatch({ type: PUT_PROFILE, payload: profileMainData });
      //dispatch({ type: PUT_PROFILE, payload: companyData });
    })
    .catch(error => {
      return Promise.reject(error);
    });
};
*/

export const putWholeData = data => async dispatch => {
  var profileMainData = data.profileMainData;
  var profileBasicData = data.profileBasicData;
  var companyData = data.companyData;
  Object.assign(profileMainData, profileBasicData);

  return await profileService
    .setUserData(profileMainData, companyData)
    .then(res => {
      dispatch({ type: PUT_PROFILE, payload: profileMainData });
      dispatch({ type: PUT_PROFILE, payload: companyData });
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

/*
export async function putWholeData(
  profileMainData,
  profileBasicData,
  companyData
) {
  Object.assign(profileMainData, profileBasicData);

  return await profileService
    .setUserData(profileMainData, companyData)
    .then(res => {
      console.log(res);
      console.log(profileBasicData);
      return function(dispatch) {
        dispatch({ type: PUT_PROFILE, payload: profileBasicData });
        //dispatch({ type: PUT_PROFILE, payload: companyData });
      };
    })
    .catch(error => {
      return Promise.reject(error);
    });
    */

/*
    return await function(dispatch) {
    profileService
      .setUserData(profileMainData, companyData)
      .then(res => {
        console.log(res);
        console.log(profileMainData);
        console.log(companyData);
        dispatch({ type: PUT_PROFILE, payload: profileMainData });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
*/
