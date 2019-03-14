jest.mock('../models/UserModel');

const { update, authenticate } = require('./userService');
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
