import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import profileReducer from './profileReducer';
import navigationReducer from './navigationReducer';
import memberReducer from './memberReducer';
import circleReducer from './circleReducer';
import eventReducer from './eventReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  navigation: navigationReducer,
  member: memberReducer,
  circle: circleReducer,
  event: eventReducer,
  loading: loadingReducer
});
