"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Cache class
 */
var InMemoryCache = /** @class */ (function () {
    /**
     * Constructor
     */
    function InMemoryCache() {
        this.cache = {};
        this.size = 0;
        this.cache = {};
        this.size = 0;
    }
    /**
     * Set cache element
     *
     * @param key
     * @param value
     *
     * @returns {void}
     */
    InMemoryCache.prototype.set = function (key, value) {
        var _a;
        this.cache = tslib_1.__assign({}, this.cache, (_a = {}, _a[key] = value, _a));
        this.size = this.size + 1;
    };
    /**
     * Get element from cache
     *
     * @param key
     *
     * @returns {any}
     */
    InMemoryCache.prototype.get = function (key) {
        return this.cache[key];
    };
    /**
     * Deletes element from cache
     *
     * @param key
     */
    InMemoryCache.prototype.del = function (key) {
        delete this.cache[key];
    };
    /**
     * Clear cache
     */
    InMemoryCache.prototype.clear = function () {
        this.cache = {};
        this.size = 0;
    };
    return InMemoryCache;
}());
exports.InMemoryCache = InMemoryCache;
