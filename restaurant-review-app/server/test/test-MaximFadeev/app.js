module.exports = {
  convertStringToArray: function(word) {
    return word.split("");
  },
  capitalise: function(word) {
    return word.toUpperCase();
  },
  lowerise: function(word) {
    return word.toLowerCase();
  },
  removeNumbers: function(word) {
    return word.replace(/\d+/g, "");
  },
  getRandom: function(num) {
    return Math.random() * num;
  },
  powerOf: function(num, pow) {
    return Math.pow(num, pow);
  }
};
