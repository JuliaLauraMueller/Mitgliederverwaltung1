import {
  SEARCH_MEMBERS,
  FILTER_CIRCLES,
  MEMBER_DELETED
} from '../types/memberTypes';
import { MEMBERS_FETCHED } from '../types/memberTypes';
import filterMembers from '../../helpers/memberSearch';

const initialState = {
  searchText: '',
  filteredCircles: [],
  members: [],
  filteredMembers: []
};

function filterCircles(members, filteredCircles) {
  if (!filteredCircles || filteredCircles.length == 0) {
    return members;
  } else {
    return members.filter(m => {
      return filteredCircles.includes(m.circle ? m.circle._id : '');
    });
  }
}

function deleteMember(members, id) {
  return members.filter(member => {
    return member._id != id;
  });
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MEMBERS_FETCHED:
      return {
        members: [...action.payload],
        filteredMembers: [...action.payload]
      };
    case SEARCH_MEMBERS:
      return {
        members: state.members,
        searchText: action.payload,
        filteredCircles: state.filteredCircles,
        filteredMembers: filterMembers(
          filterCircles(state.members, state.filteredCircles),
          action.payload,
          false
        )
      };
    case FILTER_CIRCLES:
      return {
        members: state.members,
        searchText: state.searchText,
        filteredCircles: action.payload,
        filteredMembers: filterMembers(
          filterCircles(state.members, action.payload),
          state.searchText,
          false
        )
      };
    case MEMBER_DELETED:
      return {
        members: deleteMember(state.members, action.payload),
        searchText: state.searchText,
        filteredCircles: state.filteredCircles,
        filteredMembers: filterMembers(
          filterCircles(state.members, state.filteredCircles),
          state.searchText,
          false
        )
      };
    default:
      return state;
  }
}
