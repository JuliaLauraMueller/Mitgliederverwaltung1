var assert = require('assert');
describe('ExampleServerSideTest', function() {
  describe('ServerSideTest()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });

  describe('ServerSideTest2()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});