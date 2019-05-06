import {
  SEARCH_EVENTS,
  EVENT_FETCHED,
  EVENT_DELETED,
  CREATE_EVENT,
  EVENTS_FETCHED,
  PUT_EVENT,
  ADD_ATTENDEE,
  REMOVE_ATTENDEE
} from '../types/eventTypes';
import { filterEvents } from '../../helpers/eventsSearch';

const initialState = {
  events: [],
  filteredEvents: [],
  fetchedEvent: {}
};

function getUpdatedEvents(events, updatedEvent) {
  let index = events.findIndex(event => event._id === updatedEvent._id);
  events[index].title = updatedEvent.title;
  events[index].image = updatedEvent.image;
  events[index].description = updatedEvent.description;
  events[index].circles = updatedEvent.circles;
  events[index].circleValues = updatedEvent.circleValues;
  events[index].date = updatedEvent.date;
  events[index].startTime = updatedEvent.startTime;
  events[index].endTime = updatedEvent.endTime;
  events[index].location = updatedEvent.location;
  events[index].organisationTeam = updatedEvent.organisationTeam;
  events[index].registrationEndDate = updatedEvent.registrationEndDate;
  events[index].permittedRoles = updatedEvent.permittedRoles;
  return events;
}

function deleteEvent(events, id) {
  return events.filter(event => {
    return event._id !== id;
  });
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_EVENTS:
      return {
        events: state.events,
        searchText: action.payload,
        fetchedEvent: state.fetchedEvent,
        filteredEvents: filterEvents(
          state.events,
          action.payload.searchText,
          action.payload.pastEventsIncluded
        )
      };
    case EVENT_FETCHED:
      return {
        events: state.events,
        filteredEvents: state.filteredEvents,
        fetchedEvent: action.payload
      };
    case EVENTS_FETCHED:
      return {
        events: [...action.payload],
        filteredEvents: filterEvents(action.payload, '', false),
        fetchedEvent: state.fetchedEvent
      };
    case EVENT_DELETED:
      return {
        events: deleteEvent(state.events, action.payload),
        filteredEvents: state.filteredEvents,
        fetchedEvent: state.fetchedEvent
      };
    case CREATE_EVENT:
      return {
        events: [...state.events, action.payload],
        filteredEvents: state.filteredEvents,
        fetchedEvent: state.fetchedEvent
      };
    case PUT_EVENT:
      return {
        events: [...getUpdatedEvents(state.events, action.payload)],
        fetchedEvent: state.fetchedEvent
      };
    case ADD_ATTENDEE:
      return {
        events: [...getUpdatedEvents(state.events, action.payload)],
        fetchedEvent: state.fetchedEvent
      };
    case REMOVE_ATTENDEE:
      return {
        events: [...getUpdatedEvents(state.events, action.payload)],
        fetchedEvent: state.fetchedEvent
      };
    default:
      return state;
  }
}
