"use strict";
exports.__esModule = true;
/**
 * Aggregation constants
 */
exports.RANGE_ZERO = 0;
exports.RANGE_INFINITE = -1;
exports.RANGE_SEPARATOR = "..";
/**
 * Filter class
 */
var Range = /** @class */ (function () {
    function Range() {
    }
    /**
     * Strong to array
     *
     * @param string
     *
     * @returns {[number, number]}
     */
    Range.stringToArray = function (string) {
        var parts = string.split(exports.RANGE_SEPARATOR);
        var from = parts[0];
        var to = parts[1];
        var finalFrom = exports.RANGE_ZERO;
        var finalTo = exports.RANGE_INFINITE;
        if (from != "") {
            finalFrom = parseInt(from);
        }
        if (to != "") {
            finalTo = parseInt(to);
        }
        return [finalFrom, finalTo];
    };
    /**
     * Array to string
     *
     * @param values
     *
     * @return {string}
     */
    Range.arrayToString = function (values) {
        var finalValues = ["", ""];
        if (values[0] != exports.RANGE_ZERO) {
            finalValues[0] = String(values[0]);
        }
        if (values[1] != exports.RANGE_INFINITE) {
            finalValues[1] = String(values[1]);
        }
        return finalValues.join(exports.RANGE_SEPARATOR);
    };
    /**
     * Create ranges
     *
     * @param from
     * @param to
     * @param incremental
     */
    Range.createRanges = function (from, to, incremental) {
        var ranges = [];
        var nextTo;
        while (from < to) {
            nextTo = from + incremental;
            ranges.push(from + exports.RANGE_SEPARATOR + nextTo);
            from = nextTo;
        }
        return ranges;
    };
    return Range;
}());
exports.Range = Range;
