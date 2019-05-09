import {
  PROFILE_USER_FETCHED,
  PROFILE_COMP_FETCHED,
  PUT_PROFILE
} from '../types/profileTypes';

import { DATA_FETCHED, DATA_FETCHING } from '../types/loadingTypes';
import store from '../../helpers/store';
import profileService from '../../services/profileService';
import history from '../../helpers/history';
import { alertError } from './alertActions';
import { updateNavUserdata } from './navigationActions';

export const fetchProfile = id => dispatch => {
  dispatch({ type: DATA_FETCHING });
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
      dispatch({ type: DATA_FETCHED });
    })
    .catch(err => {
      // couldn't load member
      dispatch({ type: DATA_FETCHED });
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

export const putWholeData = data => async dispatch => {
  var profileMainData = data.profileMainData;
  var profileBasicData = data.profileBasicData;
  var companyData = data.companyData;
  Object.assign(profileMainData, profileBasicData);
  dispatch({ type: DATA_FETCHING });
  return await profileService
    .setUserData(profileMainData, companyData)
    .then(user => {
      profileBasicData.xingLink = user.xingLink;
      profileBasicData.linkedinLink = user.linkedinLink;
      profileBasicData.facebookLink = user.facebookLink;
      profileBasicData.instagramLink = user.instagramLink;

      dispatch({ type: PUT_PROFILE, payload: profileBasicData });
      companyData.company = companyData.companyName;
      delete companyData.companyName;
      dispatch({ type: PUT_PROFILE, payload: companyData });
      dispatch({ type: DATA_FETCHED });

      if (store.getState().auth.user._id === profileBasicData._id) {
        var navbarData = {
          firstname: profileMainData.firstname,
          surname: profileMainData.surname,
          avatar: profileMainData.avatar,
          avatarTag: profileMainData.avatarTag
        };
        store.dispatch(updateNavUserdata(navbarData));
      }
    })
    .catch(error => {
      dispatch({ type: DATA_FETCHED });
      return Promise.reject(error);
    });
};
