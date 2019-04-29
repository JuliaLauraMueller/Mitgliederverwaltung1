import { filterEvents } from './eventsSearch';

const event1 = {
  _id: '1',
  title: 'Bierabend Bern',
  date: '2020-09-10',
  circleValues: [
    {
      _id: 'BE',
      name: 'Bern'
    }
  ]
};

const event2 = {
  _id: '2',
  title: 'Bierabend Bern',
  date: '2020-09-10',
  circleValues: [
    {
      _id: 'BE',
      name: 'Bern'
    }
  ]
};

const event3 = {
  _id: '3',
  title: 'Networking',
  date: '2020-09-10',
  circleValues: [
    {
      _id: 'ZH',
      name: 'Zürich'
    }
  ]
};

const event4 = {
  _id: '4',
  title: 'Startup Day',
  date: '2010-09-10',
  circleValues: [
    {
      _id: 'ZH',
      name: 'Zürich'
    }
  ]
};

const event5 = {
  _id: '5',
  title: 'Teamevent alle Mitglieder',
  date: '2020-09-10',
  circleValues: [
    {
      _id: 'GE',
      name: 'Genf'
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

const eventsFromMockDB = [event1, event2, event3, event4, event5];

describe('Test if the searchfilter filters the expected events', () => {
  test('filters for expected circles', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'Bern');
    expect(filteredEvents.length).toEqual(2);
    expect(filteredEvents.includes(event1)).toBe(true);
    expect(filteredEvents.includes(event2)).toBe(true);
  });

  test('filters for multiple cities', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'Genf');
    expect(filteredEvents.length).toEqual(1);
    expect(filteredEvents.includes(event5)).toBe(true);
    filteredEvents = filterEvents(eventsFromMockDB, 'St.Gallen');
    expect(filteredEvents.length).toEqual(1);
    expect(filteredEvents.includes(event5)).toBe(true);
  });

  test('search for event Bierabend Bern', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'Bierabend Bern');
    expect(filteredEvents.length).toEqual(2);
    expect(filteredEvents.includes(event1)).toBe(true);
    expect(filteredEvents.includes(event2)).toBe(true);
  });

  test('search for Networking with 1 wrong char', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'Cetworki');
    expect(filteredEvents.length).toEqual(1);
    expect(filteredEvents.includes(event3)).toBe(true);
  });

  test('search for Networking with 2 wrong char', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'Netwoekiig');
    expect(filteredEvents.length).toEqual(0);
  });

  test('search for company title Bierabend with uncompleted searchtext', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'Bie');
    expect(filteredEvents.length).toEqual(2);
  });

  test('search for title networking with uncompleted searchtext and 1 wrong char', () => {
    let filteredMembers = filterEvents(eventsFromMockDB, 'Netwe');
    expect(filteredMembers.length).toEqual(1);
  });

  test('search for Networking with uncompleted searchtext', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'Network');
    expect(filteredEvents.length).toEqual(1);
    expect(filteredEvents.includes(event3)).toBe(true);
  });

  test('show past event (Startup Day) if pastEventIncluded is true', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'Startup Day', true);
    expect(filteredEvents.length).toEqual(1);
    expect(filteredEvents.includes(event4)).toBe(true);
  });

  test('hide past event (Startup Day)', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'Startup Day');
    expect(filteredEvents.length).toEqual(0);
    expect(filteredEvents.includes(event4)).toBe(false);
  });

  test('show all events including past ones', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, '', true);
    expect(filteredEvents.length).toEqual(5);
  });

  test('show all events from Zurich excluding past ones', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'Zürich', true);
    expect(filteredEvents.includes(event3)).toBe(true);
    expect(filteredEvents.includes(event4)).toBe(true);
    expect(filteredEvents.includes(event5)).toBe(true);
  });

  test('searching with an empty searchtext', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, '');
    expect(filteredEvents.length).toEqual(eventsFromMockDB.length);
  });

  test('searching for nonexistant entry', () => {
    let filteredEvents = filterEvents(eventsFromMockDB, 'jihdshfhgfdhüqsq');
    expect(filteredEvents.length).toEqual(0);
  });
});
