jest.mock('./functions');

const functions = require('./functions');

// This is an example for mocking.

test('should call mocking class from user model', () => {
  expect(functions.mockMethod()).toBe(true);
});
