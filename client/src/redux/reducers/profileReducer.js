import {
  PROFILE_USER_FETCHED,
  PROFILE_COMP_FETCHED,
  PUT_PROFILE,
  FETCH_PROFILE
} from '../types/profileTypes';

const initialState = { member: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return state;
    case PUT_PROFILE:
      delete action.payload._id;
      return {
        member: { ...state.member, ...action.payload }
      };
    case PROFILE_USER_FETCHED:
      return {
        member: { ...state.member, ...action.payload }
      };
    case PROFILE_COMP_FETCHED:
      return {
        member: { ...state.member, ...action.payload }
      };
    default:
      return state;
  }
}
