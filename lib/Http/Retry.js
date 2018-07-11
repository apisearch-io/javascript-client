"use strict";
exports.__esModule = true;
exports.DEFAULT_MICROSECONDS_BETWEEN_RETRIES = 1000;
/**
 * Http class
 */
var Retry = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param url
     * @param method
     * @param retries
     * @param microsecondsBetweenRetries
     */
    function Retry(url, method, retries, microsecondsBetweenRetries) {
        this.url = url;
        this.method = method;
        this.retries = retries;
        this.microsecondsBetweenRetries = microsecondsBetweenRetries;
    }
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Retry}
     */
    Retry.createFromArray = function (array) {
        return new Retry(array.url ? array.url : "*", array.method ? array.method : "*", array.retries ? array.retries : 0, array.microseconds_between_retries
            ? array.microseconds_between_retries
            : exports.DEFAULT_MICROSECONDS_BETWEEN_RETRIES);
    };
    /**
     * Get url
     *
     * @return {string}
     */
    Retry.prototype.getUrl = function () {
        return this.url;
    };
    /**
     * Get method
     *
     * @return {string}
     */
    Retry.prototype.getMethod = function () {
        return this.method;
    };
    /**
     * Ge retries
     *
     * @return {number}
     */
    Retry.prototype.getRetries = function () {
        return this.retries;
    };
    /**
     * Get microseconds between retries
     *
     * @return {number}
     */
    Retry.prototype.getMicrosecondsBetweenRetries = function () {
        return this.microsecondsBetweenRetries;
    };
    return Retry;
}());
exports.Retry = Retry;
