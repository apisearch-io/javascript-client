"use strict";
exports.__esModule = true;
exports.Aggregation = exports.AGGREGATION_NO_LIMIT = exports.AGGREGATION_SORT_BY_NAME_DESC = exports.AGGREGATION_SORT_BY_NAME_ASC = exports.AGGREGATION_SORT_BY_COUNT_DESC = exports.AGGREGATION_SORT_BY_COUNT_ASC = void 0;
var Filter_1 = require("./Filter");
/**
 * Aggregation constants
 */
exports.AGGREGATION_SORT_BY_COUNT_ASC = ["_count", "asc"];
exports.AGGREGATION_SORT_BY_COUNT_DESC = ["_count", "desc"];
exports.AGGREGATION_SORT_BY_NAME_ASC = ["_term", "asc"];
exports.AGGREGATION_SORT_BY_NAME_DESC = ["_term", "desc"];
exports.AGGREGATION_NO_LIMIT = 0;
/**
 * Aggregation class
 */
var Aggregation = /** @class */ (function () {
    /**
     * Construct
     *
     * @param name
     * @param field
     * @param applicationType
     * @param filterType
     * @param subgroup
     * @param sort
     * @param limit
     * @param promoted
     */
    function Aggregation(name, field, applicationType, filterType, subgroup, sort, limit, promoted) {
        this.subgroup = [];
        this.name = name;
        this.field = field;
        this.applicationType = applicationType;
        this.filterType = filterType;
        this.subgroup = subgroup;
        this.sort = sort;
        this.limit = limit;
        this.promoted = promoted;
    }
    /**
     * Get name
     *
     * @returns {string}
     */
    Aggregation.prototype.getName = function () {
        return this.name;
    };
    /**
     * Get field
     *
     * @returns {string}
     */
    Aggregation.prototype.getField = function () {
        return this.field;
    };
    /**
     * getApplicationType
     *
     * @returns {number}
     */
    Aggregation.prototype.getApplicationType = function () {
        return this.applicationType;
    };
    /**
     * Get filter type
     *
     * @return {string}
     */
    Aggregation.prototype.getFilterType = function () {
        return this.filterType;
    };
    /**
     * Get subgroup
     *
     * @return {[]}
     */
    Aggregation.prototype.getSubgroup = function () {
        return this.subgroup;
    };
    /**
     * Get sort
     *
     * @return {[]}
     */
    Aggregation.prototype.getSort = function () {
        return this.sort;
    };
    /**
     * Get limit
     *
     * @return {number}
     */
    Aggregation.prototype.getLimit = function () {
        return this.limit;
    };
    /**
     * Get promoted
     *
     * @return {[]}
     */
    Aggregation.prototype.getPromoted = function () {
        return this.promoted;
    };
    /**
     * Create
     *
     * @param name
     * @param field
     * @param applicationType
     * @param filterType
     * @param subgroup
     * @param sort
     * @param limit
     * @param promoted
     *
     * @returns {Aggregation}
     */
    Aggregation.create = function (name, field, applicationType, filterType, subgroup, sort, limit, promoted) {
        if (subgroup === void 0) { subgroup = []; }
        if (sort === void 0) { sort = exports.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = exports.AGGREGATION_NO_LIMIT; }
        if (promoted === void 0) { promoted = []; }
        return new Aggregation(name, field, applicationType, filterType, subgroup, sort, limit, promoted);
    };
    /**
     * To array
     *
     * @returns {Array}
     */
    Aggregation.prototype.toArray = function () {
        var aggregationAsArray = {
            name: this.name
        };
        if (this.field !== "uuid.type") {
            aggregationAsArray.field = this.field;
        }
        if (this.applicationType !== Filter_1.FILTER_AT_LEAST_ONE) {
            aggregationAsArray.application_type = this.applicationType;
        }
        if (this.filterType !== Filter_1.FILTER_TYPE_FIELD) {
            aggregationAsArray.filter_type = this.filterType;
        }
        if (this.subgroup.length > 0) {
            aggregationAsArray.subgroup = this.subgroup;
        }
        if (JSON.stringify(this.sort) !== JSON.stringify(exports.AGGREGATION_SORT_BY_COUNT_DESC)) {
            aggregationAsArray.sort = this.sort;
        }
        if (this.limit !== exports.AGGREGATION_NO_LIMIT) {
            aggregationAsArray.limit = this.limit;
        }
        if (this.promoted.length > 0) {
            aggregationAsArray.promoted = this.promoted;
        }
        return aggregationAsArray;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Aggregation}
     */
    Aggregation.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        if (typeof array.field === "undefined") {
            array.field = "uuid.type";
        }
        if (typeof array.application_type === "undefined") {
            array.application_type = Filter_1.FILTER_AT_LEAST_ONE;
        }
        if (typeof array.filter_type === "undefined") {
            array.filter_type = Filter_1.FILTER_TYPE_FIELD;
        }
        if (typeof array.subgroup === "undefined") {
            array.subgroup = [];
        }
        if (typeof array.sort === "undefined") {
            array.sort = exports.AGGREGATION_SORT_BY_COUNT_DESC;
        }
        if (typeof array.limit === "undefined") {
            array.limit = exports.AGGREGATION_NO_LIMIT;
        }
        if (typeof array.promoted === "undefined") {
            array.promoted = [];
        }
        return Aggregation.create(array.name, array.field, array.application_type, array.filter_type, array.subgroup, array.sort, array.limit, array.promoted);
    };
    return Aggregation;
}());
exports.Aggregation = Aggregation;
