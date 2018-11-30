import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from '../types/alertTypes';

export const alertSuccess = message => dispatch => {
  dispatch({ type: ALERT_SUCCESS, payload: message });
};

export const alertError = message => dispatch => {
  dispatch({ type: ALERT_ERROR, payload: message });
};

export const alertClear = () => dispatch => {
  dispatch({ type: ALERT_CLEAR });
};
