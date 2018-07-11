"use strict";
exports.__esModule = true;
/**
 * Aggregation constants
 */
exports.SCORE_STRATEGY_DEFAULT = 0;
exports.SCORE_STRATEGY_BOOSTING_RELEVANCE_FIELD = 1;
exports.SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION = 2;
/**
 * ScoreStrategy
 */
var ScoreStrategy = /** @class */ (function () {
    function ScoreStrategy() {
        this.type = exports.SCORE_STRATEGY_DEFAULT;
        this.innerFunction = null;
    }
    /**
     * Get type
     *
     * @returns {number}
     */
    ScoreStrategy.prototype.getType = function () {
        return this.type;
    };
    /**
     * Get function
     *
     * @returns {string}
     */
    ScoreStrategy.prototype.getFunction = function () {
        return this.innerFunction;
    };
    /**
     * Create default
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createDefault = function () {
        return new ScoreStrategy();
    };
    /**
     * Create relevance boosting
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createRelevanceBoosting = function () {
        var scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = exports.SCORE_STRATEGY_BOOSTING_RELEVANCE_FIELD;
        return scoreStrategy;
    };
    /**
     * Create relevance boosting
     *
     * @param innerFunction
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createCustomFunction = function (innerFunction) {
        var scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = exports.SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION;
        scoreStrategy.innerFunction = innerFunction;
        return scoreStrategy;
    };
    /**
     *
     * @return {{type: number, function: string}}
     */
    ScoreStrategy.prototype.toArray = function () {
        return {
            type: this.type,
            "function": this.innerFunction
        };
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        var scoreStrategy = ScoreStrategy.createDefault();
        if (typeof array.type == "undefined") {
            array.type = exports.SCORE_STRATEGY_DEFAULT;
        }
        if (typeof array["function"] == "undefined") {
            array.innerFunction = null;
        }
        scoreStrategy.type = array.type;
        scoreStrategy.innerFunction = array["function"];
        return scoreStrategy;
    };
    return ScoreStrategy;
}());
exports.ScoreStrategy = ScoreStrategy;
