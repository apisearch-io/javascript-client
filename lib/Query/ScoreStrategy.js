"use strict";
exports.__esModule = true;
exports.ScoreStrategy = exports.DEFAULT_FACTOR = exports.DEFAULT_MISSING = exports.SCORE_MODE_MIN = exports.SCORE_MODE_MAX = exports.SCORE_MODE_AVG = exports.SCORE_MODE_SUM = exports.SCORE_MODE_NONE = exports.MODIFIER_SQUARE = exports.MODIFIER_LN = exports.MODIFIER_LOG = exports.MODIFIER_SQRT = exports.MODIFIER_NONE = exports.DECAY_GAUSS = exports.DECAY_EXP = exports.DECAY_LINEAR = exports.DECAY = exports.CUSTOM_FUNCTION = exports.BOOSTING_FIELD_VALUE = exports.DEFAULT_WEIGHT = exports.DEFAULT_TYPE = void 0;
var Item_1 = require("../Model/Item");
var Filter_1 = require("./Filter");
/**
 * ScoreStrategy constants
 */
exports.DEFAULT_TYPE = 'default';
exports.DEFAULT_WEIGHT = 1.0;
exports.BOOSTING_FIELD_VALUE = 'field_value';
exports.CUSTOM_FUNCTION = 'custom_function';
exports.DECAY = 'decay';
exports.DECAY_LINEAR = 'linear';
exports.DECAY_EXP = 'exp';
exports.DECAY_GAUSS = 'gauss';
exports.MODIFIER_NONE = 'none';
exports.MODIFIER_SQRT = 'sqrt';
exports.MODIFIER_LOG = 'log';
exports.MODIFIER_LN = 'ln';
exports.MODIFIER_SQUARE = 'square';
exports.SCORE_MODE_NONE = 'none';
exports.SCORE_MODE_SUM = 'sum';
exports.SCORE_MODE_AVG = 'avg';
exports.SCORE_MODE_MAX = 'max';
exports.SCORE_MODE_MIN = 'min';
exports.DEFAULT_MISSING = 1.0;
exports.DEFAULT_FACTOR = 1.0;
/**
 * ScoreStrategy
 */
var ScoreStrategy = /** @class */ (function () {
    function ScoreStrategy() {
        this.type = exports.DEFAULT_TYPE;
        this.filter = null;
        this.weight = exports.DEFAULT_WEIGHT;
        this.scoreMode = exports.SCORE_MODE_AVG;
        this.configuration = {};
    }
    /**
     * Get type
     *
     * @returns {string}
     */
    ScoreStrategy.prototype.getType = function () {
        return this.type;
    };
    /**
     * Get configuration value
     *
     * @returns {string}
     */
    ScoreStrategy.prototype.getConfigurationValue = function (element) {
        if (typeof this.configuration[element] == "undefined") {
            return null;
        }
        return this.configuration[element];
    };
    /**
     * Get weight.
     *
     * @return {number}
     */
    ScoreStrategy.prototype.getWeight = function () {
        return this.weight;
    };
    /**
     * Get score mode.
     *
     * @return {string}
     */
    ScoreStrategy.prototype.getScoreMode = function () {
        return this.scoreMode;
    };
    /**
     * Get filter.
     *
     * @return {Filter}
     */
    ScoreStrategy.prototype.getFilter = function () {
        return this.filter;
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
     * Create field boosting
     *
     * @param field
     * @param factor
     * @param missing
     * @param modifier
     * @param weight
     * @param filter
     * @param scoreMode
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createFieldBoosting = function (field, factor, missing, modifier, weight, filter, scoreMode) {
        if (factor === void 0) { factor = exports.DEFAULT_FACTOR; }
        if (missing === void 0) { missing = exports.DEFAULT_MISSING; }
        if (modifier === void 0) { modifier = exports.MODIFIER_NONE; }
        if (weight === void 0) { weight = exports.DEFAULT_WEIGHT; }
        if (filter === void 0) { filter = null; }
        if (scoreMode === void 0) { scoreMode = exports.SCORE_MODE_AVG; }
        var scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = exports.BOOSTING_FIELD_VALUE;
        scoreStrategy.configuration['field'] = field;
        scoreStrategy.configuration['factor'] = factor;
        scoreStrategy.configuration['missing'] = missing;
        scoreStrategy.configuration['modifier'] = modifier;
        scoreStrategy.weight = weight;
        scoreStrategy.filter = ScoreStrategy.fixFilterFieldPath(filter);
        scoreStrategy.scoreMode = scoreMode;
        return scoreStrategy;
    };
    /**
     * Create custom function
     *
     * @param func
     * @param weight
     * @param filter
     * @param scoreMode
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createCustomFunction = function (func, weight, filter, scoreMode) {
        if (weight === void 0) { weight = exports.DEFAULT_WEIGHT; }
        if (filter === void 0) { filter = null; }
        if (scoreMode === void 0) { scoreMode = exports.SCORE_MODE_AVG; }
        var scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = exports.CUSTOM_FUNCTION;
        scoreStrategy.configuration['function'] = func;
        scoreStrategy.weight = weight;
        scoreStrategy.filter = ScoreStrategy.fixFilterFieldPath(filter);
        scoreStrategy.scoreMode = scoreMode;
        return scoreStrategy;
    };
    /**
     * Create decay function
     *
     * @param type
     * @param field
     * @param origin
     * @param scale
     * @param offset
     * @param decay
     * @param weight
     * @param filter
     * @param scoreMode
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createDecayFunction = function (type, field, origin, scale, offset, decay, weight, filter, scoreMode) {
        if (weight === void 0) { weight = exports.DEFAULT_WEIGHT; }
        if (filter === void 0) { filter = null; }
        if (scoreMode === void 0) { scoreMode = exports.SCORE_MODE_AVG; }
        var scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = exports.DECAY;
        scoreStrategy.configuration['type'] = type;
        scoreStrategy.configuration['field'] = field;
        scoreStrategy.configuration['origin'] = origin;
        scoreStrategy.configuration['scale'] = scale;
        scoreStrategy.configuration['offset'] = offset;
        scoreStrategy.configuration['decay'] = decay;
        scoreStrategy.weight = weight;
        scoreStrategy.filter = ScoreStrategy.fixFilterFieldPath(filter);
        scoreStrategy.scoreMode = scoreMode;
        return scoreStrategy;
    };
    /**
     * Fix filter path.
     *
     * @param filter
     *
     * @return {Filter}
     */
    ScoreStrategy.fixFilterFieldPath = function (filter) {
        if (filter == null) {
            return filter;
        }
        var filterAsArray = filter.toArray();
        filterAsArray['field'] = Item_1.Item.getPathByField(filterAsArray['field']);
        return Filter_1.Filter.createFromArray(filterAsArray);
    };
    /**
     * To array
     *
     * @return {{
     *      type: string,
     *      configuration: any,
     *      weight: number,
     *      score_mode: string,
     *      filter: any
     * }}
     */
    ScoreStrategy.prototype.toArray = function () {
        return {
            type: this.type,
            configuration: this.configuration,
            weight: this.weight,
            score_mode: this.scoreMode,
            filter: this.filter instanceof Filter_1.Filter
                ? this.filter.toArray()
                : null
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
        if (typeof array.type != "undefined") {
            scoreStrategy.type = array.type;
        }
        if (typeof array.configuration != "undefined") {
            scoreStrategy.configuration = array.configuration;
        }
        if (typeof array.weight != "undefined") {
            scoreStrategy.weight = array.weight;
        }
        if (typeof array.score_mode != "undefined") {
            scoreStrategy.scoreMode = array.score_mode;
        }
        if (typeof array.filter === 'object' && array.filter !== null) {
            scoreStrategy.filter = Filter_1.Filter.createFromArray(array.filter);
        }
        return scoreStrategy;
    };
    return ScoreStrategy;
}());
exports.ScoreStrategy = ScoreStrategy;
