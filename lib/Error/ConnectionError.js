"use strict";
exports.__esModule = true;
exports.ConnectionError = void 0;
var tslib_1 = require("tslib");
var ErrorWithMessage_1 = require("./ErrorWithMessage");
/**
 * Connection error
 */
var ConnectionError = /** @class */ (function (_super) {
    tslib_1.__extends(ConnectionError, _super);
    function ConnectionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ConnectionError.getTransportableHTTPError = function () {
        return 500;
    };
    return ConnectionError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.ConnectionError = ConnectionError;
