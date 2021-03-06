import {
  SEARCH_MEMBERS,
  MEMBERS_FETCHED,
  FILTER_CIRCLES,
  MEMBER_DELETED,
  CREATE_MEMBER,
  ROLE_CHANGE
} from '../types/memberTypes';

import {
  DATA_MEMBER_FETCHED,
  DATA_MEMBER_FETCHING
} from '../types/loadingTypes';

import memberService from '../../services/memberService';

export const searchMembers = searchText => dispatch => {
  dispatch({ type: SEARCH_MEMBERS, payload: searchText });
};

export const filterCircles = filteredCircles => dispatch => {
  dispatch({ type: FILTER_CIRCLES, payload: filteredCircles });
};

export const fetchMembers = () => dispatch => {
  dispatch({ type: DATA_MEMBER_FETCHING });
  memberService.getUserBody().then(res => {
    if (res) {
      dispatch({ type: MEMBERS_FETCHED, payload: res.members });
    }
    dispatch({ type: DATA_MEMBER_FETCHED });
  });
};

export const deleteMember = id => dispatch => {
  dispatch({ type: DATA_MEMBER_FETCHING });
  memberService.deleteMember(id).then(res => {
    if (res) {
      dispatch({ type: MEMBER_DELETED, payload: res });
    }
    dispatch({ type: DATA_MEMBER_FETCHED });
  });
};

export const createMember = memberData => async dispatch => {
  dispatch({ type: DATA_MEMBER_FETCHING });
  return await memberService
    .createMember(memberData)
    .then(res => {
      if (res && res.data.created) {
        dispatch({ type: CREATE_MEMBER, payload: res.data.created });
      }
      dispatch({ type: DATA_MEMBER_FETCHED });
    })
    .catch(errorMessage => {
      dispatch({ type: DATA_MEMBER_FETCHED });
      return Promise.reject(errorMessage);
    });
};

export const changeRole = memberData => async dispatch => {
  dispatch({ type: DATA_MEMBER_FETCHING });
  return await memberService
    .changeRole(memberData)
    .then(res => {
      if (res) {
        dispatch({ type: ROLE_CHANGE, payload: memberData });
      }
      dispatch({ type: DATA_MEMBER_FETCHED });
    })
    .catch(errorMessage => {
      dispatch({ type: DATA_MEMBER_FETCHED });
      return Promise.reject(errorMessage);
    });
};
