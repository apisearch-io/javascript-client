/**
 * Typechecking
 */
export default class TypeChecker {
    static isDefined(value) {
        if (typeof value === 'undefined') {
            throw new TypeError(`Method parameter must be defined.`);
        }
    }

    static isArray(array) {
        if (array instanceof Array === false) {
            throw new TypeError(`
                "${array}" must be type of Array, 
                "${values.constructor.name}" given.
            `);
        }
    }

    static isBool(bool) {
        if (typeof bool !== 'boolean') {
            throw new TypeError(`
                "${bool}" must be type of Boolean, 
                "${bool.constructor.name}" given.
            `);
        }
    }

    static isString(string) {
        if (typeof string !== 'string') {
            throw new TypeError(`
                "${string}" must be type of String, 
                "${string.constructor.name}" given.
            `);
        }
    }

    static isObjectTypeOf(
        givenObject,
        mustBe
    ) {
        if (givenObject instanceof mustBe !== true) {
            throw new TypeError(`
                "${givenObject.constructor.name}" must be type ${mustBe.name}, 
                "${givenObject.constructor.name}" given.
            `);
        }
    }
}