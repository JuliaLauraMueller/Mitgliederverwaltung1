import {
  EVENT_FETCHED,
  EVENT_DELETED,
  CREATE_EVENT,
  EVENTS_FETCHED,
  PUT_EVENT,
  SEARCH_EVENTS
} from '../types/eventTypes';
import eventService from '../../services/eventService';
import store from '../../helpers/store';
import history from '../../helpers/history';
import { alertError } from './alertActions';

export const searchEvents = (searchText, pastEventsIncluded) => dispatch => {
  dispatch({
    type: SEARCH_EVENTS,
    payload: { searchText, pastEventsIncluded }
  });
};

export const fetchEvent = id => dispatch => {
  eventService
    .getEventData(id)
    .then(res => {
      if (res) {
        dispatch({ type: EVENT_FETCHED, payload: res.event });
      }
    })
    .catch(err => {
      // couldn't load member
      history.push('/');
      store.dispatch(alertError('Event konnte nicht geladen werden.'));
    });
};

export const fetchEvents = () => dispatch => {
  eventService.getEventBody().then(res => {
    if (res) {
      dispatch({ type: EVENTS_FETCHED, payload: res.events });
    }
  });
};

export const deleteEvent = id => dispatch => {
  eventService.deleteEvent(id).then(res => {
    if (res) {
      dispatch({ type: EVENT_DELETED, payload: res });
    }
  });
};

export const createEvent = eventData => async dispatch => {
  return await eventService
    .createEvent(eventData)
    .then(res => {
      if (res && res.data.created) {
        dispatch({ type: CREATE_EVENT, payload: res.data.created });
      }
    })
    .catch(errorMessage => {
      return Promise.reject(errorMessage);
    });
};

export const putEvent = eventData => async dispatch => {
  return eventService
    .setEventData(eventData)
    .then(res => {
      if (res) {
        dispatch({ type: PUT_EVENT, payload: eventData });
      }
    })
    .catch(errorMessage => {
      return Promise.reject(errorMessage);
    });
};
