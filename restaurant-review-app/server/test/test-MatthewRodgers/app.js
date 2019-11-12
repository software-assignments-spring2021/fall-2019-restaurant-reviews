module.exports = {
    hello_world: function() {
        return 'hello world';
    },
    addNumbers: function(value1, value2) {
        return value1 + value2;
    },
    multiplyNumbers: function(value1, value2) {
        return value1 * value2;
    },
    createArray: function() {
      var array = [];
      array.push(1);
      array.push(3);
      array.push(5);
      array.push(7);
      return array;
    },
    returnValueGreaterThanNine: function(value1) {
      if (value1 >= 10) {
        return true;
      }
      else {
        return false;
      }
    },
    lengthOfArray: function(array) {
      return array.length;
    },
    square: function(value1) {
      return value1 * value1;
    }
}
