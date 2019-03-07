// These are old tests for the mocha run through. These will be replaced when jenkins is set to jest tests.

var assert = require('assert');
describe('ExampleClientSideTest', function() {
  describe('ClientSideTest()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
