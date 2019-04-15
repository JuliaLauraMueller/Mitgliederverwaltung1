import {
  EVENT_DELETED,
  CREATE_EVENT,
  EVENTS_FETCHED,
  PUT_EVENT
} from '../types/eventTypes';
import eventService from '../../services/eventService';

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
