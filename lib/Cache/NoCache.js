"use strict";
exports.__esModule = true;
/**
 * Cache class
 */
var NoCache = /** @class */ (function () {
    function NoCache() {
    }
    /**
     * Set cache element
     *
     * @param key
     * @param value
     *
     * @returns {void}
     */
    NoCache.prototype.set = function (key, value) {
        // Empty
    };
    /**
     * Get element from cache
     *
     * @param key
     *
     * @returns {any}
     */
    NoCache.prototype.get = function (key) {
        return undefined;
    };
    /**
     * Deletes element from cache
     *
     * @param key
     */
    NoCache.prototype.del = function (key) {
        // Empty
    };
    /**
     * Clear cache
     */
    NoCache.prototype.clear = function () {
        // Empty
    };
    return NoCache;
}());
exports.NoCache = NoCache;
