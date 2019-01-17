import { SEARCH_MEMBERS } from '../actions/memberActions';

const initialState = {
  searchText: '',
  members: [
    {
      firstname: 'Steven',
      surname: 'Wüthrich',
      privateEmail: 'steven.wuethrich@fatpanda.io',
      privateTel: '079 234 56 89',
      profilepic: './img/marc_zimmermann.jpg'
    },

    {
      firstname: 'Marc',
      surname: 'Zimmermann',
      privateEmail: 'mz@fatpanda.io',
      privateTel: '079 254 56 89',
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
