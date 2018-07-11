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
 * Resource exists error
 */
var ResourceExistsError = /** @class */ (function (_super) {
    __extends(ResourceExistsError, _super);
    function ResourceExistsError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ResourceExistsError.getTransportableHTTPError = function () {
        return 409;
    };
    /**
     * Index not available
     *
     * @return {InvalidFormatError}
     */
    ResourceExistsError.indexAvailable = function () {
        return new ResourceExistsError("Index exists and cannot be created again");
    };
    /**
     * Events not available
     *
     * @return {InvalidFormatError}
     */
    ResourceExistsError.eventsIndexAvailable = function () {
        return new ResourceExistsError("Events index exists and cannot be created again");
    };
    /**
     * Logs not available
     *
     * @return {InvalidFormatError}
     */
    ResourceExistsError.logsIndexAvailable = function () {
        return new ResourceExistsError("Logs index exists and cannot be created again");
    };
    return ResourceExistsError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.ResourceExistsError = ResourceExistsError;
