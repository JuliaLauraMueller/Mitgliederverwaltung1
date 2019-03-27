jest.mock('../models/UserModel');
jest.mock('../models/CompanyModel');
jest.mock('../models/CounterModel');

const {
  update,
  authenticate,
  deleteUser,
  getAll,
  create
} = require('./userService');
const { aggregate } = require('../models/CompanyModel');
const { findById } = require('../models/UserModel');

test('update user should return updated user', async () => {
  await update(0, {
    privateEmail: 'updatedEmail@mail.com',
    entryDate: '1.1.23',
    birthdate: '1.1.43',
    status: 'inactive',
    circle: 'CiRcLe'
  })
    .then(response => {
      var users = response;
      return findById(0);
    })
    .then(resp => {
      var user = resp;

      expect(user.privateEmail).toEqual('updatedemail@mail.com');
      expect(user.entryDate).toEqual('1.1.23');
      expect(user.birthdate).toEqual('1.1.43');
      expect(user.status).toEqual('inactive');
      expect(user.circle).toEqual('CiRcLe');
      expect(user.godfather).toEqual('godfather');
      expect(user.salutation).toEqual('salutation');
      expect(user.title).toEqual('mr');
      expect(user.firstname).toEqual('max');
      expect(user.surname).toEqual('muster');
      expect(user.alias).toEqual('mm');
      expect(user.sector).toEqual('sector');
      expect(user.job).toEqual('job');
    });
});

test('update user should throw user not found', async () => {
  var boolVal = false;
  try {
    await update(2, {
      privateEmail: 'updatedEmail@mail.com',
      entryDate: '1.1.23',
      birthdate: '1.1.43',
      status: 'inactive',
      circle: 'CiRcLe'
    });
  } catch (e) {
    boolVal = true;
  }
  expect(boolVal).toBe(true);
});

test('update user should return error if mail is already taken', async () => {
  var boolVal = false;
  try {
    await update(0, {
      privateEmail: 'alreadyTaken@gmail.com'
    });
  } catch (e) {
    boolVal = true;
  }

  expect(boolVal).toBe(true);
});

test('authentication should return token when correct log in', async () => {
  const result = await authenticate({
    privateEmail: 'alreadyTaken@gmail.com',
    password: '1234'
  });

  expect(result).not.toBeFalsy();
});

test('authentication should return null when incorrect log in', async () => {
  const result = await authenticate({
    privateEmail: 'alreadyTaken@gmail.com',
    password: 'wrong_password'
  });
  expect(result).toBeFalsy();
});

test('delete user should decrease the amount of users and companies', async () => {
  let amountBefore = (await getAll()).length;
  await deleteUser('AAAAAAAAAAAAAAAAAAAAAAAA');

  let amountAfter = (await getAll()).length;
  expect(amountAfter).toBe(amountBefore - 1);
});

test('create should throw an error when required fields are missing', async () => {
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

test('create should throw an error when password is too short', async () => {
  let errorReceived = false;
  try {
    await create({
      firstname: 'Max',
      surname: 'Muster',
      circle: 'circle_id',
      privateEmail: 'valid@example.com',
      password: 'pa'
    });
  } catch (e) {
    if (e && e.type == 'invalid_input') {
      errorReceived = true;
    }
  }

  expect(errorReceived).toBe(true);
});

test('create should throw an error when email is invalid', async () => {
  let errorReceived = false;
  try {
    await create({
      firstname: 'Max',
      surname: 'Muster',
      circle: 'circle_id',
      privateEmail: 'invalid_email',
      password: 'valid_password123'
    });
  } catch (e) {
    if (e && e.type == 'invalid_input') {
      errorReceived = true;
    }
  }

  expect(errorReceived).toBe(true);
});

test('create should add a user and company when values are valid', async () => {
  let userAmountBefore = (await getAll()).length;
  let companyAmountBefore = (await aggregate()).length;
  let newUser = {
    firstname: 'Max',
    surname: 'Muster',
    circle: 'circle_id',
    privateEmail: 'valid@example.com',
    password: 'valid_password123'
  };
  await create(newUser);

  let userAmountAfter = (await getAll()).length;
  expect(userAmountAfter).toBe(userAmountBefore + 1);
  let companyAmountAfter = (await aggregate()).length;
  expect(companyAmountAfter).toBe(companyAmountBefore + 1);
});
