var apisearch =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Coordinate Type cast
 * @param coordinate
 */
var Coordinate = function Coordinate(latitude, longitude) {
    _classCallCheck(this, Coordinate);

    if (typeof latitude === 'undefined' || typeof latitude === 'undefined') {
        throw new Error('Not valid coordinates object type given.');
    }

    this.lat = latitude;
    this.lon = longitude;
};

module.exports.Coordinate = Coordinate;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstract Location Range class
 */
var AbstractLocationRange = function AbstractLocationRange() {
    _classCallCheck(this, AbstractLocationRange);

    if (this.constructor.name === AbstractLocationRange) {
        throw TypeError('You can\'t instantiate an Abstract class');
    }

    if (typeof this.toFilterObject === 'undefined') {
        throw new TypeError('toFilterObject() method must be implemented.');
    }
};

module.exports.AbstractLocationRange = AbstractLocationRange;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Typechecking
 */
var TypeChecker = function () {
    function TypeChecker() {
        _classCallCheck(this, TypeChecker);
    }

    _createClass(TypeChecker, null, [{
        key: 'isDefined',
        value: function isDefined(value) {
            if (typeof value === 'undefined') {
                throw new TypeError('Method parameter must be defined.');
            }
        }
    }, {
        key: 'isInteger',
        value: function isInteger(integer) {
            if (typeof integer !== 'number') {
                throw new TypeError('\n                "' + integer + '" must be type of Integer, \n                "' + integer.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isBool',
        value: function isBool(bool) {
            if (typeof bool !== 'boolean') {
                throw new TypeError('\n                "' + bool + '" must be type of Boolean, \n                "' + bool.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isString',
        value: function isString(string) {
            if (typeof string !== 'string') {
                throw new TypeError('\n                "' + string + '" must be type of String, \n                "' + string.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isArray',
        value: function isArray(array) {
            if (array instanceof Array === false) {
                throw new TypeError('\n                "' + array + '" must be type of Array, \n                "' + array.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isObjectTypeOf',
        value: function isObjectTypeOf(givenObject, mustBe) {
            if (givenObject instanceof mustBe !== true) {
                throw new TypeError('\n                "' + givenObject.constructor.name + '" must be type ' + mustBe.name + ', \n                "' + givenObject.constructor.name + '" given.\n            ');
            }
        }
    }]);

    return TypeChecker;
}();

module.exports.TypeChecker = TypeChecker;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * filter constants
 */
var FILTER_IT_DOESNT_MATTER = 0;
var FILTER_MUST_ALL = 4;
var FILTER_MUST_ALL_WITH_LEVELS = 5;
var FILTER_AT_LEAST_ONE = 8;
var FILTER_EXCLUDE = 16;
var FILTER_PROMOTE = 32;
var FILTER_TYPE_FIELD = 'field';
var FILTER_TYPE_RANGE = 'range';
var FILTER_TYPE_DATE_RANGE = 'date_range';
var FILTER_TYPE_GEO = 'geo';
var FILTER_TYPE_QUERY = 'query';

/**
 * Filter class
 */

var Filter = function () {
    function Filter(field, values, applicationType, filterType) {
        var filterTerms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

        _classCallCheck(this, Filter);

        this.field = field;
        this.values = values;
        this.application_type = applicationType;
        this.filter_type = filterType;
        this.filter_terms = filterTerms;

        return this;
    }

    _createClass(Filter, null, [{
        key: 'getFilterPathByField',
        value: function getFilterPathByField(field) {
            return ['id', 'type'].indexOf(field) > -1 ? 'uuid.' + field : 'indexed_metadata.' + field;
        }
    }]);

    return Filter;
}();

module.exports = {
    FILTER_IT_DOESNT_MATTER: FILTER_IT_DOESNT_MATTER,
    FILTER_MUST_ALL: FILTER_MUST_ALL,
    FILTER_MUST_ALL_WITH_LEVELS: FILTER_MUST_ALL_WITH_LEVELS,
    FILTER_AT_LEAST_ONE: FILTER_AT_LEAST_ONE,
    FILTER_EXCLUDE: FILTER_EXCLUDE,
    FILTER_PROMOTE: FILTER_PROMOTE,
    FILTER_TYPE_FIELD: FILTER_TYPE_FIELD,
    FILTER_TYPE_RANGE: FILTER_TYPE_RANGE,
    FILTER_TYPE_DATE_RANGE: FILTER_TYPE_DATE_RANGE,
    FILTER_TYPE_GEO: FILTER_TYPE_GEO,
    FILTER_TYPE_QUERY: FILTER_TYPE_QUERY
};
module.exports.Filter = Filter;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ItemUUID class
 */
var ItemUUID = function () {
    function ItemUUID(id, type) {
        _classCallCheck(this, ItemUUID);

        this.id = id;
        this.type = type;
    }

    _createClass(ItemUUID, [{
        key: "composedUUID",
        value: function composedUUID() {
            return this.type + "~" + this.id;
        }
    }]);

    return ItemUUID;
}();

module.exports.ItemUUID = ItemUUID;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ItemUUID = __webpack_require__(4).ItemUUID;
var Coordinate = __webpack_require__(0).Coordinate;
var TypeChecker = __webpack_require__(2).TypeChecker;
var User = __webpack_require__(15).User;
var Aggregation = __webpack_require__(6).Aggregation;
var Filter = __webpack_require__(3).Filter;
var AbstractLocationRange = __webpack_require__(1).AbstractLocationRange;

var SORT_BY_SCORE = __webpack_require__(16);

var _require = __webpack_require__(3),
    FILTER_AT_LEAST_ONE = _require.FILTER_AT_LEAST_ONE,
    FILTER_EXCLUDE = _require.FILTER_EXCLUDE,
    FILTER_TYPE_DATE_RANGE = _require.FILTER_TYPE_DATE_RANGE,
    FILTER_TYPE_FIELD = _require.FILTER_TYPE_FIELD,
    FILTER_TYPE_GEO = _require.FILTER_TYPE_GEO,
    FILTER_TYPE_RANGE = _require.FILTER_TYPE_RANGE;

var _require2 = __webpack_require__(6),
    AGGREGATION_NO_LIMIT = _require2.AGGREGATION_NO_LIMIT,
    AGGREGATION_SORT_BY_COUNT_DESC = _require2.AGGREGATION_SORT_BY_COUNT_DESC;

/**
 * Query constants
 */


var QUERY_DEFAULT_FROM = 0;
var QUERY_DEFAULT_PAGE = 1;
var QUERY_DEFAULT_SIZE = 10;
var QUERY_INFINITE_SIZE = 1000;

/**
 * Query class
 */

var Query = function () {
    function Query(params) {
        _classCallCheck(this, Query);

        this.q = params.q;
        this.universe_filters = params.universe_filters || [];
        this.filters = params.filters || [];
        this.items_promoted = params.items_promoted || [];
        this.aggregations = params.aggregations || [];
        this.page = params.aggregations || QUERY_DEFAULT_PAGE;
        this.size = params.size || QUERY_DEFAULT_SIZE;
        this.from = params.from || QUERY_DEFAULT_FROM;
        this.aggregations_enabled = params.aggregations_enabled || true;
        this.suggestions_enabled = params.suggestions_enabled || false;
        this.highlight_enabled = params.highlight_enabled || false;
        this.filter_fields = params.filter_fields || [];
        this.user = params.user || null;
        this.coordinate = typeof params.coordinate !== 'undefined' ? new Coordinate(params.coordinate.lat, params.coordinate.lon) : null;
        this.sortBy(SORT_BY_SCORE);

        return this;
    }

    _createClass(Query, [{
        key: "filterBy",
        value: function filterBy(filterName, field, values) {
            var applicationType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : FILTER_AT_LEAST_ONE;
            var aggregate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
            var aggregationSort = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : AGGREGATION_SORT_BY_COUNT_DESC;

            TypeChecker.isArray(values);
            TypeChecker.isArray(aggregationSort);

            var fieldPath = Filter.getFilterPathByField(field);
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, filterName, new Filter(fieldPath, values, applicationType, FILTER_TYPE_FIELD)));
            } else {
                delete this.filters[field];
            }

            if (aggregate) {
                this.aggregateBy(filterName, field, applicationType, aggregationSort);
            }

            return this;
        }
    }, {
        key: "filterByTypes",
        value: function filterByTypes(values) {
            var aggregate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var aggregationSort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : AGGREGATION_SORT_BY_COUNT_DESC;

            TypeChecker.isArray(values);

            var fieldPath = Filter.getFilterPathByField('type');
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, 'type', new Filter(fieldPath, values, FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD)));
            } else {
                delete this.filters['type'];
            }

            if (aggregate) {
                this.aggregations = _extends({}, this.aggregations, _defineProperty({}, 'type', new Aggregation('type', fieldPath, FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD, [], aggregationSort)));
            }

            return this;
        }
    }, {
        key: "filterByIds",
        value: function filterByIds(values) {
            TypeChecker.isArray(values);

            var fieldPath = Filter.getFilterPathByField('id');
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, 'id', new Filter(fieldPath, values, FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD)));
            } else {
                delete this.filters['id'];
            }

            return this;
        }
    }, {
        key: "filterByRange",
        value: function filterByRange(filterName, field, options, values) {
            var applicationType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : FILTER_AT_LEAST_ONE;
            var rangeType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : FILTER_TYPE_RANGE;
            var aggregate = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
            var aggregationSort = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : AGGREGATION_SORT_BY_COUNT_DESC;

            TypeChecker.isArray(options);
            TypeChecker.isArray(values);

            var fieldPath = Filter.getFilterPathByField(field);
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, filterName, new Filter(fieldPath, values, applicationType, rangeType)));
            } else {
                delete this.filters[filterName];
            }

            if (aggregate) {
                this.aggregateByRange(filterName, fieldPath, options, applicationType, rangeType, aggregationSort);
            }

            return this;
        }
    }, {
        key: "filterByDateRange",
        value: function filterByDateRange(filterName, field, options, values) {
            var applicationType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : FILTER_AT_LEAST_ONE;
            var aggregate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
            var aggregationSort = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : AGGREGATION_SORT_BY_COUNT_DESC;

            return this.filterByRange(filterName, field, options, values, applicationType, FILTER_TYPE_DATE_RANGE, aggregate, aggregationSort);
        }
    }, {
        key: "filterUniverseBy",
        value: function filterUniverseBy(field, values) {
            var applicationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : FILTER_AT_LEAST_ONE;

            TypeChecker.isArray(values);

            var fieldPath = Filter.getFilterPathByField(field);
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, field, new Filter(fieldPath, values, applicationType, FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters[field];
            }

            return this;
        }
    }, {
        key: "filterUniverseByTypes",
        value: function filterUniverseByTypes(values) {
            TypeChecker.isArray(values);

            var fieldPath = Filter.getFilterPathByField('type');
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'type', new Filter(fieldPath, values, FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters['type'];
            }

            return this;
        }
    }, {
        key: "filterUniverseByIds",
        value: function filterUniverseByIds(values) {
            TypeChecker.isArray(values);

            var fieldPath = Filter.getFilterPathByField('id');
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'id', new Filter(fieldPath, values, FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters['id'];
            }

            return this;
        }
    }, {
        key: "filterUniverseByRange",
        value: function filterUniverseByRange(field, values) {
            var applicationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : FILTER_AT_LEAST_ONE;
            var rangeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : FILTER_TYPE_RANGE;

            TypeChecker.isArray(values);

            var fieldPath = Filter.getFilterPathByField(field);
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, field, new Filter(fieldPath, values, applicationType, rangeType)));
            } else {
                delete this.universe_filters[field];
            }

            return this;
        }
    }, {
        key: "filterUniverseByDateRange",
        value: function filterUniverseByDateRange(field, values) {
            var applicationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : FILTER_AT_LEAST_ONE;

            return this.filterUniverseByRange(field, values, applicationType, FILTER_TYPE_DATE_RANGE);
        }
    }, {
        key: "filterUniverseByLocation",
        value: function filterUniverseByLocation(locationRange) {
            TypeChecker.isObjectTypeOf(locationRange, AbstractLocationRange);

            this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'coordinate', new Filter('coordinate', locationRange.toFilterObject(), FILTER_AT_LEAST_ONE, FILTER_TYPE_GEO)));

            return this;
        }
    }, {
        key: "setFilterFields",
        value: function setFilterFields(fields) {
            var _this = this;

            TypeChecker.isArray(fields);

            if (fields.length === 0) {
                this.filter_fields = [].concat(_toConsumableArray(fields));

                return this;
            }

            fields.map(function (field) {
                _this.filter_fields = [].concat(_toConsumableArray(_this.filter_fields), [field]);
            });

            return this;
        }
    }, {
        key: "sortBy",
        value: function sortBy(sort) {
            var _this2 = this;

            TypeChecker.isDefined(sort);

            if (typeof sort['_geo_distance'] !== 'undefined') {
                var _geo_distance;

                if (this.coordinate instanceof Coordinate === false) {
                    throw new Error("\n                    In order to be able to sort by coordinates, you need to \n                    create a Query by using apisearch.query.createLocated(...) \n                    instead of apisearch.query.create(...)\n                ");
                }
                this.sort = _defineProperty({}, '_geo_distance', (_geo_distance = {}, _defineProperty(_geo_distance, 'coordinate', this.coordinate), _defineProperty(_geo_distance, 'order', sort._geo_distance.order), _defineProperty(_geo_distance, 'unit', sort._geo_distance.unit), _geo_distance));
            } else {
                Object.keys(sort).map(function (field) {
                    var direction = sort[field].order;
                    _this2.sort = _defineProperty({}, field, _defineProperty({}, 'order', direction));
                });
            }

            return this;
        }
    }, {
        key: "aggregateBy",
        value: function aggregateBy(filterName, field, applicationType) {
            var aggregationSort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : AGGREGATION_SORT_BY_COUNT_DESC;
            var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : AGGREGATION_NO_LIMIT;

            TypeChecker.isDefined(applicationType);
            TypeChecker.isInteger(applicationType);

            this.aggregations = _extends({}, this.aggregations, _defineProperty({}, filterName, new Aggregation(filterName, Filter.getFilterPathByField(field), applicationType, FILTER_TYPE_FIELD, [], aggregationSort, limit)));

            return this;
        }
    }, {
        key: "aggregateByRange",
        value: function aggregateByRange(filterName, field, options, applicationType) {
            var rangeType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : FILTER_TYPE_RANGE;
            var aggregationSort = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : AGGREGATION_SORT_BY_COUNT_DESC;
            var limit = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : AGGREGATION_NO_LIMIT;

            TypeChecker.isArray(options);

            if (options.length === 0) {
                return this;
            }

            this.aggregations = _extends({}, this.aggregations, _defineProperty({}, filterName, new Aggregation(filterName, Filter.getFilterPathByField(field), applicationType, rangeType, aggregationSort, limit)));

            return this;
        }
    }, {
        key: "aggregateByDateRange",
        value: function aggregateByDateRange(filterName, field, options, applicationType) {
            var aggregationSort = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : AGGREGATION_SORT_BY_COUNT_DESC;
            var limit = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : AGGREGATION_NO_LIMIT;

            TypeChecker.isArray(options);

            if (options.length === 0) {
                return this;
            }

            this.aggregations = _extends({}, this.aggregations, _defineProperty({}, filterName, new Aggregation(filterName, Filter.getFilterPathByField(field), applicationType, FILTER_TYPE_DATE_RANGE, aggregationSort, limit)));

            return this;
        }
    }, {
        key: "enableAggregations",
        value: function enableAggregations() {
            this.aggregations_enabled = true;
            return this;
        }
    }, {
        key: "disableAggregations",
        value: function disableAggregations() {
            this.aggregations_enabled = false;
            return this;
        }
    }, {
        key: "enableSuggestions",
        value: function enableSuggestions() {
            this.suggestions_enabled = true;
            return this;
        }
    }, {
        key: "disableSuggestions",
        value: function disableSuggestions() {
            this.suggestions_enabled = false;
            return this;
        }
    }, {
        key: "enableHighlights",
        value: function enableHighlights() {
            this.highlight_enabled = true;
            return this;
        }
    }, {
        key: "disableHighlights",
        value: function disableHighlights() {
            this.highlight_enabled = false;
            return this;
        }
    }, {
        key: "promoteUUID",
        value: function promoteUUID(itemUUID) {
            if (itemUUID instanceof ItemUUID === false) {
                throw new Error("Excluded item must be type \"ItemUUID\", \"" + itemUUID.constructor.name + "\" given.");
            }
            this.items_promoted = [].concat(_toConsumableArray(this.items_promoted), [itemUUID]);

            return this;
        }
    }, {
        key: "promoteUUIDs",
        value: function promoteUUIDs() {
            var _this3 = this;

            for (var _len = arguments.length, uuids = Array(_len), _key = 0; _key < _len; _key++) {
                uuids[_key] = arguments[_key];
            }

            uuids.forEach(function (uuid) {
                return _this3.promoteUUID(uuid);
            });

            return this;
        }
    }, {
        key: "excludeUUID",
        value: function excludeUUID(itemUUID) {
            TypeChecker.isObjectTypeOf(itemUUID, ItemUUID);
            this.excludeUUIDs(itemUUID);

            return this;
        }
    }, {
        key: "excludeUUIDs",
        value: function excludeUUIDs() {
            for (var _len2 = arguments.length, uuids = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                uuids[_key2] = arguments[_key2];
            }

            this.filters = _extends({}, this.filters, _defineProperty({}, 'excluded_ids', new Filter('_id', uuids.map(function (uuid) {
                return uuid.composedUUID();
            }), FILTER_EXCLUDE, FILTER_TYPE_FIELD)));

            return this;
        }
    }, {
        key: "byUser",
        value: function byUser(user) {
            TypeChecker.isObjectTypeOf(user, User);
            this.user = user;

            return this;
        }
    }, {
        key: "anonymously",
        value: function anonymously() {
            this.user = null;

            return null;
        }
    }]);

    return Query;
}();

module.exports = {
    QUERY_DEFAULT_FROM: QUERY_DEFAULT_FROM,
    QUERY_DEFAULT_PAGE: QUERY_DEFAULT_PAGE,
    QUERY_DEFAULT_SIZE: QUERY_DEFAULT_SIZE,
    QUERY_INFINITE_SIZE: QUERY_INFINITE_SIZE
};
module.exports.Query = Query;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Aggregation constants
 */
var AGGREGATION_SORT_BY_COUNT_ASC = ['_count', 'asc'];
var AGGREGATION_SORT_BY_COUNT_DESC = ['_count', 'desc'];
var AGGREGATION_SORT_BY_NAME_ASC = ['_term', 'asc'];
var AGGREGATION_SORT_BY_NAME_DESC = ['_term', 'desc'];
var AGGREGATION_NO_LIMIT = 0;

/**
 * Aggregation class
 */

var Aggregation = function Aggregation(name, field, applicationType, filterType, subgroup, sort, limit) {
    _classCallCheck(this, Aggregation);

    this.name = name;
    this.field = field;
    this.applicationType = applicationType;
    this.filterType = filterType;
    this.subgroup = subgroup;
    this.sort = sort || AGGREGATION_SORT_BY_COUNT_DESC;
    this.limit = limit || AGGREGATION_NO_LIMIT;
};

module.exports = {
    AGGREGATION_SORT_BY_COUNT_ASC: AGGREGATION_SORT_BY_COUNT_ASC,
    AGGREGATION_SORT_BY_COUNT_DESC: AGGREGATION_SORT_BY_COUNT_DESC,
    AGGREGATION_SORT_BY_NAME_ASC: AGGREGATION_SORT_BY_NAME_ASC,
    AGGREGATION_SORT_BY_NAME_DESC: AGGREGATION_SORT_BY_NAME_DESC,
    AGGREGATION_NO_LIMIT: AGGREGATION_NO_LIMIT
};
module.exports.Aggregation = Aggregation;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpRepository = __webpack_require__(8);
var SecureObjectFactory = __webpack_require__(10).SecureObjectFactory;
var QueryFactory = __webpack_require__(14).QueryFactory;

/**
 * Entry point for the Apisearch client
 *
 * @param apiKey
 * @param endpoint
 *
 * @returns {Apisearch}
 */
module.exports = function (apiKey, endpoint) {
    if (typeof apiKey === 'undefined') {
        throw new TypeError("ApiKey parameter must be defined.");
    }

    return new Apisearch('apisearch-app-id', apiKey, endpoint);
};

/**
 * Apisearch class
 */

var Apisearch = function () {
    function Apisearch(appId, apiKey) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Apisearch);

        this.appId = appId;
        this.apiKey = apiKey;
        this.endpoint = options.endpoint || 'http://127.0.0.1:9002/app.php';

        this.query = QueryFactory;
        this.createObject = SecureObjectFactory;

        this.repository = new HttpRepository(this.endpoint, this.apiKey, options.cache || true);
    }

    _createClass(Apisearch, [{
        key: "search",
        value: function search(query, callback) {
            return this.repository.query(query).then(function (response) {
                return callback(response, null);
            }).catch(function (error) {
                return callback(null, error);
            });
        }
    }]);

    return Apisearch;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Repository class
 */
var MemoryCache = __webpack_require__(9);

var HttpRepository = function () {
    /**
     * Constructor
     * @param endpoint
     * @param secret
     * @param cache
     */
    function HttpRepository(endpoint, secret, cache) {
        _classCallCheck(this, HttpRepository);

        this.endpoint = endpoint;
        this.secret = secret;
        this.cache = cache ? new MemoryCache() : null;
    }

    /**
     * Make query against the server
     * @param query
     * @returns {Promise}
     */


    _createClass(HttpRepository, [{
        key: "query",
        value: function query(_query) {
            _query = encodeURI(JSON.stringify(_query));
            var composedQuery = this.endpoint + "?key=" + this.secret + "&query=" + _query;

            // check if query exists in cache store
            // return promise with the cached value if key exists
            // if not exists, fetch data with XMLHttpRequest
            if (this.cache !== null) {
                var cachedResponse = this.cache.get(composedQuery);
                if (cachedResponse) {
                    return new Promise(function (resolve) {
                        return resolve(cachedResponse);
                    });
                }
            }

            return this.fetchData(composedQuery);
        }
    }, {
        key: "fetchData",
        value: function fetchData(composedQuery) {
            var self = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            var parsedResponse = JSON.parse(this.responseText);

                            // check if cache is enabled
                            // set the composedQuery as a cache key
                            // and the valid response as a cache value
                            if (this.cache !== null) {
                                self.cache.set(composedQuery, parsedResponse);
                            }

                            return resolve(parsedResponse);
                        } else {
                            return reject("Request error.");
                        }
                    }
                };

                xhr.open("GET", composedQuery, true);
                xhr.send();
            });
        }
    }]);

    return HttpRepository;
}();

module.exports = HttpRepository;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Cache class
 */
var MemoryCache = function () {
    function MemoryCache() {
        _classCallCheck(this, MemoryCache);

        this.cache = {};
        this.size = 0;

        return this;
    }

    _createClass(MemoryCache, [{
        key: "set",
        value: function set(key, value) {
            this.cache = _extends({}, this.cache, _defineProperty({}, key, value));
            this.size = this.size + 1;

            return this;
        }
    }, {
        key: "get",
        value: function get(key) {
            return this.cache[key];
        }
    }, {
        key: "clear",
        value: function clear() {
            this.cache = {};
            this.size = 0;
        }
    }]);

    return MemoryCache;
}();

module.exports = MemoryCache;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ItemUUID = __webpack_require__(4).ItemUUID;
var Coordinate = __webpack_require__(0).Coordinate;
var CoordinateAndDistance = __webpack_require__(11).CoordinateAndDistance;
var Square = __webpack_require__(12).Square;
var Polygon = __webpack_require__(13).Polygon;

/**
 * SecureObjectFactory class.
 */

var SecureObjectFactory = function () {
    function SecureObjectFactory() {
        _classCallCheck(this, SecureObjectFactory);
    }

    _createClass(SecureObjectFactory, null, [{
        key: "uuid",
        value: function uuid(id, type) {
            return new ItemUUID(id, type);
        }
    }, {
        key: "coordinate",
        value: function coordinate(lat, lon) {
            return new Coordinate(lat, lon);
        }
    }, {
        key: "coordinateAndDistance",
        value: function coordinateAndDistance(coordinate, distance) {
            return new CoordinateAndDistance(coordinate, distance);
        }
    }, {
        key: "square",
        value: function square(topLeftCoordinate, bottomRightCoordinate) {
            return new Square(topLeftCoordinate, bottomRightCoordinate);
        }
    }, {
        key: "polygon",
        value: function polygon() {
            for (var _len = arguments.length, coordinates = Array(_len), _key = 0; _key < _len; _key++) {
                coordinates[_key] = arguments[_key];
            }

            return new (Function.prototype.bind.apply(Polygon, [null].concat(coordinates)))();
        }
    }]);

    return SecureObjectFactory;
}();

module.exports.SecureObjectFactory = SecureObjectFactory;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractLocationRange = __webpack_require__(1).AbstractLocationRange;
var Coordinate = __webpack_require__(0).Coordinate;
var TypeChecker = __webpack_require__(2).TypeChecker;

var CoordinateAndDistance = function (_AbstractLocationRang) {
    _inherits(CoordinateAndDistance, _AbstractLocationRang);

    function CoordinateAndDistance(coordinate, distance) {
        var _ret;

        _classCallCheck(this, CoordinateAndDistance);

        var _this = _possibleConstructorReturn(this, (CoordinateAndDistance.__proto__ || Object.getPrototypeOf(CoordinateAndDistance)).call(this));

        TypeChecker.isObjectTypeOf(coordinate, Coordinate);
        TypeChecker.isString(distance);

        _this.coordinate = coordinate;
        _this.distance = distance;

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CoordinateAndDistance, [{
        key: "toFilterObject",
        value: function toFilterObject() {
            return {
                type: this.constructor.name,
                data: {
                    coordinate: this.coordinate,
                    distance: this.distance
                }
            };
        }
    }]);

    return CoordinateAndDistance;
}(AbstractLocationRange);

module.exports.CoordinateAndDistance = CoordinateAndDistance;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractLocationRange = __webpack_require__(1).AbstractLocationRange;
var Coordinate = __webpack_require__(0).Coordinate;
var TypeChecker = __webpack_require__(2).TypeChecker;

var Square = function (_AbstractLocationRang) {
    _inherits(Square, _AbstractLocationRang);

    function Square(topLeftCoordinate, bottomRightCoordinate) {
        var _ret;

        _classCallCheck(this, Square);

        TypeChecker.isObjectTypeOf(topLeftCoordinate, Coordinate);
        TypeChecker.isObjectTypeOf(bottomRightCoordinate, Coordinate);

        var _this = _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).call(this));

        _this.topLeftCoordinate = topLeftCoordinate;
        _this.bottomRightCoordinate = bottomRightCoordinate;

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Square, [{
        key: "toFilterObject",
        value: function toFilterObject() {
            return {
                type: this.constructor.name,
                data: {
                    0: this.topLeftCoordinate,
                    1: this.bottomRightCoordinate
                }
            };
        }
    }]);

    return Square;
}(AbstractLocationRange);

module.exports.Square = Square;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractLocationRange = __webpack_require__(1).AbstractLocationRange;
var Coordinate = __webpack_require__(0).Coordinate;
var TypeChecker = __webpack_require__(2).TypeChecker;

var Polygon = function (_AbstractLocationRang) {
    _inherits(Polygon, _AbstractLocationRang);

    function Polygon() {
        var _ret;

        _classCallCheck(this, Polygon);

        var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this));

        for (var _len = arguments.length, coordinates = Array(_len), _key = 0; _key < _len; _key++) {
            coordinates[_key] = arguments[_key];
        }

        if (coordinates.length < 3) {
            throw new Error("A polygon needs more than two coordinates.");
        }

        _this.coordinates = coordinates.map(function (coordinate) {
            TypeChecker.isObjectTypeOf(coordinate, Coordinate);

            return coordinate;
        });

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Polygon, [{
        key: "toFilterObject",
        value: function toFilterObject() {
            return {
                type: this.constructor.name,
                data: this.coordinates
            };
        }
    }]);

    return Polygon;
}(AbstractLocationRange);

module.exports.Polygon = Polygon;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(5),
    QUERY_DEFAULT_PAGE = _require.QUERY_DEFAULT_PAGE,
    QUERY_DEFAULT_SIZE = _require.QUERY_DEFAULT_SIZE,
    QUERY_INFINITE_SIZE = _require.QUERY_INFINITE_SIZE;

var Query = __webpack_require__(5).Query;

var _require2 = __webpack_require__(3),
    FILTER_AT_LEAST_ONE = _require2.FILTER_AT_LEAST_ONE,
    FILTER_TYPE_FIELD = _require2.FILTER_TYPE_FIELD;

var Filter = __webpack_require__(3).Filter;

/**
 * QueryFactory class
 */

var QueryFactory = function () {
    function QueryFactory() {
        _classCallCheck(this, QueryFactory);
    }

    _createClass(QueryFactory, null, [{
        key: "create",
        value: function create(q) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : QUERY_DEFAULT_PAGE;
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QUERY_DEFAULT_SIZE;

            return new Query({
                q: q,
                from: (page - 1) * size,
                page: page,
                size: size
            });
        }
    }, {
        key: "createMatchAll",
        value: function createMatchAll() {
            return new Query({
                q: '',
                page: QUERY_DEFAULT_PAGE,
                size: QUERY_INFINITE_SIZE
            });
        }
    }, {
        key: "createLocated",
        value: function createLocated(coordinate, queryText) {
            var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QUERY_DEFAULT_PAGE;
            var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : QUERY_DEFAULT_SIZE;

            return new Query({
                coordinate: coordinate,
                page: page,
                size: size,
                q: queryText
            });
        }
    }, {
        key: "createByUUID",
        value: function createByUUID(uuid) {
            return this.createByUUIDs(uuid);
        }
    }, {
        key: "createByUUIDs",
        value: function createByUUIDs() {
            for (var _len = arguments.length, uuids = Array(_len), _key = 0; _key < _len; _key++) {
                uuids[_key] = arguments[_key];
            }

            var ids = uuids.map(function (uuid) {
                return uuid.composedUUID();
            });
            var query = new Query({
                q: '',
                page: QUERY_DEFAULT_PAGE,
                size: QUERY_INFINITE_SIZE
            });

            query.disableAggregations().disableSuggestions();

            query.filters = _extends({}, query.filters, _defineProperty({}, '_id', new Filter('_id', ids.filter(function (item, pos) {
                return ids.indexOf(item) === pos;
            }), FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD)));

            return query;
        }
    }]);

    return QueryFactory;
}();

module.exports.QueryFactory = QueryFactory;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * User class
 */
var User = function User(id) {
    _classCallCheck(this, User);

    this.id = id;
};

module.exports.User = User;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 export * Sort by constants
 */

var SORT_BY_SCORE = {
    '_score': {
        'order': 'asc'
    }
};
var SORT_BY_RANDOM = {
    'random': {
        'order': 'asc'
    }
};
var SORT_BY_ID_ASC = {
    'uuid.id': {
        'order': 'asc'
    }
};
var SORT_BY_ID_DESC = {
    'uuid.id': {
        'order': 'desc'
    }
};
var SORT_BY_TYPE_ASC = {
    'uuid.type': {
        'order': 'asc'
    }
};
var SORT_BY_TYPE_DESC = {
    'uuid.type': {
        'order': 'desc'
    }
};
var SORT_BY_LOCATION_KM_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'km'
    }
};
var SORT_BY_LOCATION_MI_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'mi'
    }
};

module.exports = {
    SORT_BY_SCORE: SORT_BY_SCORE,
    SORT_BY_RANDOM: SORT_BY_RANDOM,
    SORT_BY_ID_ASC: SORT_BY_ID_ASC,
    SORT_BY_ID_DESC: SORT_BY_ID_DESC,
    SORT_BY_TYPE_ASC: SORT_BY_TYPE_ASC,
    SORT_BY_TYPE_DESC: SORT_BY_TYPE_DESC,
    SORT_BY_LOCATION_KM_ASC: SORT_BY_LOCATION_KM_ASC,
    SORT_BY_LOCATION_MI_ASC: SORT_BY_LOCATION_MI_ASC
};

/***/ })
/******/ ]);
//# sourceMappingURL=apisearch.js.map