import { CIRCLES_FETCHED, PUT_CIRCLE } from '../types/circleTypes';

const initialState = {
  circles: []
};

function getUpdatedCircles(circles, updatedCircle) {
  let index = circles.findIndex(circle => circle._id == updatedCircle._id);
  circles[index].name = updatedCircle.name;
  return circles;
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CIRCLES_FETCHED:
      return {
        circles: [...action.payload]
      };
    case PUT_CIRCLE:
      return {
        circles: [...getUpdatedCircles(state.circles, action.payload)]www
      };
    default:
      return state;
  }
}
