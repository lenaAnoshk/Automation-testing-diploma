const MathOperations = require('./MathOperations');

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
});
