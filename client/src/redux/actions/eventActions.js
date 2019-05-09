import {
  EVENT_FETCHED,
  EVENT_DELETED,
  CREATE_EVENT,
  EVENTS_FETCHED,
  PUT_EVENT,
  SEARCH_EVENTS
} from '../types/eventTypes';

import { DATA_EVENT_FETCHED, DATA_EVENT_FETCHING } from '../types/loadingTypes';

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
  dispatch({ type: DATA_EVENT_FETCHING });
  eventService
    .getEventData(id)
    .then(res => {
      if (res) {
        dispatch({ type: EVENT_FETCHED, payload: res.event });
      }
      dispatch({ type: DATA_EVENT_FETCHED });
    })
    .catch(err => {
      // couldn't load member
      dispatch({ type: DATA_EVENT_FETCHED });
      history.push('/');
      store.dispatch(alertError('Event konnte nicht geladen werden.'));
    });
};

export const fetchEvents = () => dispatch => {
  dispatch({ type: DATA_EVENT_FETCHING });
  eventService.getEventBody().then(res => {
    if (res) {
      dispatch({ type: EVENTS_FETCHED, payload: res.events });
    }
    dispatch({ type: DATA_EVENT_FETCHED });
  });
};

export const deleteEvent = id => dispatch => {
  dispatch({ type: DATA_EVENT_FETCHING });
  eventService.deleteEvent(id).then(res => {
    if (res) {
      dispatch({ type: EVENT_DELETED, payload: res });
    }
    dispatch({ type: DATA_EVENT_FETCHED });
  });
};

export const createEvent = eventData => async dispatch => {
  dispatch({ type: DATA_EVENT_FETCHING });
  return await eventService
    .createEvent(eventData)
    .then(res => {
      if (res && res.data.created) {
        dispatch({ type: CREATE_EVENT, payload: res.data.created });
      }
      dispatch({ type: DATA_EVENT_FETCHED });
    })
    .catch(errorMessage => {
      dispatch({ type: DATA_EVENT_FETCHED });
      return Promise.reject(errorMessage);
    });
};

export const putEvent = eventData => async dispatch => {
  dispatch({ type: DATA_EVENT_FETCHING });
  return eventService
    .setEventData(eventData)
    .then(res => {
      if (res) {
        dispatch({ type: PUT_EVENT, payload: eventData });
      }
      dispatch({ type: DATA_EVENT_FETCHED });
    })
    .catch(errorMessage => {
      dispatch({ type: DATA_EVENT_FETCHED });
      return Promise.reject(errorMessage);
    });
};
