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
  searchText = replaceUmlauts(searchText.toLowerCase());

  return members.filter(m => {
    let surname = replaceUmlauts(m.surname.toLowerCase()).substring(
      0,
      searchText.length + 2
    );

    let fullname = replaceUmlauts(
      m.firstname.concat(' ', m.surname).toLowerCase()
    ).substring(0, searchText.length);

    let company = replaceUmlauts(m.company.toLowerCase()).substring(
      0,
      searchText.length + 2
    );

    let job = replaceUmlauts(m.job.toLowerCase()).substring(
      0,
      searchText.length + 2
    );

    return (
      levenshteinInRange(searchText, surname) ||
      levenshteinInRange(searchText, fullname) ||
      levenshteinInRange(searchText, company) ||
      levenshteinInRange(searchText, job)
    );
  });
}

function replaceUmlauts(text) {
  return text
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue');
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
        filteredMembers: filterMembers(state.members, action.payload)
      };
    default:
      return state;
  }
}
