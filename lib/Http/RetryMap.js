"use strict";
exports.__esModule = true;
var Retry_1 = require("./Retry");
/**
 * Http class
 */
var RetryMap = /** @class */ (function () {
    function RetryMap() {
        this.retries = {};
    }
    /**
     * Create from array
     */
    RetryMap.createFromArray = function (array) {
        var retryMap = new RetryMap();
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var retryConfig = array_1[_i];
            retryMap.addRetry(Retry_1.Retry.createFromArray(retryConfig));
        }
        return retryMap;
    };
    /**
     * Add retry
     *
     * @param retry
     */
    RetryMap.prototype.addRetry = function (retry) {
        this.retries[retry.getUrl() + "~~" + retry.getMethod()] = retry;
    };
    /**
     * Get retry
     *
     * @param url
     * @param method
     *
     * @returns {Retry}
     */
    RetryMap.prototype.getRetry = function (url, method) {
        if (this.retries[url + "~~" + method] instanceof Retry_1.Retry) {
            return this.retries[url + "~~" + method];
        }
        if (this.retries["*~~" + method] instanceof Retry_1.Retry) {
            return this.retries["*~~" + method];
        }
        if (this.retries[url + "~~*"] instanceof Retry_1.Retry) {
            return this.retries[url + "~~*"];
        }
        if (this.retries["*~~*"] instanceof Retry_1.Retry) {
            return this.retries["*~~*"];
        }
        return null;
    };
    return RetryMap;
}());
exports.RetryMap = RetryMap;
