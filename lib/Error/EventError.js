"use strict";
exports.__esModule = true;
exports.EventError = void 0;
var tslib_1 = require("tslib");
var ErrorWithMessage_1 = require("./ErrorWithMessage");
/**
 * EventError
 */
var EventError = /** @class */ (function (_super) {
    tslib_1.__extends(EventError, _super);
    function EventError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    EventError.throwEndpointNotAvailable = function () {
        return new EventError("Endpoint not available");
    };
    return EventError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.EventError = EventError;
