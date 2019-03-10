jest.mock('../../server/services/userService');

const { update, authenticate } = require('../../server/services/userService');

test('update user should return updated user', () => {
  var user = update(1, {
    privateEmail: 'updatedEmail@mail.com',
    entryDate: '1.1.23',
    birthdate: '1.1.43',
    status: 'inactive',
    circle: 'CiRcLe'
  });

  expect(user).toEqual({
    privateEmail: 'updatedEmail@mail.com',
    entryDate: '1.1.23',
    birthdate: '1.1.43',
    status: 'inactive',
    circle: 'CiRcLe',
    godfather: 'godfather',
    salutation: 'salutation',
    title: 'mr',
    firstname: 'max',
    surname: 'muster',
    alias: 'mm',
    sector: 'sector',
    job: 'job'
  });
});

test('update user should throw user not found', () => {
  var boolVal = false;
  try {
    update(0, {
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

test('update user should return error if mail is already taken', () => {
  var boolVal = false;

  try {
    var user = update(1, {
      privateEmail: 'alreadyThere',
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

test('authentication should return token when correct log in', () => {
  const user = authenticate({
    privateEmail: 'email@address.com',
    password: 'correct_password'
  });

  expect(user).not.toBeFalsy();
});

test('authentication should return null when incorrect log in', () => {
  expect(
    authenticate({
      privateEmail: 'email@address.com',
      password: 'wrong_password'
    })
  ).toBeFalsy();
});
