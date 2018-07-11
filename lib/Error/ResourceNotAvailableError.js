"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ErrorWithMessage_1 = require("./ErrorWithMessage");
/**
 * Resource not available error
 */
var ResourceNotAvailableError = /** @class */ (function (_super) {
    __extends(ResourceNotAvailableError, _super);
    function ResourceNotAvailableError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ResourceNotAvailableError.getTransportableHTTPError = function () {
        return 404;
    };
    /**
     * Index not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.indexNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Index not available - " + resourceId);
    };
    /**
     * Events not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.eventsIndexNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Events not available - " + resourceId);
    };
    /**
     * Logs not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.logsIndexNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Logs not available - " + resourceId);
    };
    /**
     * Engine not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.engineNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Engine not available - " + resourceId);
    };
    return ResourceNotAvailableError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.ResourceNotAvailableError = ResourceNotAvailableError;
