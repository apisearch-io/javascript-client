"use strict";
exports.__esModule = true;
exports.UnknownError = void 0;
var tslib_1 = require("tslib");
var ErrorWithMessage_1 = require("./ErrorWithMessage");
/**
 * Connection error
 */
var UnknownError = /** @class */ (function (_super) {
    tslib_1.__extends(UnknownError, _super);
    function UnknownError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Unknown error
     *
     * @return this
     */
    UnknownError.createUnknownError = function () {
        return new this("Unknown error.");
    };
    return UnknownError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.UnknownError = UnknownError;
