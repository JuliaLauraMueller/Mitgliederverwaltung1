import { SEARCH_MEMBERS } from '../actions/memberActions';
import { MEMBERS_FETCHED } from '../types/memberTypes';

const initialState = {
  searchText: '',
  members: [],
  filteredMembers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MEMBERS_FETCHED:
      return {
        members: [...action.payload]
      };
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
