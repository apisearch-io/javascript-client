"use strict";
exports.__esModule = true;
exports.Result = void 0;
var Item_1 = require("../Model/Item");
var ResultAggregations_1 = require("./ResultAggregations");
/**
 * Result class
 */
var Result = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param queryUUID
     * @param totalItems
     * @param totalHits
     */
    function Result(queryUUID, totalItems, totalHits) {
        this.items = [];
        this.autocomplete = null;
        this.suggestions = [];
        this.subresults = {};
        this.metadata = {};
        this.queryUUID = queryUUID;
        this.totalItems = totalItems;
        this.totalHits = totalHits;
    }
    /**
     * @param queryUUID
     * @param totalItems
     * @param totalHits
     * @param aggregations
     * @param suggestions
     * @param items
     * @param autocomplete
     * @param metadata
     */
    Result.create = function (queryUUID, totalItems, totalHits, aggregations, suggestions, items, autocomplete, metadata) {
        if (autocomplete === void 0) { autocomplete = null; }
        if (metadata === void 0) { metadata = {}; }
        var result = new Result(queryUUID, totalItems, totalHits);
        result.aggregations = aggregations;
        result.suggestions = suggestions;
        result.items = items;
        result.autocomplete = autocomplete;
        result.metadata = metadata;
        return result;
    };
    /**
     * Create multi results
     *
     * @param subresults
     *
     * @returns {Result}
     */
    Result.createMultiresults = function (subresults) {
        var result = new Result('', 0, 0);
        result.subresults = subresults;
        return result;
    };
    /**
     * Add item
     *
     * @param item
     */
    Result.prototype.addItem = function (item) {
        this.items.push(item);
    };
    /**
     * Get items
     *
     * @return {Item[]}
     */
    Result.prototype.getItems = function () {
        return this.items;
    };
    /**
     * @param items
     */
    Result.prototype.withItems = function (items) {
        this.items = items;
    };
    /**
     * Get items grouped by types
     *
     * @return {any[]}
     */
    Result.prototype.getItemsGroupedByTypes = function () {
        if (this.itemsGroupedByTypeCache instanceof Object &&
            Object.keys(this.itemsGroupedByTypeCache).length > 0) {
            return this.itemsGroupedByTypeCache;
        }
        var itemsGroupedByTypes = {};
        for (var i in this.items) {
            var item = this.items[i];
            if (!(itemsGroupedByTypes[item.getType()] instanceof Array)) {
                itemsGroupedByTypes[item.getType()] = [];
            }
            itemsGroupedByTypes[item.getType()].push(item);
        }
        this.itemsGroupedByTypeCache = itemsGroupedByTypes;
        return itemsGroupedByTypes;
    };
    /**
     * Get items by type
     *
     * @param type
     *
     * @return {Array}
     */
    Result.prototype.getItemsByType = function (type) {
        var itemsGroupedByTypes = this.getItemsGroupedByTypes();
        return itemsGroupedByTypes[type] == null
            ? []
            : itemsGroupedByTypes[type];
    };
    /**
     * Get items by types
     *
     * @param types
     */
    Result.prototype.getItemsByTypes = function (types) {
        return this.items.filter(function (item) { return types.indexOf(item.getType()) >= 0; });
    };
    /**
     * Get first item
     *
     * @return {Item}
     */
    Result.prototype.getFirstItem = function () {
        return this.items.length > 0
            ? this.items[0]
            : null;
    };
    /**
     * Set aggregations
     *
     * @param aggregations
     */
    Result.prototype.setAggregations = function (aggregations) {
        this.aggregations = aggregations;
    };
    /**
     * Get aggregations
     *
     * @return {ResultAggregations}
     */
    Result.prototype.getAggregations = function () {
        return this.aggregations instanceof ResultAggregations_1.ResultAggregations
            ? this.aggregations
            : null;
    };
    /**
     * Get aggregation
     *
     * @param name
     *
     * @return {null}
     */
    Result.prototype.getAggregation = function (name) {
        return this.aggregations == null
            ? null
            : this.aggregations.getAggregation(name);
    };
    /**
     * Has no empty aggregation
     *
     * @param name
     *
     * @return {boolean}
     */
    Result.prototype.hasNotEmptyAggregation = function (name) {
        return this.aggregations == null
            ? false
            : this.aggregations.hasNotEmptyAggregation(name);
    };
    /**
     * Get suggestions
     *
     * @return {string[]}
     */
    Result.prototype.getSuggestions = function () {
        return this.suggestions;
    };
    /**
     * Get autocomplete
     *
     * @return {string|null}
     */
    Result.prototype.getAutocomplete = function () {
        return this.autocomplete;
    };
    /**
     * Get query uuid
     *
     * @return {string}
     */
    Result.prototype.getQueryUUID = function () {
        return this.queryUUID;
    };
    /**
     * Get total elements
     *
     * @return {number}
     */
    Result.prototype.getTotalItems = function () {
        return this.totalItems;
    };
    /**
     * Get total hits
     *
     * @return {number}
     */
    Result.prototype.getTotalHits = function () {
        return this.totalHits;
    };
    /**
     * Get subresults
     *
     * @return Object
     */
    Result.prototype.getSubresults = function () {
        return this.subresults;
    };
    /**
     * @return any
     */
    Result.prototype.getMetadata = function () {
        return this.metadata;
    };
    /**
     * @param name
     */
    Result.prototype.getMetadataValue = function (name) {
        var _a;
        return (_a = this.metadata[name]) !== null && _a !== void 0 ? _a : null;
    };
    /**
     * to array
     *
     * @return {{query: any, total_items: number, total_hits: number, items:any[], aggregations: any, suggestions: string[]}}
     */
    Result.prototype.toArray = function () {
        var array = {
            query_uuid: this.queryUUID,
            total_items: this.totalItems,
            total_hits: this.totalHits,
            items: this.items.map(function (item) { return item.toArray(); }),
            aggregations: this.aggregations == null
                ? null
                : this.aggregations.toArray(),
            suggests: this.suggestions,
            autocomplete: this.autocomplete === null
                ? undefined
                : this.autocomplete,
            metadata: this.metadata
        };
        if (this.subresults instanceof Object &&
            Object.keys(this.subresults).length) {
            array.subresults = {};
            for (var i in this.subresults) {
                var subresult = this.subresults[i];
                array.subresults[i] = subresult.toArray();
            }
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Result}
     */
    Result.createFromArray = function (array) {
        var result = Result.create(array.query_uuid
            ? array.query_uuid
            : '', array.total_items
            ? array.total_items
            : 0, array.total_hits
            ? array.total_hits
            : 0, array.aggregations instanceof Object
            ? ResultAggregations_1.ResultAggregations.createFromArray(array.aggregations)
            : null, array.suggests
            ? array.suggests
            : [], array.items instanceof Array
            ? array.items.map(function (itemAsArray) { return Item_1.Item.createFromArray(itemAsArray); })
            : [], array.autocomplete === undefined
            ? null
            : array.autocomplete, array.metadata === undefined
            ? {}
            : array.metadata);
        /**
         * Subqueries
         */
        var subresultsAsArray = typeof array.subresults === typeof {}
            ? array.subresults
            : {};
        for (var i in subresultsAsArray) {
            result.subresults[i] = Result.createFromArray(subresultsAsArray[i]);
        }
        return result;
    };
    return Result;
}());
exports.Result = Result;
