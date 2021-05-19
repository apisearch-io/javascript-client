"use strict";
exports.__esModule = true;
exports.Repository = void 0;
var tslib_1 = require("tslib");
/**
 * Aggregation class
 */
var Repository = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param appId
     * @param indexId
     * @param token
     */
    function Repository(appId, indexId, token) {
        this.itemsToUpdate = [];
        this.itemsToDelete = [];
        this.appId = appId;
        this.indexId = indexId;
        this.token = token;
    }
    /**
     * Reset cached elements
     */
    Repository.prototype.resetCachedElements = function () {
        this.itemsToUpdate = [];
        this.itemsToDelete = [];
    };
    /**
     * Add element
     *
     * @param item
     */
    Repository.prototype.addItem = function (item) {
        this.itemsToUpdate.push(item);
    };
    /**
     * Add elements
     *
     * @param items
     */
    Repository.prototype.addItems = function (items) {
        for (var i in items) {
            this.addItem(items[i]);
        }
    };
    /**
     * Delete item
     *
     * @param itemUUID
     */
    Repository.prototype.deleteItem = function (itemUUID) {
        this.itemsToDelete.push(itemUUID);
    };
    /**
     * Delete items
     *
     * @param itemsUUID
     */
    Repository.prototype.deleteItems = function (itemsUUID) {
        for (var i in itemsUUID) {
            this.deleteItem(itemsUUID[i]);
        }
    };
    /**
     * flush
     *
     * @param bulkNumber
     * @param skipIfLess
     *
     * @return {Promise<any[]>}
     */
    Repository.prototype.flush = function (bulkNumber, skipIfLess) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promise, resetCachedElements;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (!bulkNumber) {
                    bulkNumber = 500;
                }
                if (!skipIfLess) {
                    skipIfLess = false;
                }
                if (skipIfLess &&
                    this.itemsToUpdate.length < bulkNumber) {
                    return [2 /*return*/];
                }
                promise = Promise.all(Repository
                    .chunkArray(this.itemsToUpdate, bulkNumber)
                    .map(function (arrayOfItems) {
                    return _this.flushUpdateItems(arrayOfItems);
                })
                    .concat(Repository
                    .chunkArray(this.itemsToDelete, bulkNumber)
                    .map(function (arrayOfItemsUUID) {
                    return _this.flushDeleteItems(arrayOfItemsUUID);
                })));
                resetCachedElements = function () {
                    _this.resetCachedElements();
                };
                promise.then(resetCachedElements, resetCachedElements);
                return [2 /*return*/, promise];
            });
        });
    };
    /**
     * Make chunks of n elements
     *
     * @param array
     * @param chunk
     *
     * @return any[]
     */
    Repository.chunkArray = function (array, chunk) {
        var arrayChunked = [];
        for (var i = 0, j = array.length; i < j; i += chunk) {
            arrayChunked.push(array.slice(i, i + chunk));
        }
        return arrayChunked;
    };
    return Repository;
}());
exports.Repository = Repository;
