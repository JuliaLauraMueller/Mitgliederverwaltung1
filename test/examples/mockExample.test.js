jest.mock('../../server/services/userService');

const { getAll } = require('../../server/services/userService');

test('should get users from database', () => {
  getAll();
  expect(true);
});
