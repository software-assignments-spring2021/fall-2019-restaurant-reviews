
const assert = require('chai').assert;
const app = require('../app');

describe('App', function(){

    it('10 should be an even number', function() {
        let result = app.isEvenNumber(10);
        assert.isTrue(result);

    });

    it('7 should be an odd number', function() {
        let result = app.isOddNumber(7);
        assert.isTrue(result);

    });

    it('3.14 should be rounded down to 3', function() {
        let result = app.roundDown(3.14);
        assert.equal(result, 3);

    });

    it('-9.45 should be rounded down to -10', function() {
        let result = app.roundDown(-9.45);
        assert.equal(result, -10);

    });

    it('The first letter of hello should be h', function() {
        let result = app.firstLetter('hello');
        assert.equal(result, 'h');

    });

    it('Absolute value should always be at least 0, case of -4', function() {
        let result = app.absoluteValue(-4);
        assert.isAtLeast(result, 0);

    });

    it('Absolute value should always be at least 0, case of 19', function() {
        let result = app.absoluteValue(19);
        assert.isAtLeast(result, 0);

    });

    it('Absolute value should always be at least 0, case of 0', function() {
        let result = app.absoluteValue(0);
        assert.isAtLeast(result, 0);

    });

    it('Empty string creator should make empty strings', function() {
        let result = app.createEmptyString();
        assert.isEmpty(result);

    });

    it('Two different numbers cubed should not be equal', function() {
        //generate first number
        var num1 = Math.floor(Math.random() * 10);

        //generate second number, must be distinct
        do {
            num2 = Math.floor(Math.random() * 10);
        } while(num2 === num1);

        //cube them and compare
        let cube1 = app.cube(num1);
        let cube2 = app.cube(num2);

        assert.notEqual(cube1,cube2);
        
    });

});