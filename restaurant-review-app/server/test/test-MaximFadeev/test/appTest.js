const assert = require("chai").assert;
const app = require("../app");

describe("App", function() {
  it("capitalise should return a string with all caps", function() {
    let result = app.capitalise("test");
    assert.equal(result, "TEST");
  });
  it("lowerise should return a string with all lowercase", function() {
    let result = app.lowerise("TEST");
    assert.equal(result, "test");
  });
  it("removeNumbers should remove non alphabet characters from string", function() {
    let result = app.removeNumbers("t1e2s3t");
    assert.equal(result, "test");
  });
  it("removeNumbers should return type string", function() {
    let result = app.removeNumbers("t1e2s3t");
    assert.typeOf(result, "string");
  });
  it("convertStringToArray should return type array", function() {
    let result = app.convertStringToArray("test");
    assert.typeOf(result, "array");
  });
  it("getRandom should return a number above zero", function() {
    let result = app.getRandom(7);
    assert.isAbove(result, 0);
  });
  it("getRandom should return a number below input number", function() {
    let result = app.getRandom(12);
    assert.isBelow(result, 12);
  });
  it("getRandom should return type number", function() {
    let result = app.getRandom(5);
    assert.typeOf(result, "number");
  });
  it("powerOf should return the first input number to the power of the second input number", function() {
    let result = app.powerOf(10, 3);
    assert.equal(result, 10 * 10 * 10);
  });
  it("powerOf should return type number", function() {
    let result = app.powerOf(10, 10);
    assert.typeOf(result, "number");
  });
});
