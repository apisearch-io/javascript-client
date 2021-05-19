"use strict";
exports.__esModule = true;
exports.ScoreStrategies = exports.MIN = exports.MAX = exports.AVG = exports.SUM = exports.MULTIPLY = void 0;
var ScoreStrategy_1 = require("./ScoreStrategy");
/**
 * ScoreStrategies constants
 */
exports.MULTIPLY = 'multiply';
exports.SUM = 'sum';
exports.AVG = 'avg';
exports.MAX = 'max';
exports.MIN = 'min';
/**
 * ScoreStrategies
 */
var ScoreStrategies = /** @class */ (function () {
    function ScoreStrategies() {
        this.scoreStrategies = [];
    }
    /**
     * Create empty
     *
     * @param scoreMode
     *
     * @return {ScoreStrategies}
     */
    ScoreStrategies.createEmpty = function (scoreMode) {
        if (scoreMode === void 0) { scoreMode = exports.SUM; }
        var scoreStrategies = new ScoreStrategies;
        scoreStrategies.scoreMode = scoreMode;
        return scoreStrategies;
    };
    /**
     * Add score strategy
     *
     * @param scoreStrategy
     *
     * @return {ScoreStrategies}
     */
    ScoreStrategies.prototype.addScoreStrategy = function (scoreStrategy) {
        this.scoreStrategies.push(scoreStrategy);
        return this;
    };
    /**
     * Get score strategies
     *
     * @return {ScoreStrategy[]}
     */
    ScoreStrategies.prototype.getScoreStrategies = function () {
        return this.scoreStrategies;
    };
    /**
     * Get score mode
     *
     * @return {string}
     */
    ScoreStrategies.prototype.getScoreMode = function () {
        return this.scoreMode;
    };
    /**
     * To array
     *
     * @return {{
     *      score_mode: string,
     *      score_strategies: any
     * }}
     */
    ScoreStrategies.prototype.toArray = function () {
        var scoreStrategiesAsArray = [];
        for (var i in this.scoreStrategies) {
            scoreStrategiesAsArray.push(this.scoreStrategies[i].toArray());
        }
        return {
            score_mode: this.scoreMode,
            score_strategies: scoreStrategiesAsArray
        };
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {ScoreStrategies}
     */
    ScoreStrategies.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        var scoreStrategies = (typeof array.score_mode != "undefined")
            ? ScoreStrategies.createEmpty(array.score_mode)
            : ScoreStrategies.createEmpty();
        scoreStrategies.scoreStrategies = [];
        for (var i in array.score_strategies) {
            scoreStrategies
                .scoreStrategies
                .push(ScoreStrategy_1.ScoreStrategy.createFromArray(array.score_strategies[i]));
        }
        return scoreStrategies;
    };
    return ScoreStrategies;
}());
exports.ScoreStrategies = ScoreStrategies;
