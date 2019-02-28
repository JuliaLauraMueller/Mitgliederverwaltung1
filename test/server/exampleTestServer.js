var assert = require('assert');
var userService = require('../../server/services/userService');

describe('ExampleServerSideTest', function() {
  describe('ServerSideTest()', function() {
    it('is this something', function() {
      var data = userService.getAll();
      if (data) {
        assert.equal(true, true);
      } else {
        assert.equal(false, true);
      }
    });
  });

  describe('ServerSideTest2()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
