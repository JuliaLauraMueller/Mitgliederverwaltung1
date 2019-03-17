import {
  SEARCH_MEMBERS,
  FILTER_CIRCLES,
  MEMBER_DELETED
} from '../types/memberTypes';
import { MEMBERS_FETCHED } from '../types/memberTypes';
import levenshtein from 'js-levenshtein';

const MAX_LEVENSHTEIN_DISTANCE = 1;

const initialState = {
  searchText: '',
  filteredCircles: [],
  members: [],
  filteredMembers: []
};

function levenshteinInRange(searchText, matchingText) {
  if (levenshtein(searchText, matchingText) <= MAX_LEVENSHTEIN_DISTANCE) {
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
      searchText.length + MAX_LEVENSHTEIN_DISTANCE
    );

    let fullname = replaceUmlauts(
      m.firstname.concat(' ', m.surname).toLowerCase()
    ).substring(0, searchText.length);

    let company = replaceUmlauts(m.company.toLowerCase()).substring(
      0,
      searchText.length + MAX_LEVENSHTEIN_DISTANCE
    );

    let job = replaceUmlauts(m.job.toLowerCase()).substring(
      0,
      searchText.length + MAX_LEVENSHTEIN_DISTANCE
    );

    let funktion = replaceUmlauts(m.function.toLowerCase()).substring(
      0,
      searchText.length + MAX_LEVENSHTEIN_DISTANCE
    );

    let sector = replaceUmlauts(m.sector.toLowerCase()).substring(
      0,
      searchText.length + MAX_LEVENSHTEIN_DISTANCE
    );

    return (
      levenshteinInRange(searchText, surname) ||
      levenshteinInRange(searchText, fullname) ||
      levenshteinInRange(searchText, company) ||
      levenshteinInRange(searchText, job) ||
      levenshteinInRange(searchText, funktion) ||
      levenshteinInRange(searchText, sector)
    );
  });
}

function filterCircles(members, filteredCircles) {
  if (!filteredCircles || filteredCircles.length == 0) {
    return members;
  } else {
    return members.filter(m => {
      return filteredCircles.includes(m.circle);
    });
  }
}

function replaceUmlauts(text) {
  return text
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue');
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
          action.payload
        )
      };
    case FILTER_CIRCLES:
      return {
        members: state.members,
        searchText: state.searchText,
        filteredCircles: action.payload,
        filteredMembers: filterMembers(
          filterCircles(state.members, action.payload),
          state.searchText
        )
      };
    case MEMBER_DELETED:
      return {
        members: deleteMember(state.members, action.payload),
        searchText: state.searchText,
        filteredCircles: state.filteredCircles,
        filteredMembers: filterMembers(
          filterCircles(state.members, state.filteredCircles),
          state.searchText
        )
      };
    default:
      return state;
  }
}
