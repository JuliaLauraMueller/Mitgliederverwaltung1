import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import profileReducer from './profileReducer';
import navigationReducer from './navigationReducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  navigation: navigationReducer
});
