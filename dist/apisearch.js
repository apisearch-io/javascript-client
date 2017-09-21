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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

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

exports.default = ItemUUID;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * filter constants
 */
var FILTER_IT_DOESNT_MATTER = exports.FILTER_IT_DOESNT_MATTER = 0;
var FILTER_MUST_ALL = exports.FILTER_MUST_ALL = 4;
var FILTER_MUST_ALL_WITH_LEVELS = exports.FILTER_MUST_ALL_WITH_LEVELS = 5;
var FILTER_AT_LEAST_ONE = exports.FILTER_AT_LEAST_ONE = 8;
var FILTER_EXCLUDE = exports.FILTER_EXCLUDE = 16;
var FILTER_PROMOTE = exports.FILTER_PROMOTE = 32;
var FILTER_TYPE_FIELD = exports.FILTER_TYPE_FIELD = 'field';
var FILTER_TYPE_RANGE = exports.FILTER_TYPE_RANGE = 'range';
var FILTER_TYPE_DATE_RANGE = exports.FILTER_TYPE_DATE_RANGE = 'date_range';
var FILTER_TYPE_GEO = exports.FILTER_TYPE_GEO = 'geo';
var FILTER_TYPE_QUERY = exports.FILTER_TYPE_QUERY = 'query';

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

exports.default = Filter;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Apisearch entry point
                                                                                                                                                                                                                                                                   */


var _Repository = __webpack_require__(3);

var _Repository2 = _interopRequireDefault(_Repository);

var _ItemUUID = __webpack_require__(0);

var _ItemUUID2 = _interopRequireDefault(_ItemUUID);

var _Query = __webpack_require__(4);

var _Query2 = _interopRequireDefault(_Query);

var _Filter = __webpack_require__(1);

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cache = {};

var client = function client(repository, secret, endpoint) {
    this.repository = repository;
    this.secret = secret;
    this.endpoint = endpoint || 'http://127.0.0.1:9002/app.php';
};

var search = function search(query, callback) {
    var repository = new _Repository2.default(this.endpoint, this.secret);

    return repository.query(query).then(function (response) {
        return callback(response, null);
    }).catch(function (error) {
        return callback(null, error);
    });
};

var createUUID = function createUUID(id, type) {
    return new _ItemUUID2.default(id, type);
};

var query = {
    create: function create(q) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Query.QUERY_DEFAULT_PAGE;
        var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Query.QUERY_DEFAULT_SIZE;

        return new _Query2.default({
            q: q,
            from: (page - 1) * size,
            page: page,
            size: size
        });
    },
    createMatchAll: function createMatchAll() {
        return new _Query2.default({
            q: '',
            page: _Query.QUERY_DEFAULT_PAGE,
            size: _Query.QUERY_INFINITE_SIZE
        });
    },
    createLocated: function createLocated(coordinate, queryText) {
        var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Query.QUERY_DEFAULT_PAGE;
        var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Query.QUERY_DEFAULT_SIZE;

        return new _Query2.default({
            coordinate: coordinate,
            page: page,
            size: size,
            q: queryText
        });
    },
    createByUUID: function createByUUID(uuid) {
        return this.createByUUIDs([uuid]);
    },
    createByUUIDs: function createByUUIDs(uuids) {
        var ids = uuids.map(function (uuid) {
            return uuid.composedUUID();
        });
        var query = new _Query2.default({
            q: '',
            page: _Query.QUERY_DEFAULT_PAGE,
            size: _Query.QUERY_INFINITE_SIZE
        });

        query.disableAggregations().disableSuggestions();

        query.filters = _extends({}, query.filters, _defineProperty({}, '_id', new _Filter2.default('_id', ids.filter(function (item, pos) {
            return ids.indexOf(item) === pos;
        }), _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));

        return query;
    }
};

module.exports = {
    cache: cache,
    client: client,
    search: search,
    createUUID: createUUID,
    query: query
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Repository class
 */
var HttpRepository = function () {
    /**
     * Constructor
     * @param endpoint
     * @param secret
     */
    function HttpRepository(endpoint, secret) {
        _classCallCheck(this, HttpRepository);

        this.endpoint = endpoint;
        this.secret = secret;
    }

    /**
     * Make query against the server
     * @param query
     * @returns {Promise}
     */


    _createClass(HttpRepository, [{
        key: "query",
        value: function query(_query) {
            _query = JSON.stringify(_query);
            var composedQuery = this.endpoint + "?key=" + this.secret + "&query=" + _query;

            return this.fetchData(composedQuery);
        }
    }, {
        key: "fetchData",
        value: function fetchData(composedQuery) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            return resolve(JSON.parse(this.responseText));
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

exports.default = HttpRepository;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QUERY_INFINITE_SIZE = exports.QUERY_DEFAULT_SIZE = exports.QUERY_DEFAULT_PAGE = exports.QUERY_DEFAULT_FROM = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Aggregation = __webpack_require__(5);

var _Aggregation2 = _interopRequireDefault(_Aggregation);

var _ItemUUID = __webpack_require__(0);

var _ItemUUID2 = _interopRequireDefault(_ItemUUID);

var _Coordinate = __webpack_require__(6);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _TypeChecker = __webpack_require__(7);

var _TypeChecker2 = _interopRequireDefault(_TypeChecker);

var _Filter = __webpack_require__(1);

var _Filter2 = _interopRequireDefault(_Filter);

var _SortBy = __webpack_require__(8);

var _User = __webpack_require__(9);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Query constants
 */
var QUERY_DEFAULT_FROM = exports.QUERY_DEFAULT_FROM = 0;
var QUERY_DEFAULT_PAGE = exports.QUERY_DEFAULT_PAGE = 1;
var QUERY_DEFAULT_SIZE = exports.QUERY_DEFAULT_SIZE = 10;
var QUERY_INFINITE_SIZE = exports.QUERY_INFINITE_SIZE = 1000;

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
        this.coordinate = typeof params.coordinate !== 'undefined' ? new _Coordinate2.default(params.coordinate.lat, params.coordinate.lon) : null;
        this.sortBy(_SortBy.SORT_BY_SCORE);

        return this;
    }

    _createClass(Query, [{
        key: "filterBy",
        value: function filterBy(filterName, field, values) {
            var applicationType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Filter.FILTER_AT_LEAST_ONE;
            var aggregate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
            var aggregationSort = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;

            _TypeChecker2.default.isArray(values);
            _TypeChecker2.default.isArray(aggregationSort);

            var fieldPath = _Filter2.default.getFilterPathByField(field);
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, filterName, new _Filter2.default(fieldPath, values, applicationType, _Filter.FILTER_TYPE_FIELD)));
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
            var aggregationSort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;

            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('type');
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, 'type', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.filters['type'];
            }

            if (aggregate) {
                this.aggregations = _extends({}, this.aggregations, _defineProperty({}, 'type', new _Aggregation2.default('type', fieldPath, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD, [], aggregationSort)));
            }

            return this;
        }
    }, {
        key: "filterByIds",
        value: function filterByIds(values) {
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('id');
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, 'id', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.filters['id'];
            }

            return this;
        }
    }, {
        key: "filterUniverseBy",
        value: function filterUniverseBy(field, values) {
            var applicationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Filter.FILTER_AT_LEAST_ONE;

            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField(field);
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, field, new _Filter2.default(fieldPath, values, applicationType, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters[field];
            }

            return this;
        }
    }, {
        key: "filterUniverseByTypes",
        value: function filterUniverseByTypes(values) {
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('type');
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'type', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters['type'];
            }

            return this;
        }
    }, {
        key: "filterUniverseByIds",
        value: function filterUniverseByIds(values) {
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('id');
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'id', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters['id'];
            }

            return this;
        }
    }, {
        key: "aggregateBy",
        value: function aggregateBy(filterName, field, applicationType) {
            var aggregationSort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;
            var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Aggregation.AGGREGATION_NO_LIMIT;

            this.aggregations = _extends({}, this.aggregations, _defineProperty({}, filterName, new _Aggregation2.default(filterName, _Filter2.default.getFilterPathByField(field), applicationType, _Filter.FILTER_TYPE_FIELD, [], aggregationSort, limit)));

            return this;
        }
    }, {
        key: "sortBy",
        value: function sortBy(sort) {
            var _this = this;

            _TypeChecker2.default.isDefined(sort);

            if (typeof sort['_geo_distance'] !== 'undefined') {
                var _geo_distance;

                if (this.coordinate instanceof _Coordinate2.default === false) {
                    throw new Error("\n                    In order to be able to sort by coordinates, you need to \n                    create a Query by using apisearch.query.createLocated(...) \n                    instead of apisearch.query.create(...)\n                ");
                }
                this.sort = _defineProperty({}, '_geo_distance', (_geo_distance = {}, _defineProperty(_geo_distance, 'coordinate', this.coordinate), _defineProperty(_geo_distance, 'order', sort._geo_distance.order), _defineProperty(_geo_distance, 'unit', sort._geo_distance.unit), _geo_distance));
            } else {
                Object.keys(sort).map(function (field) {
                    var direction = sort[field].order;
                    _this.sort = _defineProperty({}, field, _defineProperty({}, 'order', direction));
                });
            }

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
            if (itemUUID instanceof _ItemUUID2.default === false) {
                throw new Error("Excluded item must be type \"ItemUUID\", \"" + itemUUID.constructor.name + "\" given.");
            }
            this.items_promoted = [].concat(_toConsumableArray(this.items_promoted), [itemUUID]);

            return this;
        }
    }, {
        key: "promoteUUIDs",
        value: function promoteUUIDs(uuids) {
            var _this2 = this;

            [].concat(_toConsumableArray(uuids)).forEach(function (uuid) {
                return _this2.promoteUUID(uuid);
            });

            return this;
        }
    }, {
        key: "excludeUUID",
        value: function excludeUUID(itemUUID) {
            _TypeChecker2.default.isObjectTypeOf(itemUUID, _ItemUUID2.default);
            this.excludeUUIDs([itemUUID]);

            return this;
        }
    }, {
        key: "excludeUUIDs",
        value: function excludeUUIDs(uuids) {
            this.filters = _extends({}, this.filters, _defineProperty({}, 'excluded_ids', new _Filter2.default('_id', [].concat(_toConsumableArray(uuids)).map(function (uuid) {
                return uuid.composedUUID();
            }), _Filter.FILTER_EXCLUDE, _Filter.FILTER_TYPE_FIELD)));

            return this;
        }
    }, {
        key: "byUser",
        value: function byUser(user) {
            _TypeChecker2.default.isObjectTypeOf(user, _User2.default);
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

exports.default = Query;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Aggregation constants
 */
var AGGREGATION_SORT_BY_COUNT_ASC = exports.AGGREGATION_SORT_BY_COUNT_ASC = ['_count', 'asc'];
var AGGREGATION_SORT_BY_COUNT_DESC = exports.AGGREGATION_SORT_BY_COUNT_DESC = ['_count', 'desc'];
var AGGREGATION_SORT_BY_NAME_ASC = exports.AGGREGATION_SORT_BY_NAME_ASC = ['_term', 'asc'];
var AGGREGATION_SORT_BY_NAME_DESC = exports.AGGREGATION_SORT_BY_NAME_DESC = ['_term', 'desc'];
var AGGREGATION_NO_LIMIT = exports.AGGREGATION_NO_LIMIT = 0;

/**
 * Aggregation class
 */

var Aggregation = function Aggregation(name, field, applicationType, filterType, subgroup) {
    var sort = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : AGGREGATION_SORT_BY_COUNT_DESC;
    var limit = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : AGGREGATION_NO_LIMIT;

    _classCallCheck(this, Aggregation);

    this.name = name;
    this.field = field;
    this.applicationType = applicationType;
    this.filterType = filterType;
    this.subgroup = subgroup;
    this.sort = sort;
    this.limit = limit;
};

exports.default = Aggregation;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

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

exports.default = Coordinate;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

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
        key: 'isArray',
        value: function isArray(array) {
            if (array instanceof Array === false) {
                throw new TypeError('\n                "' + array + '" must be type of Array, \n                "' + values.constructor.name + '" given.\n            ');
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
        key: 'isObjectTypeOf',
        value: function isObjectTypeOf(givenObject, mustBe) {
            if (givenObject instanceof mustBe !== true) {
                throw new TypeError('\n                "' + givenObject.constructor.name + '" must be type ' + mustBe.name + ', \n                "' + givenObject.constructor.name + '" given.\n            ');
            }
        }
    }]);

    return TypeChecker;
}();

exports.default = TypeChecker;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 export * Sort by constants
 */

var SORT_BY_SCORE = exports.SORT_BY_SCORE = {
    '_score': {
        'order': 'asc'
    }
};
var SORT_BY_RANDOM = exports.SORT_BY_RANDOM = {
    'random': {
        'order': 'asc'
    }
};
var SORT_BY_ID_ASC = exports.SORT_BY_ID_ASC = {
    'uuid.id': {
        'order': 'asc'
    }
};
var SORT_BY_ID_DESC = exports.SORT_BY_ID_DESC = {
    'uuid.id': {
        'order': 'desc'
    }
};
var SORT_BY_TYPE_ASC = exports.SORT_BY_TYPE_ASC = {
    'uuid.type': {
        'order': 'asc'
    }
};
var SORT_BY_TYPE_DESC = exports.SORT_BY_TYPE_DESC = {
    'uuid.type': {
        'order': 'desc'
    }
};
var SORT_BY_LOCATION_KM_ASC = exports.SORT_BY_LOCATION_KM_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'km'
    }
};
var SORT_BY_LOCATION_MI_ASC = exports.SORT_BY_LOCATION_MI_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'mi'
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * User class
 */
var User = function User(id) {
    _classCallCheck(this, User);

    this.id = id;
};

exports.default = User;

/***/ })
/******/ ]);
//# sourceMappingURL=apisearch.js.map