const expect = require('chai').expect;
import TypeChecker from '../src/TypeChecker';

/**
 * Query object tests
 */
describe('# Test: TypeChecker()', () => {
    describe('-> isDefined()', () => {
        it('should throw exception when value is not defined', () => {
            let undefinedValue;
            expect(() => TypeChecker.isDefined(undefinedValue)).to.throw(TypeError);
        });

        it('should silent pass if value is defined', () => {
            let definedValue = 1;
            expect(() => TypeChecker.isDefined(definedValue)).to.not.throw(TypeError);
        });
    });

    describe('-> isInteger()', () => {
        it('should throw exception when value is not type Integer', () => {
            let notAnIntegerValue = 'I am a string';
            expect(() => TypeChecker.isInteger(notAnIntegerValue)).to.throw(TypeError);
        });

        it('should silent pass if value is type of Boolean', () => {
            let integerValue = 123;
            expect(() => TypeChecker.isInteger(integerValue)).to.not.throw(TypeError);
        });
    });

    describe('-> isBool()', () => {
        it('should throw exception when value is not type Boolean', () => {
            let notABooleanValue = 'I am a string';
            expect(() => TypeChecker.isBool(notABooleanValue)).to.throw(TypeError);
        });

        it('should silent pass if value is type of Boolean', () => {
            let booleanValue = true;
            expect(() => TypeChecker.isBool(booleanValue)).to.not.throw(TypeError);
        });
    });

    describe('-> isString()', () => {
        it('should throw exception when value is not type String', () => {
            let notAStringValue = true;
            expect(() => TypeChecker.isString(notAStringValue)).to.throw(TypeError);
        });

        it('should silent pass if value is type of String', () => {
            let stringValue = 'I am a string';
            expect(() => TypeChecker.isString(stringValue)).to.not.throw(TypeError);
        });
    });

    describe('-> isArray()', () => {
        it('should throw exception when value is not type Array', () => {
            let notAnArrayValue = {};
            expect(() => TypeChecker.isArray(notAnArrayValue)).to.throw(TypeError);
        });

        it('should silent pass if value is type of Array', () => {
            let arrayValue = ['I am a string', 'inside of an array'];
            expect(() => TypeChecker.isArray(arrayValue)).to.not.throw(TypeError);
        });
    });

    describe('-> isObjectTypeOf()', () => {
        class A {}
        class B {}

        it('should throw exception when the given object is not equal to the expected type', () => {
            const classB = new B;
            expect(() => TypeChecker.isObjectTypeOf(classB, A)).to.throw(TypeError);
        });

        it('should silent pass if given object type is equal to the expected type', () => {
            const classA = new A;
            expect(() => TypeChecker.isObjectTypeOf(classA, A)).to.not.throw(TypeError);
        });
    });
});