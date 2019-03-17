import {
  CIRCLES_FETCHED,
  PUT_CIRCLE,
  CIRCLE_DELETED
} from '../types/circleTypes';
import circleService from '../../services/circleService';

export const fetchCircles = () => dispatch => {
  circleService.getCircles().then(res => {
    if (res) {
      dispatch({ type: CIRCLES_FETCHED, payload: res.circles });
    }
  });
};

export const putCircle = circleData => dispatch => {
  circleService.setCircleData(circleData).then(res => {
    if (res) {
      dispatch({ type: PUT_CIRCLE, payload: circleData });
    }
  });
};

export const deleteCircle = id => dispatch => {
  circleService.deleteCircle(id).then(res => {
    if (res) {
      dispatch({ type: CIRCLE_DELETED, payload: res });
    }
  });
};
