"use strict";
exports.__esModule = true;
exports.Index = void 0;
var InvalidFormatError_1 = require("../Error/InvalidFormatError");
var IndexUUID_1 = require("./IndexUUID");
var AppUUID_1 = require("./AppUUID");
/**
 * Index class
 */
var Index = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param uuid
     * @param appUUID
     * @param isOK
     * @param docCount
     * @param size
     */
    function Index(uuid, appUUID, isOK, docCount, size) {
        if (isOK === void 0) { isOK = false; }
        if (docCount === void 0) { docCount = 0; }
        if (size === void 0) { size = '0kb'; }
        this.uuid = uuid;
        this.appUUID = appUUID;
        this.isOK = isOK;
        this.docCount = docCount;
        this.size = size;
    }
    /**
     * Get uuid
     *
     * @return {IndexUUID}
     */
    Index.prototype.getUUID = function () {
        return this.uuid;
    };
    /**
     * Get app id
     *
     * @return {AppUUID}
     */
    Index.prototype.getAppUUID = function () {
        return this.appUUID;
    };
    /**
     * Index is OK
     *
     * @return {boolean}
     */
    Index.prototype.isOk = function () {
        return this.isOK;
    };
    /**
     * Get doc count
     *
     * @return {number}
     */
    Index.prototype.getDocCount = function () {
        return this.docCount;
    };
    /**
     * get size
     *
     * @return {string}
     */
    Index.prototype.getSize = function () {
        return this.size;
    };
    /**
     * To array
     *
     * @returns {{id: string, attributes: {}}}
     */
    Index.prototype.toArray = function () {
        return {
            uuid: this.uuid.toArray(),
            app_id: this.appUUID.toArray(),
            is_ok: this.isOK,
            doc_count: this.docCount,
            size: this.size
        };
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return User
     */
    Index.createFromArray = function (array) {
        if (typeof array.uuid == "undefined" ||
            typeof array.app_id == "undefined") {
            throw InvalidFormatError_1.InvalidFormatError.indexFormatNotValid();
        }
        return new Index(IndexUUID_1.IndexUUID.createFromArray(array.uuid), AppUUID_1.AppUUID.createFromArray(array.app_id), (typeof array.is_ok == "undefined" ? false : array.is_ok), (typeof array.doc_count == "undefined" ? 0 : array.doc_count), (typeof array.size == "undefined" ? '0kb' : array.size));
    };
    return Index;
}());
exports.Index = Index;
