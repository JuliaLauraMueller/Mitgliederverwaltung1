//import { filterMembers, filterByCircles } from './eventsSearch';
import { filterEvents } from './eventsSearch';

const event1 = {
  _id: '1',
  title: 'Bierabend Bern',
  circles: {
    _id: 'BE',
    name: 'Bern'
  }
};

const event2 = {
  _id: '2',
  title: 'Bierabend Bern',
  circles: {
    _id: 'BE',
    name: 'Bern'
  }
};

const event3 = {
  _id: '3',
  title: 'Networking',
  circles: {
    _id: 'ZH',
    name: 'Zürich'
  }
};

const event4 = {
  _id: '4',
  title: 'Teamevent alle Mitglieder',
  circles: [
    {
      _id: 'BE',
      name: 'Bern'
    },
    {
      _id: 'ZH',
      name: 'Zürich'
    },
    {
      _id: 'SG',
      name: 'St.Gallen'
    }
  ]
};
const eventsFromMockDB = [event1, event2, event3];

describe('Test if the searchfilter filters the expected events', () => {
  test('search for event Bierabend Bern', () => {
    let filteredEvents = eventsFromMockDB;
    filteredEvents = filterEvents(filteredEvents, 'Bierabend Bern');
    expect(filteredEvents.length).toEqual(2);
    expect(filteredEvents.includes(event1)).toBe(true);
    expect(filteredEvents.includes(event2)).toBe(true);
  });

  test('search for Networking with 1 wrong char', () => {
    let filteredEvents = eventsFromMockDB;
    filteredEvents = filterEvents(filteredEvents, 'Netwoeking');
    expect(filteredEvents.length).toEqual(1);
    expect(filteredEvents.includes(event3)).toBe(true);
  });

  test('search for Networking with 2 wrong char', () => {
    let filteredEvents = eventsFromMockDB;
    filteredEvents = filterEvents(filteredEvents, 'Netwoekieg');
    expect(filteredEvents.length).toEqual(0);
  });

  test('search for Networking with uncompleted searchtext', () => {
    let filteredEvents = eventsFromMockDB;
    filteredEvents = filterEvents(filteredEvents, 'Network');
    expect(filteredEvents.length).toEqual(1);
    expect(filteredEvents.includes(event3)).toBe(true);
  });

  test('search for Networking with uncompleted searchtext and 1 wrong char', () => {
    let filteredEvents = eventsFromMockDB;
    filteredEvents = filterEvents(filteredEvents, 'Netwoek');
    expect(filteredEvents.length).toEqual(1);
    expect(filteredEvents.includes(event3)).toBe(true);
  });

  test('searching with an empty searchtext', () => {
    let filteredEvents = eventsFromMockDB;
    filteredEvents = filterEvents(filteredEvents, '');
    expect(filteredEvents.length).toEqual(eventsFromMockDB.length);
  });

  test('searching for nonexistant entry', () => {
    let filteredEvents = eventsFromMockDB;
    filteredEvents = filterEvents(filteredEvents, 'jihdshfhgfdhüqsq');
    expect(filteredEvents.length).toEqual(0);
  });
});
