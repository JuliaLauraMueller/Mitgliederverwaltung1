import { MEMBERS_FETCHED } from '../types/memberTypes';
import memberService from '../../services/memberService';

export const SEARCH_MEMBERS = 'members: searchMembers';

export const searchMembers = searchText => dispatch => {
  dispatch({ type: SEARCH_MEMBERS, payload: searchText });
};

export const fetchMembers = () => dispatch => {
  memberService.getUserBody().then(res => {
    if (res) {
      dispatch({ type: MEMBERS_FETCHED, payload: res.members });
    }
  });
};
