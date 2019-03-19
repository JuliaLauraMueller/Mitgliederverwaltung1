import {
  CIRCLES_FETCHED,
  PUT_CIRCLE,
  CIRCLE_DELETED,
  CREATE_CIRCLE
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

export const createCircle = circleData => async dispatch => {
  await circleService
    .createCircle(circleData)
    .then(res => {
      if (res && res.data.created) {
        dispatch({ type: CREATE_CIRCLE, payload: res.data.created });
      }
    })
    .catch(errorMessage => {
      return Promise.reject(errorMessage);
    });
};
