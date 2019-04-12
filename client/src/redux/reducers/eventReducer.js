import {
  EVENT_DELETED,
  CREATE_EVENT,
  EVENTS_FETCHED,
  PUT_EVENT
} from '../types/eventTypes';

const initialState = {
  events: []
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
    case EVENTS_FETCHED:
      return {
        events: [...action.payload]
      };
    case EVENT_DELETED:
      return {
        events: deleteEvent(state.events, action.payload)
      };
    case CREATE_EVENT:
      return {
        events: [...state.events, action.payload]
      };
    case PUT_EVENT:
      return {
        events: [...getUpdatedEvents(state.circles, action.payload)]
      };
    default:
      return state;
  }
}
