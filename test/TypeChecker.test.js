const expect = require('chai').expect;
import TypeChecker from '../src/TypeChecker';

/**
 * Query object tests
 */
describe('# Test: TypeChecker()', () => {
    describe('-> When checking types', () => {
        it('should throw exception when value is not defined', () => {
            let undefinedValue;
            expect(() => TypeChecker.isDefined(undefinedValue)).to.throw(TypeError);
        });

        it('should throw exception when value is not type Boolean', () => {
            let notABooleanValue = 'I am a string';
            expect(() => TypeChecker.isBool(notABooleanValue)).to.throw(TypeError);
        });

        it('should throw exception when value is not type String', () => {
            let notAStringValue = true;
            expect(() => TypeChecker.isString(notAStringValue)).to.throw(TypeError);
        });

        it('should throw exception when value is not type Array', () => {
            let notAnArrayValue = {};
            expect(() => TypeChecker.isArray(notAnArrayValue)).to.throw(TypeError);
        });

        it('should throw exception when the given object is not the expected type', () => {
            class A {}
            class B {}
            const classB = new B;
            expect(() => TypeChecker.isObjectTypeOf(classB, A)).to.throw(TypeError);
        });
    });
});