import { DATA_FETCHING, DATA_FETCHED } from '../types/loadingTypes';

const initialState = { isLoading: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case DATA_FETCHED:
      return {
        isLoading: false
      };
    case DATA_FETCHING:
      return {
        isLoading: true
      };
    default:
      return state;
  }
}
