"use strict";
exports.__esModule = true;
exports.AppUUID = void 0;
var InvalidFormatError_1 = require("../Error/InvalidFormatError");
/**
 * AppUUID class
 */
var AppUUID = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param id
     */
    function AppUUID(id) {
        if (id.indexOf('_') >= 0) {
            throw InvalidFormatError_1.InvalidFormatError.appUUIDFormatNotValid();
        }
        this.id = id;
    }
    /**
     * Create by id
     *
     * @param id
     *
     * @returns {ItemUUID}
     */
    AppUUID.createById = function (id) {
        return new AppUUID(id);
    };
    /**
     * Return id
     *
     * @returns {string}
     */
    AppUUID.prototype.getId = function () {
        return this.id;
    };
    /**
     * To array
     *
     * @returns {{id: *, type: *}}
     */
    AppUUID.prototype.toArray = function () {
        return {
            id: this.id
        };
    };
    /**
     * Create from array
     *
     * @param array {{id:string, type:string}}
     *
     * @return {ItemUUID}
     */
    AppUUID.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        return new AppUUID(array.id);
    };
    /**
     * Compose unique id
     *
     * @returns {string}
     */
    AppUUID.prototype.composedUUID = function () {
        return this.id;
    };
    return AppUUID;
}());
exports.AppUUID = AppUUID;
