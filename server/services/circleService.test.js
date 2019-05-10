jest.mock('../models/CircleModel');
jest.mock('../models/UserModel');
jest.mock('../models/EventModel');

const { updateCircle, create, deleteCircle } = require('./circleService');
const { findById, aggregate } = require('../models/CircleModel');

test('update circle should return updated circle', async () => {
  await updateCircle('0', {
    name: 'Bern'
  })
    .then(() => {
      return findById('0');
    })
    .then(resp => {
      var circle = resp;
      expect(circle.name).toEqual('Bern');
    });
});

test('update should throw an error when name is missing', async () => {
  let errorReceived = false;
  try {
    await updateCircle('0', {});
  } catch (e) {
    if (e && e.type == 'invalid_input') {
      errorReceived = true;
    }
  }

  expect(errorReceived).toBe(true);
});

test('delete circle should decrease the amount of circles', async () => {
  let amountBefore = (await aggregate()).length;
  await deleteCircle('BBBBBBBBBBBBBBBBBBBBBBBB');

  let amountAfter = (await aggregate()).length;
  expect(amountAfter).toBe(amountBefore - 1);
});

test('delete circle should throw an error if not empty', async () => {
  let amountBefore = (await aggregate()).length;
  let error = false;
  try {
    await deleteCircle('1');
  } catch (e) {
    if (e.type == 'users_remaining_in_circle') {
      error = true;
    }
  }

  let amountAfter = (await aggregate()).length;
  expect(amountAfter).toBe(amountBefore);
  expect(error).toBe(true);
});

test('create should throw an error when name is missing', async () => {
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

test('create should add a circle when values are valid', async () => {
  let circleAmountBefore = (await aggregate()).length;
  let newCircle = { name: 'TestCircle' };
  await create(newCircle);

  let circleAmountAfter = (await aggregate()).length;
  expect(circleAmountAfter).toBe(circleAmountBefore + 1);
});
