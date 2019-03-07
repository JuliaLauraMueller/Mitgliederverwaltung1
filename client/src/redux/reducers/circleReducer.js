import { CIRCLES_FETCHED } from '../types/circleTypes';

const initialState = {
  circles: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CIRCLES_FETCHED:
      return {
        circles: [...action.payload]
      };
    default:
      return state;
  }
}
