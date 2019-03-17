import { CIRCLES_FETCHED, CIRCLE_DELETED } from '../types/circleTypes';

const initialState = {
  circles: []
};

function deleteCircle(circles, id) {
  return circles.filter(circle => {
    return circle._id != id;
  });
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CIRCLES_FETCHED:
      return {
        circles: [...action.payload]
      };
    case CIRCLE_DELETED:
      return {
        circles: deleteCircle(state.circles, action.payload)
      };
    default:
      return state;
  }
}
