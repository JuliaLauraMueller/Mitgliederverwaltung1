import {
  SEARCH_MEMBERS,
  FILTER_CIRCLES,
  MEMBER_DELETED,
  CREATE_MEMBER,
  ROLE_CHANGE
} from '../types/memberTypes';
import { MEMBERS_FETCHED } from '../types/memberTypes';
import { filterMembers, filterByCircles } from '../../helpers/memberSearch';

const initialState = {
  searchText: '',
  filteredCircles: [],
  members: [],
  filteredMembers: []
};

function deleteMember(members, id) {
  return members.filter(member => {
    return member._id != id;
  });
}

function getUpdatedMembers(members, updatedMember) {
  let index = members.findIndex(member => member._id == updatedMember._id);
  members[index].role = updatedMember.role;
  return members;
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
          filterByCircles(state.members, state.filteredCircles),
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
          filterByCircles(state.members, action.payload),
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
          filterByCircles(state.members, state.filteredCircles),
          state.searchText,
          false
        )
      };
    case CREATE_MEMBER:
      return {
        members: [...state.members, action.payload],
        searchText: state.searchText,
        filteredCircles: state.filteredCircles,
        filteredMembers: filterMembers(
          filterByCircles(state.members, state.filteredCircles),
          state.searchText,
          false
        )
      };
    case ROLE_CHANGE:
      return {
        members: [...getUpdatedMembers(state.members, action.payload)],
        searchText: state.searchText,
        filteredCircles: state.filteredCircles,
        filteredMembers: filterMembers(
          filterByCircles(state.members, state.filteredCircles),
          state.searchText,
          false
        )
      };
    default:
      return state;
  }
}
