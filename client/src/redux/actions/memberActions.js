export const SEARCH_MEMBERS = 'members: searchMembers';

export const searchMembers = searchText => dispatch => {
  dispatch({ type: SEARCH_MEMBERS, payload: searchText });
};
