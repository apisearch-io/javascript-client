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
var NoCache_1 = require("./Cache/NoCache");
var AxiosClient_1 = require("./Http/AxiosClient");
var RetryMap_1 = require("./Http/RetryMap");
var Query_1 = require("./Query/Query");
var Query_2 = require("./Query/Query");
var Query_3 = require("./Query/Query");
var SortBy_1 = require("./Query/SortBy");
var HttpRepository_1 = require("./Repository/HttpRepository");
var ResultAggregations_1 = require("./Result/ResultAggregations");
var Result_1 = require("./Result/Result");
var Transformer_1 = require("./Transformer/Transformer");
/**
 * Apisearch class
 */
var Apisearch = /** @class */ (function () {
    function Apisearch() {
    }
    /**
     * Constructor
     *
     * @param config
     *
     * @returns {Repository}
     */
    Apisearch.createRepository = function (config) {
        config.options = __assign({ api_version: "v1", cache: new NoCache_1.NoCache(), timeout: 10000, override_queries: true }, config.options);
        /**
         * Client
         */
        var httpClient = new AxiosClient_1.AxiosClient(config.options.endpoint, config.options.api_version, config.options.timeout, new RetryMap_1.RetryMap(), config.options.override_queries, config.options.cache);
        return new HttpRepository_1.HttpRepository(httpClient, config.app_id, config.index_id, config.token, new Transformer_1.Transformer());
    };
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
    Apisearch.createQueryLocated = function (coordinate, queryText, page, size) {
        if (page === void 0) { page = Query_2.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = Query_3.QUERY_DEFAULT_SIZE; }
        return Query_1.Query.createLocated(coordinate, queryText, page, size);
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
    Apisearch.createQuery = function (queryText, page, size) {
        if (page === void 0) { page = Query_2.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = Query_3.QUERY_DEFAULT_SIZE; }
        return Query_1.Query.create(queryText, page, size);
    };
    /**
     * Create match all
     *
     * @return {Query}
     */
    Apisearch.createQueryMatchAll = function () {
        return Query_1.Query.createMatchAll();
    };
    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    Apisearch.createQueryByUUID = function (uuid) {
        return Query_1.Query.createByUUID(uuid);
    };
    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Apisearch.createQueryByUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        return Query_1.Query.createByUUIDs.apply(Query_1.Query, uuids);
    };
    /**
     * Create empty result
     *
     * @return {Result}
     */
    Apisearch.createEmptyResult = function () {
        return Result_1.Result.create(Apisearch.createQueryMatchAll(), 0, 0, new ResultAggregations_1.ResultAggregations(0), [], []);
    };
    /**
     * Create empty sortby
     *
     * @return {SortBy}
     */
    Apisearch.createEmptySortBy = function () {
        return SortBy_1.SortBy.create();
    };
    return Apisearch;
}());
exports["default"] = Apisearch;
