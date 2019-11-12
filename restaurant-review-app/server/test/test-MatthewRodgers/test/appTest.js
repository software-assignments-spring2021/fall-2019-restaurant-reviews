const assert = require('chai').assert;
const app = require('../app');

describe('App',function() {
  it('hello_world should return hello world', function() {
    let result = app.hello_world();
    assert.equal(result, 'hello world');
  });

  it('hello_world should return string', function() {
    let result = app.hello_world();
    assert.typeOf(result,'string');
  });

  it("addNumbers should be 10", function() {
    let result = app.addNumbers(5,5);
    assert.equal(result, 10);
  });

  it("addNumbers should return type number", function() {
    let result = app.addNumbers(5,5);
    assert.typeOf(result,'number');
  });

  it("returnValueGreaterThanNine should return true", function() {
    let result = app.returnValueGreaterThanNine(12);
    assert.isTrue(result);
  });

  it("lengthOfArray should return 5", function() {
    let result = app.lengthOfArray([1,2,3,4,5]);
    assert.equal(result, 5);
  });

  it("array created should include 7", function() {
    let result = app.createArray();
    assert.include(result, 7);
  });

  it("create should return an array", function() {
    let result = app.createArray();
    assert.isArray(result);
  });

  it("multiplyNumbers should equal 42",function() {
    let result = app.multiplyNumbers(6,7);
    assert.equal(result, 42);
  });

  it("square should be at least 81", function() {
    let result = app.square(9);
    assert.isAtLeast(result,81);
  });

})
