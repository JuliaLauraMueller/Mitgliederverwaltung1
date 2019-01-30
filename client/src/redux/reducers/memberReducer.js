import { SEARCH_MEMBERS } from '../actions/memberActions';

const initialState = {
  searchText: '',
  members: [
    {
      _id: '5bfe7e0c7d3e650398e3e6d8',
      firstname: 'Peter',
      surname: 'Götti',
      privateEmail: 'steven.wuethrich@fatpanda.io',
      privateTel: '079 234 56 89',
      profilepic: './img/marc_zimmermann.jpg'
    },
    {
      _id: '5bfe83680108860398a433a1',
      firstname: 'Marc',
      surname: 'Zimmermann',
      privateEmail: 'mz@fatpanda.io',
      privateTel: '079 254 56 89',
      profilepic: './img/marc_zimmermann.jpg'
    },
    {
      _id: '5bfe844f0108860398a433a2',
      firstname: 'User3',
      surname: 'User3Surname',
      privateEmail: 'rg@fatpanda.io',
      privateTel: '079 236 92 79',
      profilepic: './img/marc_zimmermann.jpg'
    },
    {
      firstname: 'Renato',
      surname: 'Gnocchi',
      privateEmail: 'rg@fatpanda.io',
      privateTel: '079 236 92 79',
      profilepic: './img/marc_zimmermann.jpg'
    },
    {
      firstname: 'Steven',
      surname: 'Wüthrich',
      privateEmail: 'sw@fatpanda.io',
      privateTel: '079 234 56 89',
      profilepic: './img/marc_zimmermann.jpg'
    },
    {
      firstname: 'Marc',
      surname: 'Zimmermann',
      privateEmail: 'mz@fatpanda.io',
      privateTel: '079 254 56 89',
      profilepic: './img/marc_zimmermann.jpg'
    }
  ],
  filteredMembers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MEMBERS:
      return {
        members: state.members,
        filteredMembers: state.members.filter(m =>
          m.firstname
            .concat(' ', m.surname)
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        )
      };
    default:
      return state;
  }
}
