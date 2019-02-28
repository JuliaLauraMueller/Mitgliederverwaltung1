import { SEARCH_MEMBERS } from '../actions/memberActions';
import { MEMBERS_FETCHED } from '../types/memberTypes';
import levenshtein from 'js-levenshtein';

const initialState = {
  searchText: '',
  members: [],
  filteredMembers: []
};

function levenshteinInRange(searchText, matchingText) {
  if (levenshtein(searchText, matchingText) < 3) {
    return true;
  }
}

function filterMembers(members, searchText) {
  if (!searchText || searchText.length == 0) {
    return members;
  }

  return members.filter(m => {
    let firstname = m.firstname
      .substring(0, searchText.length + 2)
      .toLowerCase();

    return levenshteinInRange(searchText.toLowerCase(), firstname);
  });
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MEMBERS_FETCHED:
      return {
        members: [...action.payload]
      };
    case SEARCH_MEMBERS:
      return {
        members: state.members,
        filteredMembers: filterMembers(state.members, action.payload)
      };
    default:
      return state;
  }
}
