import { SEARCH_MEMBERS } from '../actions/memberActions';
import levenshtein from 'js-levenshtein';

const initialState = {
  searchText: '',
  members: [
    {
      _id: '5bfe7e0c7d3e650398e3e6d8',
      firstname: 'Peter',
      surname: 'Götti',
      privateEmail: 'steven.wuethrich@fatpanda.io',
      privateTel: '079 234 56 89'
    },
    {
      _id: '5bfe83680108860398a433a1',
      firstname: 'Marc',
      surname: 'Zimmermann',
      privateEmail: 'mz@fatpanda.io',
      privateTel: '079 254 56 89'
    },
    {
      _id: '5bfe844f0108860398a433a2',
      firstname: 'User3',
      surname: 'User3Surname',
      privateEmail: 'rg@fatpanda.io',
      privateTel: '079 236 92 79'
    },
    {
      firstname: 'Renato',
      surname: 'Gnocchi',
      privateEmail: 'rg@fatpanda.io',
      privateTel: '079 236 92 79'
    },
    {
      firstname: 'Steven',
      surname: 'Wüthrich',
      privateEmail: 'sw@fatpanda.io',
      privateTel: '079 234 56 89'
    },
    {
      firstname: 'Marc',
      surname: 'Zimmermann',
      privateEmail: 'mz@fatpanda.io',
      privateTel: '079 254 56 89'
    }
  ],
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
    case SEARCH_MEMBERS:
      return {
        members: state.members,
        filteredMembers: filterMembers(state.members, action.payload)
      };
    default:
      return state;
  }
}
