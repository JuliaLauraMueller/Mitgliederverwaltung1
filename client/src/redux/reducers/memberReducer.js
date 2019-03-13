import { SEARCH_MEMBERS, FILTER_CIRCLES } from '../types/memberTypes';
import { MEMBERS_FETCHED } from '../types/memberTypes';
import levenshtein from 'js-levenshtein';

const MAX_LEVENSHTEIN_DISTANCE = 1;

const initialState = {
  searchText: '',
  filteredCities: [],
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

    let funktion = replaceUmlauts(m.function.toLowerCase()).substring(
      0,
      searchText.length + 2
    );

    let sector = replaceUmlauts(m.sector.toLowerCase()).substring(
      0,
      searchText.length + 2
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
        filteredCities: state.filteredCities,
        filteredMembers: filterMembers(
          filterCircles(state.members, state.filteredCities),
          action.payload
        )
      };
    case FILTER_CIRCLES:
      return {
        members: state.members,
        searchText: state.searchText,
        filteredCities: action.payload,
        filteredMembers: filterMembers(
          filterCircles(state.members, action.payload),
          state.searchText
        )
      };
    default:
      return state;
  }
}

//module.exports = { filterMembers };
