const MathOperations = require('../src/MathOperations');

describe('Positive tests', function () {
    test('exponentiation of two positive numbers', function () {
        const result = MathOperations.power(2, 3);
        expect(result).toBe(8);
    });

    test('square root of positive number', function () {
        const result = MathOperations.sqrt(16);
        expect(result).toBe(4);
    });

    test('number is even', function () {
        const result = MathOperations.isEven(16);
        expect(result).toBe(true);
    });

    test('number is odd', function () {
        const result = MathOperations.isOdd(15);
        expect(result).toBe(true);
    });

    test('module of positive number', function () {
        const result = MathOperations.abs(15);
        expect(result).toBe(15);
    });

    test('gcb of positive numbers', function () {
        const result = MathOperations.gcd(2, 3);
        expect(result).toBe(1);
    });

    test('lcm of positive numbers', function () {
        const result = MathOperations.lcm(2, 3);
        expect(result).toBe(6);
    });

    test('max value of array of positive numbers', function () {
        const result = MathOperations.max([1,2,3]);
        expect(result).toBe(3);
    });

    test('max value of array of negative numbers', function () {
        const result = MathOperations.max([-1,-2,-3]);
        expect(result).toBe(-1);
    });

    test('average value from array of positive integer numbers', function () {
        const result = MathOperations.average([1,2,3]);
        expect(result).toBe(2);
    });

    test('average value from array of positive decimal numbers', function () {
        const result = MathOperations.average([1.34,2.34,3.23]);
        expect(result).toBe(2.3033333333333332);
    });

    test('value is prime', function () {
        const result = MathOperations.isPrime(13);
        expect(result).toBe(true);
    });

    test('sum of positive digits', function () {
        const result = MathOperations.sumOfDigits(24);
        expect(result).toBe(6);
    });

    test('reverse number', function () {
        const result = MathOperations.reverseNumber(2345);
        expect(result).toBe(5432);
    });

    test('reverse number of same digits', function () {
        const result = MathOperations.reverseNumber(1111);
        expect(result).toBe(1111);
    });

});

describe('Negative tests', function () {
    test('exponentiation with negative exponent', function () {
        const result = MathOperations.power(2, -3);
        expect(result).toBeNaN(); 
    });

    test('square root of negative number', function () {
        const result = MathOperations.sqrt(-16);
        expect(result).toBeNaN(); 
    });

    test('number is even', function () {
        const result = MathOperations.isEven(15);
        expect(result).toBe(false);
    });

    test('negative decimal number is even', function () {
        const result = MathOperations.isEven(-1434.4544);
        expect(result).toBe(false);
    });

    test('number is odd', function () {
        const result = MathOperations.isOdd(14);
        expect(result).toBe(false);
    });

    test('module of not a number', function () {
        const result = MathOperations.abs('we');
        expect(result).toBeNaN();
    });

    test('gcb of one number and not a number', function () {
        const result = MathOperations.gcd(2, 'we');
        expect(result).toBeNaN();
    });


    test('average value of array of non-numeric symbols', function () {
        const result = MathOperations.average(['a','s']);
        expect(result).toBeNaN();
    });

    test('value is prime', function () {
        const result = MathOperations.isPrime(14);
        expect(result).toBe(false);
    });

    test('negative value is prime', function () {
        const result = MathOperations.isPrime(-13);
        expect(result).toBe(false);
    });


    test('sum of positive digits', function () {
        const result = MathOperations.sumOfDigits(-243);
        expect(result).toBeNaN();
    });

    test('reverse number of a negative number', function () {
        const result = MathOperations.reverseNumber(-2345);
        expect(result).toBe(5432); 
    });

    test('reverse number with zeros', function () {
        const result = MathOperations.reverseNumber(1200);
        expect(result).toBe(21); 
    });

    test('reverse word', function () {
        const result = MathOperations.reverseNumber('abc');
        expect(result).toBeNaN(); 
    });

    test('reverse numbers+letters', function () {
        const result = MathOperations.reverseNumber('1abc2');
        expect(result).toBeNaN(); 
    });

});
