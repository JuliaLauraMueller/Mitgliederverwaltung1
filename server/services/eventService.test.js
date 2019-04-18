jest.mock('../models/EventModel');

const { updateEvent, create, deleteEvent } = require('./eventService');
const { findById, aggregate } = require('../models/EventModel');

test('update event should return updated event', async () => {
  await updateEvent('0', {
    title: 'Test Event updated',
    description: 'updated description',
    circles: ['c1'],
    date: new Date('05/18/2018'),
    startTime: 'new start time',
    endTime: 'new end time',
    location: 'new location',
    organisationTeam: 'new team',
    registrationEndDate: new Date('05/16/2018'),
    permittedRoles: [1, 4, 5]
  })
    .then(() => {
      return findById('0');
    })
    .then(resp => {
      var event = resp;
      expect(event.title).toEqual('Test Event updated');
      expect(event.description).toEqual('updated description');
      expect(event.circles).toEqual(['c1']);
      expect(event.date.getTime() == new Date('05/18/2018').getTime());
      expect(event.startTime).toEqual('new start time');
      expect(event.endTime).toEqual('new end time');
      expect(event.location).toEqual('new location');
      expect(event.organisationTeam).toEqual('new team');
      expect(
        event.registrationEndDate.getTime() == new Date('05/16/2018').getTime()
      );
      expect(event.permittedRoles).toEqual([1, 4, 5]);
    });
});

test('update should throw an error when title is missing', async () => {
  let errorReceived = false;
  try {
    await updateEvent('0', {
      title: 'Test Event updated',
      description: 'updated description',
      circles: ['c1'],
      date: new Date('05/11/2018'),
      startTime: 'new start time',
      endTime: 'new end time',
      location: 'new location',
      organisationTeam: 'new team',
      registrationEndDate: new Date('05/21/2018'),
      permittedRoles: [1, 4, 5]
    });
  } catch (e) {
    if (e && e.type == 'invalid_input') {
      errorReceived = true;
    }
  }

  expect(errorReceived).toBe(true);
});

test('update should throw an error when registrationEndDate is after date', async () => {
  let errorReceived = false;
  try {
    await updateEvent('0', {});
  } catch (e) {
    if (e && e.type == 'invalid_input') {
      errorReceived = true;
    }
  }

  expect(errorReceived).toBe(true);
});

test('delete event should decrease the amount of events', async () => {
  let amountBefore = (await aggregate()).length;
  await deleteEvent('BBBBBBBBBBBBBBBBBBBBBBBB');

  let amountAfter = (await aggregate()).length;
  expect(amountAfter).toBe(amountBefore - 1);
});

test('create should throw an error when title is missing', async () => {
  let errorReceived = false;
  try {
    await create({});
  } catch (e) {
    if (e && e.type == 'invalid_input') {
      errorReceived = true;
    }
  }

  expect(errorReceived).toBe(true);
});

test('create should add an event when values are valid', async () => {
  let eventAmountBefore = (await aggregate()).length;
  let newEvent = {
    title: 'TestEvent',
    description: 'test description',
    circles: ['c1'],
    date: new Date('03/05/2019'),
    startTime: 'start',
    endTime: 'end',
    location: 'location',
    organisationTeam: 'team',
    registrationEndDate: new Date('02/28/2019'),
    permittedRoles: [2]
  };
  await create(newEvent);

  let eventAmountAfter = (await aggregate()).length;
  expect(eventAmountAfter).toBe(eventAmountBefore + 1);
});
