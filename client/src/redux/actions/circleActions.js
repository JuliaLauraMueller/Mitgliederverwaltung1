import { CIRCLES_FETCHED, CIRCLE_DELETED } from '../types/circleTypes';
import circleService from '../../services/circleService';

export const fetchCircles = () => dispatch => {
  circleService.getCircles().then(res => {
    if (res) {
      dispatch({ type: CIRCLES_FETCHED, payload: res.circles });
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
