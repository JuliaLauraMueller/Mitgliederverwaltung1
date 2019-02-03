import { MEMBERS_FETCHED } from '../types/memberTypes';
import memberService from '../../services/memberService';

export const SEARCH_MEMBERS = 'members: searchMembers';

export const searchMembers = searchText => dispatch => {
  dispatch({ type: SEARCH_MEMBERS, payload: searchText });
};

export const fetchMembers = () => dispatch => {
  memberService.getUserBody().then(res => {
    console.log('RES: ');
    if (res) {
      console.log(res.members);
      //return res.members;
      dispatch({ type: MEMBERS_FETCHED, payload: res.members });
    }
  });
};
