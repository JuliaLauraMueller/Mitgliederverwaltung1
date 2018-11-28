import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from '../types/alertTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        type: 'success',
        message: action.payload
      };
    case ALERT_ERROR:
      return {
        type: 'danger',
        message: action.payload
      };
    case ALERT_CLEAR:
      return {};
    default:
      return state;
  }
}
