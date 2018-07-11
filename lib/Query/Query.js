"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Coordinate_1 = require("../Model/Coordinate");
var ItemUUID_1 = require("../Model/ItemUUID");
var User_1 = require("../Model/User");
var Aggregation_1 = require("./Aggregation");
var Filter_1 = require("./Filter");
var Filter_2 = require("./Filter");
var Aggregation_2 = require("./Aggregation");
var InvalidFormatError_1 = require("../Error/InvalidFormatError");
var Filter_3 = require("./Filter");
var ScoreStrategy_1 = require("./ScoreStrategy");
var SortBy_1 = require("./SortBy");
/**
 * Query constants
 */
exports.QUERY_DEFAULT_FROM = 0;
exports.QUERY_DEFAULT_PAGE = 1;
exports.QUERY_DEFAULT_SIZE = 10;
exports.QUERY_INFINITE_SIZE = 1000;
/**
 * Query class
 */
var Query = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param queryText
     */
    function Query(queryText) {
        this.universeFilters = {};
        this.filters = {};
        this.itemsPromoted = [];
        this.aggregations = {};
        this.filterFields = [];
        this.sortByInstance = SortBy_1.SortBy.create();
        this.filters._query = Filter_1.Filter.create("", [queryText], 0, Filter_3.FILTER_TYPE_QUERY);
    }
    /**
     * Created located
     *
     * @param coordinate
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    Query.createLocated = function (coordinate, queryText, page, size) {
        if (page === void 0) { page = exports.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = exports.QUERY_DEFAULT_SIZE; }
        var query = Query.create(queryText, page, size);
        query.coordinate = coordinate;
        return query;
    };
    /**
     * Create
     *
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    Query.create = function (queryText, page, size) {
        if (page === void 0) { page = exports.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = exports.QUERY_DEFAULT_SIZE; }
        page = Math.max(1, page);
        var query = new Query(queryText);
        query.from = (page - 1) * size;
        query.size = size;
        query.page = page;
        return query;
    };
    /**
     * Create match all
     *
     * @return {Query}
     */
    Query.createMatchAll = function () {
        return Query.create("", exports.QUERY_DEFAULT_PAGE, exports.QUERY_DEFAULT_SIZE);
    };
    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    Query.createByUUID = function (uuid) {
        return Query.createByUUIDs(uuid);
    };
    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Query.createByUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        var ids = [];
        for (var i in uuids) {
            ids.push(uuids[i].composedUUID());
        }
        var query = Query.create("", exports.QUERY_DEFAULT_PAGE, ids.length)
            .disableAggregations()
            .disableSuggestions();
        query.filters._id = Filter_1.Filter.create("_id", ids, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD);
        return query;
    };
    /**
     * Filter universe by types
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByTypes = function (values) {
        var fieldPath = Filter_1.Filter.getFilterPathByField("type");
        if (values.length > 0) {
            this.universeFilters = __assign({}, this.universeFilters, (_a = {}, _a["type"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters.type;
        }
        return this;
        var _a;
    };
    /**
     * Filter by types
     *
     * @param values
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterByTypes = function (values, aggregate, aggregationSort) {
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var fieldPath = Filter_1.Filter.getFilterPathByField("type");
        if (values.length > 0) {
            this.filters = __assign({}, this.filters, (_a = {}, _a["type"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters.type;
        }
        if (aggregate) {
            this.aggregations = __assign({}, this.aggregations, (_b = {}, _b["type"] = Aggregation_1.Aggregation.create("type", fieldPath, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD, [], aggregationSort), _b));
        }
        return this;
        var _a, _b;
    };
    /**
     * Filter universe by ids
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByIds = function (values) {
        var fieldPath = Filter_1.Filter.getFilterPathByField("id");
        if (values.length > 0) {
            this.universeFilters = __assign({}, this.universeFilters, (_a = {}, _a["id"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters.id;
        }
        return this;
        var _a;
    };
    /**
     * Filter by ids
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterByIds = function (values) {
        var fieldPath = Filter_1.Filter.getFilterPathByField("id");
        if (values.length > 0) {
            this.filters = __assign({}, this.filters, (_a = {}, _a["id"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters.id;
        }
        return this;
        var _a;
    };
    /**
     * Filter universe by
     *
     * @param field
     * @param values
     * @param applicationType
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseBy = function (field, values, applicationType) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        var fieldPath = Filter_1.Filter.getFilterPathByField(field);
        if (values.length > 0) {
            this.universeFilters = __assign({}, this.universeFilters, (_a = {}, _a[field] = Filter_1.Filter.create(fieldPath, values, applicationType, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters[field];
        }
        return this;
        var _a;
    };
    /**
     * Filter by
     *
     * @param filterName
     * @param field
     * @param values
     * @param applicationType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterBy = function (filterName, field, values, applicationType, aggregate, aggregationSort) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var fieldPath = Filter_1.Filter.getFilterPathByField(field);
        if (values.length > 0) {
            this.filters = __assign({}, this.filters, (_a = {}, _a[filterName] = Filter_1.Filter.create(fieldPath, values, applicationType, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters[filterName];
        }
        if (aggregate) {
            this.aggregateBy(filterName, field, applicationType, aggregationSort);
        }
        return this;
        var _a;
    };
    /**
     * Filter universe by range
     *
     * @param field
     * @param values
     * @param applicationType
     * @param rangeType
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByRange = function (field, values, applicationType, rangeType) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        var fieldPath = Filter_1.Filter.getFilterPathByField(field);
        if (values.length > 0) {
            this.universeFilters = __assign({}, this.universeFilters, (_a = {}, _a[field] = Filter_1.Filter.create(fieldPath, values, applicationType, rangeType), _a));
        }
        else {
            delete this.universeFilters[field];
        }
        return this;
        var _a;
    };
    /**
     * Filter universe by date range
     *
     * @param field
     * @param values
     * @param applicationType
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByDateRange = function (field, values, applicationType) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        return this.filterUniverseByRange(field, values, applicationType, Filter_2.FILTER_TYPE_DATE_RANGE);
    };
    /**
     * Filter by range
     *
     * @param filterName
     * @param field
     * @param options
     * @param values
     * @param applicationType
     * @param rangeType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterByRange = function (filterName, field, options, values, applicationType, rangeType, aggregate, aggregationSort) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var fieldPath = Filter_1.Filter.getFilterPathByField(field);
        if (values.length !== 0) {
            this.filters = __assign({}, this.filters, (_a = {}, _a[filterName] = Filter_1.Filter.create(fieldPath, values, applicationType, rangeType), _a));
        }
        else {
            delete this.filters[filterName];
        }
        if (aggregate) {
            this.aggregateByRange(filterName, fieldPath, options, applicationType, rangeType, aggregationSort);
        }
        return this;
        var _a;
    };
    /**
     * Filter by date range
     *
     * @param filterName
     * @param field
     * @param options
     * @param values
     * @param applicationType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterByDateRange = function (filterName, field, options, values, applicationType, aggregate, aggregationSort) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        return this.filterByRange(filterName, field, options, values, applicationType, Filter_2.FILTER_TYPE_DATE_RANGE, aggregate, aggregationSort);
    };
    /**
     * Filter universe by location
     *
     * @param locationRange
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByLocation = function (locationRange) {
        this.universeFilters = __assign({}, this.universeFilters, (_a = {}, _a["coordinate"] = Filter_1.Filter.create("coordinate", locationRange.toArray(), Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_GEO), _a));
        return this;
        var _a;
    };
    /**
     * Set filter fields
     *
     * @param filterFields
     *
     * @return {Query}
     */
    Query.prototype.setFilterFields = function (filterFields) {
        this.filterFields = filterFields;
        return this;
    };
    /**
     * Get filter fields
     *
     * @return {string[]}
     */
    Query.prototype.getFilterFields = function () {
        return this.filterFields;
    };
    /**
     * Sort by
     *
     * @param sortBy
     *
     * @return {Query}
     */
    Query.prototype.sortBy = function (sortBy) {
        if (sortBy.isSortedByGeoDistance()) {
            if (!(this.coordinate instanceof Coordinate_1.Coordinate)) {
                throw InvalidFormatError_1.InvalidFormatError.querySortedByDistanceWithoutCoordinate();
            }
            sortBy.setCoordinate(this.coordinate);
        }
        this.sortByInstance = sortBy;
        return this;
    };
    /**
     * Aggregate by
     *
     * @param filterName
     * @param field
     * @param applicationType
     * @param aggregationSort
     * @param limit
     *
     * @return {Query}
     */
    Query.prototype.aggregateBy = function (filterName, field, applicationType, aggregationSort, limit) {
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        this.aggregations = __assign({}, this.aggregations, (_a = {}, _a[filterName] = Aggregation_1.Aggregation.create(filterName, Filter_1.Filter.getFilterPathByField(field), applicationType, Filter_2.FILTER_TYPE_FIELD, [], aggregationSort, limit), _a));
        return this;
        var _a;
    };
    /**
     * Aggregate by range
     *
     * @param filterName
     * @param field
     * @param options
     * @param applicationType
     * @param rangeType
     * @param aggregationSort
     * @param limit
     *
     * @return {Query}
     */
    Query.prototype.aggregateByRange = function (filterName, field, options, applicationType, rangeType, aggregationSort, limit) {
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        if (options.length === 0) {
            return this;
        }
        this.aggregations = __assign({}, this.aggregations, (_a = {}, _a[filterName] = Aggregation_1.Aggregation.create(filterName, Filter_1.Filter.getFilterPathByField(field), applicationType, rangeType, options, aggregationSort, limit), _a));
        return this;
        var _a;
    };
    /**
     * Aggregate by date range
     *
     * @param filterName
     * @param field
     * @param options
     * @param applicationType
     * @param aggregationSort
     * @param limit
     *
     * @return {Query}
     */
    Query.prototype.aggregateByDateRange = function (filterName, field, options, applicationType, aggregationSort, limit) {
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        return this.aggregateByRange(filterName, field, options, applicationType, Filter_2.FILTER_TYPE_DATE_RANGE, aggregationSort, limit);
    };
    /**
     * Get aggregations
     *
     * @return {{}}
     */
    Query.prototype.getAggregations = function () {
        return this.aggregations;
    };
    /**
     * Get aggregation by name
     *
     * @param aggregationName
     *
     * @return {Aggregation|null}
     */
    Query.prototype.getAggregation = function (aggregationName) {
        return this.aggregations[aggregationName] instanceof Aggregation_1.Aggregation
            ? this.aggregations[aggregationName]
            : null;
    };
    /**
     * Get query text
     *
     * @return {string}
     */
    Query.prototype.getQueryText = function () {
        var filter = this.filters._query;
        return filter instanceof Filter_1.Filter
            ? filter.getValues()[0]
            : "";
    };
    /**
     * Get universe filters
     *
     * @return {{}}
     */
    Query.prototype.getUniverseFilters = function () {
        return this.universeFilters;
    };
    /**
     * Get universe filter by name
     *
     * @param filterName
     *
     * @return {Filter|null}
     */
    Query.prototype.getUniverseFilter = function (filterName) {
        return this.universeFilters[filterName] instanceof Filter_1.Filter
            ? this.universeFilters[filterName]
            : null;
    };
    /**
     * Get filters
     *
     * @return {{}}
     */
    Query.prototype.getFilters = function () {
        return this.filters;
    };
    /**
     * Get filter by name
     *
     * @param filterName
     *
     * @return {Filter|null}
     */
    Query.prototype.getFilter = function (filterName) {
        return this.filters[filterName] instanceof Filter_1.Filter
            ? this.filters[filterName]
            : null;
    };
    /**
     * Get filter by field
     *
     * @param fieldName
     *
     * @return {Filter|null}
     */
    Query.prototype.getFilterByField = function (fieldName) {
        var fieldPath = Filter_1.Filter.getFilterPathByField(fieldName);
        for (var i in this.filters) {
            if (this.filters[i].getField() == fieldPath) {
                return this.filters[i];
            }
        }
        return null;
    };
    /**
     * Get sort by
     *
     * @return {SortBy}
     */
    Query.prototype.getSortBy = function () {
        return this.sortByInstance;
    };
    /**
     * Get from
     *
     * @return {number}
     */
    Query.prototype.getFrom = function () {
        return this.from;
    };
    /**
     * Get size
     *
     * @return {number}
     */
    Query.prototype.getSize = function () {
        return this.size;
    };
    /**
     * Get page
     *
     * @return {number}
     */
    Query.prototype.getPage = function () {
        return this.page;
    };
    /**
     * Enable results
     *
     * @return {Query}
     */
    Query.prototype.enableResults = function () {
        this.resultsEnabled = true;
        return this;
    };
    /**
     * Disable results
     *
     * @return {Query}
     */
    Query.prototype.disableResults = function () {
        this.resultsEnabled = false;
        return this;
    };
    /**
     * Are results enabled
     *
     * @return {boolean}
     */
    Query.prototype.areResultsEnabled = function () {
        return this.resultsEnabled;
    };
    /**
     * Enable aggregations
     *
     * @return {Query}
     */
    Query.prototype.enableAggregations = function () {
        this.aggregationsEnabled = true;
        return this;
    };
    /**
     * Disable aggregations
     *
     * @return {Query}
     */
    Query.prototype.disableAggregations = function () {
        this.aggregationsEnabled = false;
        return this;
    };
    /**
     * Are aggregations enabled
     *
     * @return {boolean}
     */
    Query.prototype.areAggregationsEnabled = function () {
        return this.aggregationsEnabled;
    };
    /**
     * Enable suggestions
     *
     * @return {Query}
     */
    Query.prototype.enableSuggestions = function () {
        this.suggestionsEnabled = true;
        return this;
    };
    /**
     * Disable suggestions
     *
     * @return {Query}
     */
    Query.prototype.disableSuggestions = function () {
        this.suggestionsEnabled = false;
        return this;
    };
    /**
     * Are suggestions enabled
     *
     * @return {boolean}
     */
    Query.prototype.areSuggestionsEnabled = function () {
        return this.suggestionsEnabled;
    };
    /**
     * Enable highlights
     *
     * @return {Query}
     */
    Query.prototype.enableHighlights = function () {
        this.highlightsEnabled = true;
        return this;
    };
    /**
     * Disable highlights
     *
     * @return {Query}
     */
    Query.prototype.disableHighlights = function () {
        this.highlightsEnabled = false;
        return this;
    };
    /**
     * Are highlights enabled
     *
     * @return {boolean}
     */
    Query.prototype.areHighlightsEnabled = function () {
        return this.highlightsEnabled;
    };
    /**
     * Promote uuid
     *
     * @param itemUUID
     *
     * @return {Query}
     */
    Query.prototype.promoteUUID = function (itemUUID) {
        this
            .itemsPromoted
            .push(itemUUID);
        return this;
    };
    /**
     * Promote UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Query.prototype.promoteUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        this.itemsPromoted = uuids;
        return this;
    };
    /**
     * Get promoted UUIDs
     *
     * @return {ItemUUID[]}
     */
    Query.prototype.getItemsPromoted = function () {
        return this.itemsPromoted;
    };
    /**
     * Exclude id
     *
     * @param itemUUID
     *
     * @return {Query}
     */
    Query.prototype.excludeUUID = function (itemUUID) {
        this.excludeUUIDs(itemUUID);
        return this;
    };
    /**
     * Exclude UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Query.prototype.excludeUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        this.filters = __assign({}, this.filters, (_a = {}, _a["excluded_ids"] = Filter_1.Filter.create("_id", uuids.map(function (uuid) { return uuid.composedUUID(); }), Filter_2.FILTER_EXCLUDE, Filter_2.FILTER_TYPE_FIELD), _a));
        return this;
        var _a;
    };
    /**
     * Get score strategy
     *
     * @return {ScoreStrategy}
     */
    Query.prototype.getScoreStrategy = function () {
        return this.scoreStrategy;
    };
    /**
     * Set score strategy
     *
     * @param scoreStrategy
     */
    Query.prototype.setScoreStrategy = function (scoreStrategy) {
        this.scoreStrategy = scoreStrategy;
        return this;
    };
    /**
     * By user
     *
     * @param user
     *
     * @return {Query}
     */
    Query.prototype.byUser = function (user) {
        this.user = user;
        return this;
    };
    /**
     * By anyone
     *
     * @return {null}
     */
    Query.prototype.anonymously = function () {
        this.user = null;
        return null;
    };
    /**
     * Get user
     *
     * @return {User}
     */
    Query.prototype.getUser = function () {
        return this.user;
    };
    /**
     * To array
     *
     * @return {any}
     */
    Query.prototype.toArray = function () {
        var array = {};
        if (this.getQueryText() !== "") {
            array.q = this.getQueryText();
        }
        if (this.coordinate instanceof Coordinate_1.Coordinate) {
            array.coordinate = this.coordinate.toArray();
        }
        /**
         * Universe Filters
         */
        if (Object.keys(this.universeFilters).length) {
            array.universe_filters = {};
            for (var i in this.universeFilters) {
                var universeFilter = this.universeFilters[i];
                array.universe_filters[i] = universeFilter.toArray();
            }
        }
        /**
         * Filters
         */
        if (this.filters instanceof Object &&
            Object.keys(this.filters).length) {
            array.filters = {};
            for (var i in this.filters) {
                var filter = this.filters[i];
                if (filter.getFilterType() !== Filter_3.FILTER_TYPE_QUERY) {
                    array.filters[i] = filter.toArray();
                }
            }
        }
        /**
         * Aggregations
         */
        if (this.aggregations instanceof Object &&
            Object.keys(this.aggregations).length) {
            array.aggregations = {};
            for (var i in this.aggregations) {
                var aggregation = this.aggregations[i];
                array.aggregations[i] = aggregation.toArray();
            }
        }
        /**
         * Sort
         */
        var sort = this.sortByInstance.toArray();
        if (Object.keys(sort).length) {
            array.sort = sort;
        }
        /**
         * Page
         */
        var page = this.page;
        if (page !== exports.QUERY_DEFAULT_PAGE) {
            array.page = page;
        }
        /**
         * Size
         */
        var size = this.size;
        if (size !== exports.QUERY_DEFAULT_SIZE) {
            array.size = size;
        }
        /**
         * Booleans
         */
        if (this.resultsEnabled === false) {
            array.results_enabled = false;
        }
        if (this.suggestionsEnabled === true) {
            array.suggestions_enabled = true;
        }
        if (this.highlightsEnabled === true) {
            array.highlights_enabled = true;
        }
        if (this.aggregationsEnabled === false) {
            array.aggregations_enabled = false;
        }
        /**
         * Filter fields
         */
        if (this.filterFields instanceof Array &&
            this.filterFields.length > 0) {
            array.filter_fields = this.filterFields;
        }
        /**
         * Score strategy
         */
        if (this.scoreStrategy instanceof ScoreStrategy_1.ScoreStrategy) {
            var scoreStrategyAsArray = this.scoreStrategy.toArray();
            if (Object.keys(scoreStrategyAsArray).length > 0) {
                array.score_strategy = scoreStrategyAsArray;
            }
        }
        /**
         * User
         */
        if (this.user instanceof User_1.User) {
            var userAsArray = this.user.toArray();
            if (Object.keys(userAsArray).length > 0) {
                array.user = userAsArray;
            }
        }
        /**
         * items promoted
         */
        if (this.itemsPromoted.length > 0) {
            array.items_promoted = [];
            for (var i in this.itemsPromoted) {
                array
                    .items_promoted
                    .push(this.itemsPromoted[i].toArray);
            }
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Query}
     */
    Query.createFromArray = function (array) {
        var query = array.coordinate instanceof Object
            ? Query.createLocated(Coordinate_1.Coordinate.createFromArray(array.coordinate), array.q ? array.q : "", array.page ? array.page : exports.QUERY_DEFAULT_PAGE, array.size ? array.size : exports.QUERY_DEFAULT_SIZE)
            : Query.create(array.q ? array.q : "", array.page ? array.page : exports.QUERY_DEFAULT_PAGE, array.size ? array.size : exports.QUERY_DEFAULT_SIZE);
        /**
         * Aggregations
         */
        var aggregationsAsArray = typeof array.aggregations === typeof {}
            ? array.aggregations
            : {};
        for (var i in aggregationsAsArray) {
            query.aggregations[i] = Aggregation_1.Aggregation.createFromArray(aggregationsAsArray[i]);
        }
        /**
         * Sort
         */
        var sortAsArray = typeof array.sort === typeof {}
            ? array.sort
            : {};
        if (Object.keys(sortAsArray).length > 0) {
            query.sortByInstance = SortBy_1.SortBy.createFromArray(sortAsArray);
        }
        /**
         * Filters
         */
        var filtersAsArray = typeof array.filters === typeof {}
            ? array.filters
            : {};
        for (var i in filtersAsArray) {
            query.filters[i] = Filter_1.Filter.createFromArray(filtersAsArray[i]);
        }
        /**
         * Universe Filters
         */
        var universeFiltersAsArray = typeof array.universe_filters === typeof {}
            ? array.universe_filters
            : {};
        for (var i in universeFiltersAsArray) {
            query.universeFilters[i] = Filter_1.Filter.createFromArray(universeFiltersAsArray[i]);
        }
        /**
         * Booleans
         */
        query.resultsEnabled = typeof array.results_enabled === "boolean"
            ? array.results_enabled
            : true;
        query.suggestionsEnabled = typeof array.suggestions_enabled === "boolean"
            ? array.suggestions_enabled
            : false;
        query.aggregationsEnabled = typeof array.aggregations_enabled === "boolean"
            ? array.aggregations_enabled
            : true;
        query.highlightsEnabled = typeof array.highlights_enabled === "boolean"
            ? array.highlights_enabled
            : false;
        /**
         * Items promoted
         */
        var itemsPromotedAsArray = typeof array.items_promoted === typeof {}
            ? array.items_promoted
            : {};
        for (var i in itemsPromotedAsArray) {
            query
                .itemsPromoted
                .push(ItemUUID_1.ItemUUID.createFromArray(itemsPromotedAsArray[i]));
        }
        /**
         * Filter fields
         */
        query.filterFields = array.filter_fields instanceof Array
            ? array.filter_fields
            : [];
        query.scoreStrategy = array.score_strategy instanceof Object
            ? ScoreStrategy_1.ScoreStrategy.createFromArray(array.score_stategy)
            : null;
        query.user = array.user instanceof Object
            ? User_1.User.createFromArray(array.user)
            : null;
        return query;
    };
    return Query;
}());
exports.Query = Query;
