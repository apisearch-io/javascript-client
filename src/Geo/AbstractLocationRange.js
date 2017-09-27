/**
 * Abstract Location Range class
 */
class AbstractLocationRange {
    constructor() {
        if (this.constructor.name === AbstractLocationRange) {
            throw TypeError(`You can't instantiate an Abstract class`);
        }

        if (typeof this.toFilterObject === 'undefined') {
            throw new TypeError(`toFilterObject() method must be implemented.`);
        }
    }
}

module.exports.AbstractLocationRange = AbstractLocationRange;