"use strict";
exports.__esModule = true;
var Item_1 = require("../Model/Item");
/**
 export * Sort by constants
 */
exports.SORT_BY_TYPE_FIELD = 1;
exports.SORT_BY_TYPE_NESTED = 2;
exports.SORT_BY_ASC = "asc";
exports.SORT_BY_DESC = "desc";
exports.SORT_BY_MODE_AVG = "avg";
exports.SORT_BY_MODE_SUM = "sum";
exports.SORT_BY_MODE_MIN = "min";
exports.SORT_BY_MODE_MAX = "max";
exports.SORT_BY_MODE_MEDIAN = "median";
exports.SORT_BY_SCORE = {
    _score: {
        order: exports.SORT_BY_ASC
    }
};
exports.SORT_BY_RANDOM = {
    random: {
        order: exports.SORT_BY_ASC
    }
};
exports.SORT_BY_AL_TUN_TUN = exports.SORT_BY_RANDOM;
exports.SORT_BY_ID_ASC = {
    "uuid.id": {
        order: exports.SORT_BY_ASC
    }
};
exports.SORT_BY_ID_DESC = {
    "uuid.id": {
        order: exports.SORT_BY_DESC
    }
};
exports.SORT_BY_TYPE_ASC = {
    "uuid.type": {
        order: exports.SORT_BY_ASC
    }
};
exports.SORT_BY_TYPE_DESC = {
    "uuid.type": {
        order: exports.SORT_BY_DESC
    }
};
exports.SORT_BY_LOCATION_KM_ASC = {
    _geo_distance: {
        order: exports.SORT_BY_ASC,
        unit: "km"
    }
};
exports.SORT_BY_LOCATION_MI_ASC = {
    _geo_distance: {
        order: exports.SORT_BY_DESC,
        unit: "mi"
    }
};
var Coordinate_1 = require("../Model/Coordinate");
var Filter_1 = require("./Filter");
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
        var object = {
            type: exports.SORT_BY_TYPE_FIELD
        };
        object["indexed_metadata." + field] = {
            order: order
        };
        this.sortsBy.push(object);
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
        var object = {
            type: exports.SORT_BY_TYPE_NESTED,
            mode: mode
        };
        object["indexed_metadata." + field] = {
            order: order
        };
        this.sortsBy.push(object);
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
        var fieldPath = Item_1.Item.getPathByField(filter.getField());
        var filterAsArray = filter.toArray();
        filterAsArray.field = fieldPath;
        filter = Filter_1.Filter.createFromArray(filterAsArray);
        var object = {
            type: exports.SORT_BY_TYPE_NESTED,
            mode: mode,
            filter: filter
        };
        object["indexed_metadata." + field] = {
            order: order
        };
        this.sortsBy.push(object);
        return this;
    };
    /**
     * Is sorted by geo distance
     *
     * @return {boolean}
     */
    SortBy.prototype.isSortedByGeoDistance = function () {
        for (var i in this.sortsBy) {
            if (typeof this.sortsBy[i]._geo_distance === typeof {}) {
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
            if (typeof this.sortsBy[i]._geo_distance === typeof {}) {
                this.sortsBy[i]._geo_distance.coordinate = coordinate;
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
            if (JSON.stringify(this.sortsBy[i]) === JSON.stringify(exports.SORT_BY_RANDOM)) {
                return true;
            }
        }
        return false;
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
            if (sortsByAsArray[i].type == exports.SORT_BY_TYPE_FIELD) {
                delete sortsByAsArray[i].type;
            }
            if (typeof sortsByAsArray[i].filter === typeof {} &&
                sortsByAsArray[i].filter != null) {
                sortsByAsArray[i].filter = sortsByAsArray[i].filter.toArray();
            }
            if (typeof sortsByAsArray[i]._geo_distance === typeof {} &&
                sortsByAsArray[i]._geo_distance !== null &&
                sortsByAsArray[i]._geo_distance.coordinate instanceof Coordinate_1.Coordinate) {
                sortsByAsArray[i]._geo_distance.coordinate = sortsByAsArray[i]._geo_distance.coordinate.toArray();
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
            if (JSON.stringify(element) !== JSON.stringify(exports.SORT_BY_RANDOM) &&
                JSON.stringify(element) !== JSON.stringify(exports.SORT_BY_SCORE)) {
                if (typeof element.type == "undefined") {
                    element.type = exports.SORT_BY_TYPE_FIELD;
                }
            }
            if (typeof element.filter === typeof {} &&
                element.filter != null) {
                element.filter = Filter_1.Filter.createFromArray(element.filter);
            }
            if (typeof element._geo_distance === typeof {} &&
                element._geo_distance != null &&
                typeof element._geo_distance.coordinate === typeof {}) {
                element._geo_distance.coordinate = Coordinate_1.Coordinate.createFromArray(element._geo_distance.coordinate);
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
            var sortByAsArray = JSON.parse(JSON.stringify(sortBy));
            if (typeof sortBy.filter === typeof {} &&
                sortBy.filter != null) {
                sortByAsArray.filter = Filter_1.Filter.createFromArray(sortBy.filter.toArray());
            }
            if (typeof sortBy._geo_distance === typeof {} &&
                sortBy._geo_distance != null &&
                typeof sortBy._geo_distance.coordinate == typeof {}) {
                sortByAsArray._geo_distance.coordinate = Coordinate_1.Coordinate.createFromArray(sortBy._geo_distance.coordinate.toArray());
            }
            newSortBy.sortsBy.push(sortByAsArray);
        }
        return newSortBy;
    };
    return SortBy;
}());
exports.SortBy = SortBy;
