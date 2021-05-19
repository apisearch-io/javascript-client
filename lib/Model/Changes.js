"use strict";
exports.__esModule = true;
exports.Changes = exports.TYPE_ARRAY = exports.TYPE_ARRAY_EXPECTS_ELEMENT = exports.TYPE_ARRAY_ELEMENT_DELETE = exports.TYPE_ARRAY_ELEMENT_ADD = exports.TYPE_ARRAY_ELEMENT_UPDATE = exports.TYPE_LITERAL = exports.TYPE_VALUE = void 0;
/**
 * filter constants
 */
exports.TYPE_VALUE = 1;
exports.TYPE_LITERAL = 4;
exports.TYPE_ARRAY_ELEMENT_UPDATE = 8;
exports.TYPE_ARRAY_ELEMENT_ADD = 16;
exports.TYPE_ARRAY_ELEMENT_DELETE = 32;
exports.TYPE_ARRAY_EXPECTS_ELEMENT = 24;
exports.TYPE_ARRAY = 56;
/**
 * Changes Type cast
 * @param Changes
 */
var Changes = /** @class */ (function () {
    function Changes() {
        /**
         * Changes
         *
         * @type {Array}
         */
        this.changes = [];
    }
    /**
     * Add new change
     *
     * @param field
     * @param value
     * @param type
     */
    Changes.prototype.addChange = function (field, value, type) {
        if (type === void 0) { type = exports.TYPE_VALUE; }
        this.changes.push({
            field: field,
            type: type,
            value: value
        });
    };
    /**
     * Update element from list
     *
     * @param field
     * @param condition
     * @param value
     * @param type
     */
    Changes.prototype.updateElementFromList = function (field, condition, value, type) {
        this.changes.push({
            field: field,
            type: type | exports.TYPE_ARRAY_ELEMENT_UPDATE,
            condition: condition,
            value: value
        });
    };
    /**
     * Add element in list
     *
     * @param field
     * @param value
     * @param type
     */
    Changes.prototype.addElementInList = function (field, value, type) {
        this.changes.push({
            field: field,
            type: type | exports.TYPE_ARRAY_ELEMENT_ADD,
            value: value
        });
    };
    /**
     * Delete element from list
     *
     * @param field
     * @param condition
     */
    Changes.prototype.deleteElementFromList = function (field, condition) {
        this.changes.push({
            field: field,
            type: exports.TYPE_ARRAY_ELEMENT_DELETE,
            condition: condition
        });
    };
    /**
     * Get changes
     *
     * @returns {[]}
     */
    Changes.prototype.getChanges = function () {
        return this.changes;
    };
    /**
     * Create
     *
     * @returns {Changes}
     */
    Changes.create = function () {
        return new Changes();
    };
    /**
     * To array
     *
     * @returns {[]}
     */
    Changes.prototype.toArray = function () {
        return JSON.parse(JSON.stringify(this.changes));
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Changes}
     */
    Changes.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        var changes = Changes.create();
        changes.changes = array;
        return changes;
    };
    return Changes;
}());
exports.Changes = Changes;
