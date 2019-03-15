import { CIRCLES_FETCHED } from '../types/circleTypes';
import circleService from '../../services/circleService';

export const fetchCircles = () => dispatch => {
  circleService.getCircles().then(res => {
    if (res) {
      dispatch({ type: CIRCLES_FETCHED, payload: res.circles });
    }
  });
};
