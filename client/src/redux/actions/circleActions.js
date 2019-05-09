import {
  CIRCLES_FETCHED,
  PUT_CIRCLE,
  CIRCLE_DELETED,
  CREATE_CIRCLE
} from '../types/circleTypes';
import {
  DATA_CIRCLE_FETCHED,
  DATA_CIRCLE_FETCHING
} from '../types/loadingTypes';
import circleService from '../../services/circleService';

export const fetchCircles = () => dispatch => {
  dispatch({ type: DATA_CIRCLE_FETCHING });
  circleService.getCircles().then(res => {
    if (res) {
      dispatch({ type: CIRCLES_FETCHED, payload: res.circles });
    }
    dispatch({ type: DATA_CIRCLE_FETCHED });
  });
};

export const putCircle = circleData => async dispatch => {
  dispatch({ type: DATA_CIRCLE_FETCHING });
  return circleService
    .setCircleData(circleData)
    .then(res => {
      if (res) {
        dispatch({ type: PUT_CIRCLE, payload: circleData });
      }
      dispatch({ type: DATA_CIRCLE_FETCHED });
    })
    .catch(errorMessage => {
      dispatch({ type: DATA_CIRCLE_FETCHED });
      return Promise.reject(errorMessage);
    });
};

export const deleteCircle = id => dispatch => {
  dispatch({ type: DATA_CIRCLE_FETCHING });
  circleService.deleteCircle(id).then(res => {
    if (res) {
      dispatch({ type: CIRCLE_DELETED, payload: res });
    }
    dispatch({ type: DATA_CIRCLE_FETCHED });
  });
};

export const createCircle = circleData => async dispatch => {
  dispatch({ type: DATA_CIRCLE_FETCHING });
  return await circleService
    .createCircle(circleData)
    .then(res => {
      if (res && res.data.created) {
        dispatch({ type: CREATE_CIRCLE, payload: res.data.created });
      }
      dispatch({ type: DATA_CIRCLE_FETCHED });
    })
    .catch(errorMessage => {
      dispatch({ type: DATA_CIRCLE_FETCHED });
      return Promise.reject(errorMessage);
    });
};
