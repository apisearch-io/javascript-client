"use strict";
exports.__esModule = true;
exports.SortBy = exports.SORT_BY_LOCATION_MI_ASC = exports.SORT_BY_LOCATION_KM_ASC = exports.SORT_BY_TYPE_DESC = exports.SORT_BY_TYPE_ASC = exports.SORT_BY_ID_DESC = exports.SORT_BY_ID_ASC = exports.SORT_BY_AL_TUN_TUN = exports.SORT_BY_RANDOM = exports.SORT_BY_SCORE = exports.SORT_BY_MODE_MEDIAN = exports.SORT_BY_MODE_MAX = exports.SORT_BY_MODE_MIN = exports.SORT_BY_MODE_SUM = exports.SORT_BY_MODE_AVG = exports.SORT_BY_DESC = exports.SORT_BY_ASC = exports.SORT_BY_TYPE_RANDOM = exports.SORT_BY_TYPE_FUNCTION = exports.SORT_BY_TYPE_DISTANCE = exports.SORT_BY_TYPE_SCORE = exports.SORT_BY_TYPE_NESTED = exports.SORT_BY_TYPE_FIELD = void 0;
var __1 = require("..");
var Filter_1 = require("./Filter");
/**
 export * Sort by constants
 */
exports.SORT_BY_TYPE_FIELD = 'field';
exports.SORT_BY_TYPE_NESTED = 'nested';
exports.SORT_BY_TYPE_SCORE = 'score';
exports.SORT_BY_TYPE_DISTANCE = 'distance';
exports.SORT_BY_TYPE_FUNCTION = 'function';
exports.SORT_BY_TYPE_RANDOM = 'random';
exports.SORT_BY_ASC = "asc";
exports.SORT_BY_DESC = "desc";
exports.SORT_BY_MODE_AVG = "avg";
exports.SORT_BY_MODE_SUM = "sum";
exports.SORT_BY_MODE_MIN = "min";
exports.SORT_BY_MODE_MAX = "max";
exports.SORT_BY_MODE_MEDIAN = "median";
exports.SORT_BY_SCORE = {
    type: exports.SORT_BY_TYPE_SCORE
};
exports.SORT_BY_RANDOM = {
    type: exports.SORT_BY_TYPE_RANDOM
};
exports.SORT_BY_AL_TUN_TUN = exports.SORT_BY_RANDOM;
exports.SORT_BY_ID_ASC = {
    field: "uuid.id",
    order: exports.SORT_BY_ASC
};
exports.SORT_BY_ID_DESC = {
    field: "uuid.id",
    order: exports.SORT_BY_DESC
};
exports.SORT_BY_TYPE_ASC = {
    field: "uuid.type",
    order: exports.SORT_BY_ASC
};
exports.SORT_BY_TYPE_DESC = {
    field: "uuid.type",
    order: exports.SORT_BY_DESC
};
exports.SORT_BY_LOCATION_KM_ASC = {
    type: exports.SORT_BY_TYPE_DISTANCE,
    unit: "km"
};
exports.SORT_BY_LOCATION_MI_ASC = {
    type: exports.SORT_BY_TYPE_DISTANCE,
    unit: "mi"
};
/**
 * ScoreStrategy
 */
var SortBy = /** @class */ (function () {
    function SortBy() {
        this.sortsBy = [];
    }
    /**
     * Create
     *
     * @return {SortBy}
     */
    SortBy.create = function () {
        return new SortBy;
    };
    /**
     * Sort By fields values
     *
     * @param shortSortByElements
     *
     * @return {SortBy}
     */
    SortBy.byFieldsValues = function (shortSortByElements) {
        var sortBy = SortBy.create();
        for (var key in shortSortByElements) {
            sortBy.byFieldValue(key, shortSortByElements[key]);
        }
        return sortBy;
    };
    /**
     * All
     *
     * @return {Array}
     */
    SortBy.prototype.all = function () {
        return this.sortsBy.length > 0
            ? this.sortsBy
            : [exports.SORT_BY_SCORE];
    };
    /**
     * Sort by value
     *
     * @param value
     *
     * @return {SortBy}
     */
    SortBy.prototype.byValue = function (value) {
        if (exports.SORT_BY_SCORE != value &&
            exports.SORT_BY_RANDOM != value) {
            if (typeof value.type == "undefined") {
                value.type = exports.SORT_BY_TYPE_FIELD;
            }
        }
        if (exports.SORT_BY_SCORE != value) {
            this.sortsBy.push(value);
        }
        return this;
    };
    /**
     * Sort by field value
     *
     * @param field
     * @param order
     *
     * @return {SortBy}
     */
    SortBy.prototype.byFieldValue = function (field, order) {
        this.sortsBy.push({
            type: exports.SORT_BY_TYPE_FIELD,
            field: __1.Item.getPathByField(field),
            order: order
        });
        return this;
    };
    /**
     * Sort by nested field
     *
     * @param field
     * @param order
     * @param mode
     *
     * @return {SortBy}
     */
    SortBy.prototype.byNestedField = function (field, order, mode) {
        if (mode === void 0) { mode = exports.SORT_BY_MODE_AVG; }
        this.sortsBy.push({
            type: exports.SORT_BY_TYPE_NESTED,
            mode: mode,
            field: 'indexed_metadata.' + field,
            order: order
        });
        return this;
    };
    /**
     * Sort by nested field and filter
     *
     * @param field
     * @param order
     * @param filter
     * @param mode
     *
     * @return {SortBy}
     */
    SortBy.prototype.byNestedFieldAndFilter = function (field, order, filter, mode) {
        if (mode === void 0) { mode = exports.SORT_BY_MODE_AVG; }
        var fieldPath = __1.Item.getPathByField(filter.getField());
        var filterAsArray = filter.toArray();
        filterAsArray.field = fieldPath;
        filter = Filter_1.Filter.createFromArray(filterAsArray);
        this.sortsBy.push({
            type: exports.SORT_BY_TYPE_NESTED,
            mode: mode,
            filter: filter,
            field: 'indexed_metadata.' + field,
            order: order
        });
        return this;
    };
    /**
     * Sort by function
     *
     * @param func
     * @param order
     *
     * @return {SortBy}
     */
    SortBy.prototype.byFunction = function (func, order) {
        this.sortsBy.push({
            type: exports.SORT_BY_TYPE_FUNCTION,
            "function": func,
            order: order
        });
        return this;
    };
    /**
     * Is sorted by geo distance
     *
     * @return {boolean}
     */
    SortBy.prototype.isSortedByGeoDistance = function () {
        for (var i in this.sortsBy) {
            if (this.sortsBy[i].type === exports.SORT_BY_TYPE_DISTANCE) {
                return true;
            }
        }
        return false;
    };
    /**
     * Set coordinate
     *
     * @param coordinate
     *
     * @return {SortBy}
     */
    SortBy.prototype.setCoordinate = function (coordinate) {
        for (var i in this.sortsBy) {
            if (this.sortsBy[i].type === exports.SORT_BY_TYPE_DISTANCE) {
                this.sortsBy[i].coordinate = coordinate;
            }
        }
        return this;
    };
    /**
     * Has random sort
     *
     * @return {boolean}
     */
    SortBy.prototype.hasRandomSort = function () {
        for (var i in this.sortsBy) {
            if (this.sortsBy[i].type === exports.SORT_BY_TYPE_RANDOM) {
                return true;
            }
        }
        return false;
    };
    /**
     * get first sort value as string
     *
     * @return {string}
     */
    SortBy.prototype.getFirstSortAsString = function () {
        if (this.sortsBy[0] === undefined) {
            return 'score';
        }
        var firstSortBy = this.sortsBy[0];
        if (firstSortBy.type === exports.SORT_BY_TYPE_RANDOM) {
            return 'random';
        }
        if (firstSortBy.type === exports.SORT_BY_TYPE_DISTANCE) {
            return firstSortBy.type + ':' + firstSortBy.unit;
        }
        if (firstSortBy.type === exports.SORT_BY_TYPE_SCORE) {
            return 'score';
        }
        var field = firstSortBy.field;
        var order = firstSortBy.order;
        var fieldParts = field.split('.');
        return fieldParts[1] + ':' + order;
    };
    /**
     * To array
     *
     * @return {[]}
     */
    SortBy.prototype.toArray = function () {
        var copySortBy = this.copy();
        var sortsByAsArray = copySortBy.sortsBy;
        for (var i in sortsByAsArray) {
            if (typeof sortsByAsArray[i].filter === typeof {} &&
                sortsByAsArray[i].filter != null) {
                sortsByAsArray[i].filter = sortsByAsArray[i].filter.toArray();
            }
            if (sortsByAsArray[i].coordinate !== null &&
                sortsByAsArray[i].coordinate instanceof __1.Coordinate) {
                sortsByAsArray[i].coordinate = sortsByAsArray[i].coordinate.toArray();
            }
        }
        return sortsByAsArray;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {SortBy}
     */
    SortBy.createFromArray = function (array) {
        var innerArray = JSON.parse(JSON.stringify(array));
        var sortBy = SortBy.create();
        for (var i in innerArray) {
            var element = innerArray[i];
            if (typeof element.type == "undefined") {
                element.type = exports.SORT_BY_TYPE_FIELD;
            }
            if (typeof element.filter === typeof {} &&
                element.filter != null) {
                element.filter = Filter_1.Filter.createFromArray(element.filter);
            }
            if (element.coordinate != null &&
                typeof element.coordinate === typeof {}) {
                element.coordinate = __1.Coordinate.createFromArray(element.coordinate);
            }
            sortBy.sortsBy.push(element);
        }
        return sortBy;
    };
    /**
     * Make a copy of this
     *
     * @returns {SortBy}
     */
    SortBy.prototype.copy = function () {
        var newSortBy = SortBy.create();
        for (var i in this.sortsBy) {
            var sortBy = this.sortsBy[i];
            if (typeof sortBy !== "function") {
                var sortByAsArray = JSON.parse(JSON.stringify(sortBy));
                if (typeof sortBy.filter === typeof {} &&
                    sortBy.filter != null) {
                    sortByAsArray.filter = Filter_1.Filter.createFromArray(sortBy.filter.toArray());
                }
                if (sortBy.coordinate != null &&
                    typeof sortBy.coordinate == typeof {}) {
                    sortByAsArray.coordinate = __1.Coordinate.createFromArray(sortBy.coordinate.toArray());
                }
                newSortBy.sortsBy.push(sortByAsArray);
            }
        }
        return newSortBy;
    };
    return SortBy;
}());
exports.SortBy = SortBy;
