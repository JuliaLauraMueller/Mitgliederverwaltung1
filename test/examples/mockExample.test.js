jest.mock('../../server/models/UserModel');

const { findById } = require('../../server/models/UserModel');

test('should call mocking class from user model', () => {
  findById(10);
});
