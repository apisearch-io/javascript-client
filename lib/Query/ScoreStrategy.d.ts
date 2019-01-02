import { Filter } from "./Filter";
/**
 * ScoreStrategy constants
 */
export declare const DEFAULT_TYPE = "default";
export declare const DEFAULT_WEIGHT = 1;
export declare const BOOSTING_FIELD_VALUE = "field_value";
export declare const CUSTOM_FUNCTION = "custom_function";
export declare const DECAY = "decay";
export declare const DECAY_LINEAR = "linear";
export declare const DECAY_EXP = "exp";
export declare const DECAY_GAUSS = "gauss";
export declare const MODIFIER_NONE = "none";
export declare const MODIFIER_SQRT = "sqrt";
export declare const MODIFIER_LOG = "log";
export declare const MODIFIER_LN = "ln";
export declare const MODIFIER_SQUARE = "square";
export declare const SCORE_MODE_NONE = "none";
export declare const SCORE_MODE_SUM = "sum";
export declare const SCORE_MODE_AVG = "avg";
export declare const SCORE_MODE_MAX = "max";
export declare const SCORE_MODE_MIN = "min";
export declare const DEFAULT_MISSING = 1;
export declare const DEFAULT_FACTOR = 1;
/**
 * ScoreStrategy
 */
export declare class ScoreStrategy {
    private type;
    private filter;
    private weight;
    private scoreMode;
    private configuration;
    /**
     * Get type
     *
     * @returns {string}
     */
    getType(): string;
    /**
     * Get configuration value
     *
     * @returns {string}
     */
    getConfigurationValue(element: string): any;
    /**
     * Get weight.
     *
     * @return {number}
     */
    getWeight(): number;
    /**
     * Get score mode.
     *
     * @return {string}
     */
    getScoreMode(): string;
    /**
     * Get filter.
     *
     * @return {Filter}
     */
    getFilter(): Filter;
    /**
     * Create default
     *
     * @return {ScoreStrategy}
     */
    static createDefault(): ScoreStrategy;
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
    static createFieldBoosting(field: string, factor?: number, missing?: number, modifier?: string, weight?: number, filter?: Filter, scoreMode?: string): ScoreStrategy;
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
    static createCustomFunction(func: string, weight?: number, filter?: Filter, scoreMode?: string): ScoreStrategy;
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
    static createDecayFunction(type: string, field: string, origin: string, scale: string, offset: string, decay: number, weight?: number, filter?: Filter, scoreMode?: string): ScoreStrategy;
    /**
     * Fix filter path.
     *
     * @param filter
     *
     * @return {Filter}
     */
    private static fixFilterFieldPath;
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
    toArray(): {
        type: string;
        configuration: any;
        weight: number;
        score_mode: string;
        filter: any;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {ScoreStrategy}
     */
    static createFromArray(array: any): ScoreStrategy;
}
