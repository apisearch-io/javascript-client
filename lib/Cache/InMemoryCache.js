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
        this.cache = __assign({}, this.cache, (_a = {}, _a[key] = value, _a));
        this.size = this.size + 1;
        var _a;
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
