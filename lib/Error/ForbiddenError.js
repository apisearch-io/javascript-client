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
 * Forbidden Error
 */
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ForbiddenError.getTransportableHTTPError = function () {
        return 403;
    };
    /**
     * App id is required
     *
     * @return {ForbiddenError}
     */
    ForbiddenError.createAppIdIsRequiredException = function () {
        return new ForbiddenError("AppId query parameter MUST be defined with a valid value");
    };
    /**
     * Index id is required
     *
     * @return {ForbiddenError}
     */
    ForbiddenError.createIndexIsRequiredException = function () {
        return new ForbiddenError("Index query parameter MUST be defined with a valid value");
    };
    /**
     * Token is required
     *
     * @return {ForbiddenError}
     */
    ForbiddenError.createTokenIsRequiredException = function () {
        return new ForbiddenError("Token query parameter MUST be defined with a valid value");
    };
    return ForbiddenError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.ForbiddenError = ForbiddenError;
