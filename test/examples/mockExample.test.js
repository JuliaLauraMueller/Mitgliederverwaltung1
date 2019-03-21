jest.mock('./functions');

const functions = require('./functions');

test('should call mocking class from user model', () => {
  expect(functions.mockMethod()).toBe(true);
});
