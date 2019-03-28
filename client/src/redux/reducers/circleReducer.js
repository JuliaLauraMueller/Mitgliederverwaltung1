import {
  CIRCLES_FETCHED,
  PUT_CIRCLE,
  CIRCLE_DELETED,
  CREATE_CIRCLE
} from '../types/circleTypes';

const initialState = {
  circles: []
};

function getUpdatedCircles(circles, updatedCircle) {
  let index = circles.findIndex(circle => circle._id == updatedCircle._id);
  circles[index].name = updatedCircle.name;
  return circles;
}

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
    case PUT_CIRCLE:
      return {
        circles: [...getUpdatedCircles(state.circles, action.payload)]
      };
    case CIRCLE_DELETED:
      return {
        circles: deleteCircle(state.circles, action.payload)
      };
    case CREATE_CIRCLE:
      return {
        circles: [...state.circles, action.payload]
      };
    default:
      return state;
  }
}
