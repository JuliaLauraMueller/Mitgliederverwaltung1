import {
  SEARCH_MEMBERS,
  MEMBERS_FETCHED,
  FILTER_CIRCLES,
  MEMBER_DELETED
} from '../types/memberTypes';
import memberService from '../../services/memberService';

export const searchMembers = searchText => dispatch => {
  dispatch({ type: SEARCH_MEMBERS, payload: searchText });
};

export const filterCircles = filteredCircles => dispatch => {
  dispatch({ type: FILTER_CIRCLES, payload: filteredCircles });
};

export const fetchMembers = () => dispatch => {
  memberService.getUserBody().then(res => {
    if (res) {
      dispatch({ type: MEMBERS_FETCHED, payload: res.members });
    }
  });
};

export const deleteMember = id => dispatch => {
  memberService.deleteMember(id).then(res => {
    if (res) {
      dispatch({ type: MEMBER_DELETED, payload: res });
    }
  });
};
