"use strict";
exports.__esModule = true;
exports.Query = exports.NO_MIN_SCORE = exports.QUERY_DEFAULT_SIZE = exports.QUERY_DEFAULT_PAGE = void 0;
var tslib_1 = require("tslib");
var Coordinate_1 = require("../Model/Coordinate");
var ItemUUID_1 = require("../Model/ItemUUID");
var Item_1 = require("../Model/Item");
var User_1 = require("../Model/User");
var Aggregation_1 = require("./Aggregation");
var Filter_1 = require("./Filter");
var Filter_2 = require("./Filter");
var Aggregation_2 = require("./Aggregation");
var InvalidFormatError_1 = require("../Error/InvalidFormatError");
var Filter_3 = require("./Filter");
var ScoreStrategies_1 = require("./ScoreStrategies");
var SortBy_1 = require("./SortBy");
var IndexUUID_1 = require("../Model/IndexUUID");
/**
 * Query constants
 */
exports.QUERY_DEFAULT_PAGE = 1;
exports.QUERY_DEFAULT_SIZE = 10;
exports.NO_MIN_SCORE = 0.0;
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
        this.UUID = null;
        this.fields = [];
        this.universeFilters = {};
        this.filters = {};
        this.itemsPromoted = [];
        this.aggregations = {};
        this.resultsEnabled = true;
        this.aggregationsEnabled = true;
        this.numberOfSuggestions = 0;
        this.highlightsEnabled = false;
        this.autocompleteEnabled = false;
        this.searchableFields = [];
        this.fuzziness = null;
        this.minScore = exports.NO_MIN_SCORE;
        this.metadata = {};
        this.subqueries = {};
        this.queryOperator = null;
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
     * Create by UUIDs
     *
     * @param queries
     *
     * @return {Query}
     */
    Query.createMultiquery = function (queries) {
        var query = Query.createMatchAll();
        query.subqueries = queries;
        return query;
    };
    /**
     * set fields
     *
     * @param fields
     *
     * @return {Query}
     */
    Query.prototype.setFields = function (fields) {
        this.fields = fields;
        return this;
    };
    /**
     * get fields
     *
     * @return {string[]}
     */
    Query.prototype.getFields = function () {
        return this.fields;
    };
    /**
     * Filter universe by types
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByTypes = function (values) {
        var _a;
        var fieldPath = Item_1.Item.getPathByField("type");
        if (values.length > 0) {
            this.universeFilters = tslib_1.__assign(tslib_1.__assign({}, this.universeFilters), (_a = {}, _a["type"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters.type;
        }
        return this;
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
        var _a, _b;
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var fieldPath = Item_1.Item.getPathByField("type");
        if (values.length > 0) {
            this.filters = tslib_1.__assign(tslib_1.__assign({}, this.filters), (_a = {}, _a["type"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters.type;
        }
        if (aggregate) {
            this.aggregations = tslib_1.__assign(tslib_1.__assign({}, this.aggregations), (_b = {}, _b["type"] = Aggregation_1.Aggregation.create("type", fieldPath, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD, [], aggregationSort), _b));
        }
        return this;
    };
    /**
     * Filter universe by ids
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByIds = function (values) {
        var _a;
        var fieldPath = Item_1.Item.getPathByField("id");
        if (values.length > 0) {
            this.universeFilters = tslib_1.__assign(tslib_1.__assign({}, this.universeFilters), (_a = {}, _a["id"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters.id;
        }
        return this;
    };
    /**
     * Filter by ids
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterByIds = function (values) {
        var _a;
        var fieldPath = Item_1.Item.getPathByField("id");
        if (values.length > 0) {
            this.filters = tslib_1.__assign(tslib_1.__assign({}, this.filters), (_a = {}, _a["id"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters.id;
        }
        return this;
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
        var _a;
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        var fieldPath = Item_1.Item.getPathByField(field);
        if (values.length > 0) {
            this.universeFilters = tslib_1.__assign(tslib_1.__assign({}, this.universeFilters), (_a = {}, _a[field] = Filter_1.Filter.create(fieldPath, values, applicationType, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters[field];
        }
        return this;
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
        var _a;
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var fieldPath = Item_1.Item.getPathByField(field);
        if (values.length > 0) {
            this.filters = tslib_1.__assign(tslib_1.__assign({}, this.filters), (_a = {}, _a[filterName] = Filter_1.Filter.create(fieldPath, values, applicationType, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters[filterName];
        }
        if (aggregate) {
            this.aggregateBy(filterName, field, applicationType, aggregationSort);
        }
        return this;
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
        var _a;
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        var fieldPath = Item_1.Item.getPathByField(field);
        if (values.length > 0) {
            this.universeFilters = tslib_1.__assign(tslib_1.__assign({}, this.universeFilters), (_a = {}, _a[field] = Filter_1.Filter.create(fieldPath, values, applicationType, rangeType), _a));
        }
        else {
            delete this.universeFilters[field];
        }
        return this;
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
     * @param ranges
     * @param values
     * @param applicationType
     * @param rangeType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterByRange = function (filterName, field, ranges, values, applicationType, rangeType, aggregate, aggregationSort) {
        var _a;
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var fieldPath = Item_1.Item.getPathByField(field);
        if (values.length !== 0) {
            this.filters = tslib_1.__assign(tslib_1.__assign({}, this.filters), (_a = {}, _a[filterName] = Filter_1.Filter.create(fieldPath, values, applicationType, rangeType), _a));
        }
        else {
            delete this.filters[filterName];
        }
        if (aggregate) {
            this.aggregateByRange(filterName, fieldPath, ranges, applicationType, rangeType, aggregationSort);
        }
        return this;
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
        var _a;
        this.universeFilters = tslib_1.__assign(tslib_1.__assign({}, this.universeFilters), (_a = {}, _a["coordinate"] = Filter_1.Filter.create("coordinate", locationRange.toArray(), Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_GEO), _a));
        return this;
    };
    /**
     * Set filter fields
     *
     * @param searchableFields
     *
     * @return {Query}
     */
    Query.prototype.setSearchableFields = function (searchableFields) {
        this.searchableFields = searchableFields;
        return this;
    };
    /**
     * Get filter fields
     *
     * @return {string[]}
     */
    Query.prototype.getSearchableFields = function () {
        return this.searchableFields;
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
     * @param promoted
     *
     * @return {Query}
     */
    Query.prototype.aggregateBy = function (filterName, field, applicationType, aggregationSort, limit, promoted) {
        var _a;
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        if (promoted === void 0) { promoted = []; }
        this.aggregations = tslib_1.__assign(tslib_1.__assign({}, this.aggregations), (_a = {}, _a[filterName] = Aggregation_1.Aggregation.create(filterName, Item_1.Item.getPathByField(field), applicationType, Filter_2.FILTER_TYPE_FIELD, [], aggregationSort, limit, promoted), _a));
        return this;
    };
    /**
     * Aggregate by range
     *
     * @param filterName
     * @param field
     * @param ranges
     * @param applicationType
     * @param rangeType
     * @param aggregationSort
     * @param limit
     * @param promoted
     *
     * @return {Query}
     */
    Query.prototype.aggregateByRange = function (filterName, field, ranges, applicationType, rangeType, aggregationSort, limit, promoted) {
        var _a;
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        if (promoted === void 0) { promoted = []; }
        if (ranges.length === 0) {
            return this;
        }
        this.aggregations = tslib_1.__assign(tslib_1.__assign({}, this.aggregations), (_a = {}, _a[filterName] = Aggregation_1.Aggregation.create(filterName, Item_1.Item.getPathByField(field), applicationType, rangeType, ranges, aggregationSort, limit, promoted), _a));
        return this;
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
     * @param promoted
     *
     * @return {Query}
     */
    Query.prototype.aggregateByDateRange = function (filterName, field, options, applicationType, aggregationSort, limit, promoted) {
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        if (promoted === void 0) { promoted = []; }
        return this.aggregateByRange(filterName, field, options, applicationType, Filter_2.FILTER_TYPE_DATE_RANGE, aggregationSort, limit, promoted);
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
        var fieldPath = Item_1.Item.getPathByField(fieldName);
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
     * Set number of suggestions
     *
     * @param numberOfSuggestions
     *
     * @return {Query}
     */
    Query.prototype.setNumberOfSuggestions = function (numberOfSuggestions) {
        this.numberOfSuggestions = numberOfSuggestions;
        return this;
    };
    /**
     * Disable suggestions
     *
     * @return {Query}
     */
    Query.prototype.disableSuggestions = function () {
        this.numberOfSuggestions = 0;
        return this;
    };
    /**
     * Get number of suggestions
     *
     * @return {number}
     */
    Query.prototype.getNumberOfSuggestions = function () {
        return this.numberOfSuggestions;
    };
    /**
     * Enable autocomplete
     *
     * @return {Query}
     */
    Query.prototype.enableAutocomplete = function () {
        this.autocompleteEnabled = true;
        return this;
    };
    /**
     * Disable autocomplete
     *
     * @return {Query}
     */
    Query.prototype.disableAutocomplete = function () {
        this.autocompleteEnabled = false;
        return this;
    };
    /**
     * Are autocomplete enabled
     *
     * @return {boolean}
     */
    Query.prototype.areAutocompleteEnabled = function () {
        return this.autocompleteEnabled;
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
        var _a;
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        this.filters = tslib_1.__assign(tslib_1.__assign({}, this.filters), (_a = {}, _a["excluded_ids"] = Filter_1.Filter.create("_id", uuids.map(function (uuid) { return uuid.composedUUID(); }), Filter_2.FILTER_EXCLUDE, Filter_2.FILTER_TYPE_FIELD), _a));
        return this;
    };
    /**
     * Get score strategies
     *
     * @return {ScoreStrategies}
     */
    Query.prototype.getScoreStrategies = function () {
        return this.scoreStrategies;
    };
    /**
     * Set score strategies
     *
     * @param scoreStrategies
     */
    Query.prototype.setScoreStrategies = function (scoreStrategies) {
        this.scoreStrategies = scoreStrategies;
        return this;
    };
    /**
     * Get fuzziness
     *
     * @return any
     */
    Query.prototype.getFuzziness = function () {
        return this.fuzziness;
    };
    /**
     * Set fuzziness
     *
     * @param fuzziness
     *
     * @return {Query}
     */
    Query.prototype.setFuzziness = function (fuzziness) {
        this.fuzziness = fuzziness;
        return this;
    };
    /**
     * Set auto fuzziness
     *
     * @return {Query}
     */
    Query.prototype.setAutoFuzziness = function () {
        this.fuzziness = 'AUTO';
        return this;
    };
    /**
     * Get min score
     *
     * @return any
     */
    Query.prototype.getMinScore = function () {
        return this.minScore;
    };
    /**
     * Set min score
     *
     * @param minScore
     *
     * @return {Query}
     */
    Query.prototype.setMinScore = function (minScore) {
        this.minScore = minScore;
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
     * set metadata value
     *
     * @param name
     * @param value
     *
     * @return {Query}
     */
    Query.prototype.setMetadataValue = function (name, value) {
        this.metadata[name] = value;
        return this;
    };
    /**
     * Get metadata
     *
     * @return any
     */
    Query.prototype.getMetadata = function () {
        return this.metadata;
    };
    /**
     * Add subquery
     *
     * @param name
     * @param subquery
     *
     * @return {Query}
     */
    Query.prototype.addSubquery = function (name, subquery) {
        this.subqueries[name] = subquery;
        return this;
    };
    /**
     * Get subqueries
     *
     * @return {Object}
     */
    Query.prototype.getSubqueries = function () {
        return this.subqueries;
    };
    /**
     * Identify it
     *
     * @param UUID
     *
     * @return {Query}
     */
    Query.prototype.identifyWith = function (UUID) {
        this.UUID = UUID;
        return this;
    };
    /**
     * Get identification
     *
     * @return {string|null}
     */
    Query.prototype.getUUID = function () {
        return this.UUID;
    };
    /**
     * Force Index UUID.
     *
     * @param indexUUID
     *
     * @return {Query}
     */
    Query.prototype.forceIndexUUID = function (indexUUID) {
        this.indexUUID = indexUUID;
        return this;
    };
    /**
     * Get IndexUUID
     *
     * @return {IndexUUID|null}
     */
    Query.prototype.getIndexUUID = function () {
        return this.indexUUID;
    };
    Query.prototype.setQueryOperator = function (queryOperator) {
        this.queryOperator = queryOperator;
        return this;
    };
    Query.prototype.getQueryOperator = function () {
        return this.queryOperator;
    };
    /**
     * To array
     *
     * @return {any}
     */
    Query.prototype.toArray = function () {
        var array = {};
        if (this.UUID !== null) {
            array.UUID = this.UUID;
        }
        if (this.getQueryText() !== "") {
            array.q = this.getQueryText();
        }
        if (this.coordinate instanceof Coordinate_1.Coordinate) {
            array.coordinate = this.coordinate.toArray();
        }
        /**
         * Fields
         */
        if (this.fields instanceof Array &&
            this.fields.length > 0) {
            array.fields = this.fields;
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
            var filters = {};
            for (var i in this.filters) {
                var filter = this.filters[i];
                if (filter.getFilterType() !== Filter_3.FILTER_TYPE_QUERY) {
                    filters[i] = filter.toArray();
                }
            }
            if (Object.keys(filters).length > 0) {
                array.filters = filters;
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
        if (this.autocompleteEnabled === true) {
            array.autocomplete_enabled = true;
        }
        if (this.numberOfSuggestions !== 0) {
            array.number_of_suggestions = this.numberOfSuggestions;
        }
        if (this.highlightsEnabled === true) {
            array.highlight_enabled = true;
        }
        if (this.aggregationsEnabled === false) {
            array.aggregations_enabled = false;
        }
        /**
         * Filter fields
         */
        if (this.searchableFields instanceof Array &&
            this.searchableFields.length > 0) {
            array.searchable_fields = this.searchableFields;
        }
        /**
         * Score strategies
         */
        if (this.scoreStrategies instanceof ScoreStrategies_1.ScoreStrategies) {
            var scoreStrategiesAsArray = this.scoreStrategies.toArray();
            if (Object.keys(scoreStrategiesAsArray).length > 0) {
                array.score_strategies = scoreStrategiesAsArray;
            }
        }
        if (this.fuzziness !== null) {
            array.fuzziness = this.fuzziness;
        }
        /**
         * Min score
         */
        var minScore = this.minScore;
        if (minScore !== exports.NO_MIN_SCORE) {
            array.min_score = minScore;
        }
        /**
         * User
         */
        if (this.user instanceof User_1.User) {
            array.user = this.user.toArray();
        }
        if (Object.keys(this.metadata).length > 0) {
            array.metadata = this.metadata;
        }
        if (this.subqueries instanceof Object &&
            Object.keys(this.subqueries).length) {
            array.subqueries = {};
            for (var i in this.subqueries) {
                var subquery = this.subqueries[i];
                array.subqueries[i] = subquery.toArray();
            }
        }
        if (this.indexUUID instanceof IndexUUID_1.IndexUUID) {
            array.index_uuid = this.indexUUID.toArray();
        }
        /**
         * items promoted
         */
        if (this.itemsPromoted.length > 0) {
            array.items_promoted = [];
            for (var i in this.itemsPromoted) {
                array
                    .items_promoted
                    .push(this.itemsPromoted[i].toArray());
            }
        }
        if (this.queryOperator !== "or" && this.queryOperator !== null) {
            array.query_operator = this.queryOperator;
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
        query.UUID = typeof array.UUID === typeof ""
            ? array.UUID
            : undefined;
        /**
         * Fields
         */
        query.fields = array.fields instanceof Array
            ? array.fields
            : [];
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
        query.numberOfSuggestions = typeof array.number_of_suggestions === "number"
            ? array.number_of_suggestions
            : 0;
        query.autocompleteEnabled = typeof array.autocomplete_enabled === "boolean"
            ? array.autocomplete_enabled
            : false;
        query.aggregationsEnabled = typeof array.aggregations_enabled === "boolean"
            ? array.aggregations_enabled
            : true;
        query.highlightsEnabled = typeof array.highlight_enabled === "boolean"
            ? array.highlight_enabled
            : false;
        query.fuzziness = array.fuzziness ? array.fuzziness : null;
        query.minScore = array.min_score ? array.min_score : exports.NO_MIN_SCORE;
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
         * Subqueries
         */
        var subqueriesAsArray = typeof array.subqueries === typeof {}
            ? array.subqueries
            : {};
        for (var i in subqueriesAsArray) {
            query.subqueries[i] = Query.createFromArray(subqueriesAsArray[i]);
        }
        /**
         * Filter fields
         */
        query.metadata = typeof array.metadata === typeof {}
            ? array.metadata
            : {};
        query.searchableFields = array.searchable_fields instanceof Array
            ? array.searchable_fields
            : [];
        query.scoreStrategies = array.score_strategies instanceof Object
            ? ScoreStrategies_1.ScoreStrategies.createFromArray(array.score_strategies)
            : undefined;
        query.user = array.user instanceof Object
            ? User_1.User.createFromArray(array.user)
            : undefined;
        query.indexUUID = array.index_uuid instanceof Object
            ? IndexUUID_1.IndexUUID.createFromArray(array.index_uuid)
            : undefined;
        query.queryOperator = typeof array.query_operator === "string"
            ? array.query_operator
            : "or";
        return query;
    };
    return Query;
}());
exports.Query = Query;
