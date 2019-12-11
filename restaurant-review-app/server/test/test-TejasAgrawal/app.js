module.exports = {

    isEvenNumber: function(num) {
        return (num%2==0);

    },

    isOddNumber: function(num) {
        return (num%2==1);

    },

    roundDown: function(num) {
        return Math.floor(num);

    },

    firstLetter: function(word) {
        return word.substr(0, 1);
        
    },

    absoluteValue: function(num) {
        if (num < 0)
            return num * -1;

        else
            return num;

    },

    createEmptyString: function() {
        return '';

    },

    cube: function(num) {
        return num * num * num; 

    }

}
