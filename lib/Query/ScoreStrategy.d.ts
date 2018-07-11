/**
 * Aggregation constants
 */
export declare const SCORE_STRATEGY_DEFAULT = 0;
export declare const SCORE_STRATEGY_BOOSTING_RELEVANCE_FIELD = 1;
export declare const SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION = 2;
/**
 * ScoreStrategy
 */
export declare class ScoreStrategy {
    private type;
    private innerFunction;
    /**
     * Get type
     *
     * @returns {number}
     */
    getType(): number;
    /**
     * Get function
     *
     * @returns {string}
     */
    getFunction(): string;
    /**
     * Create default
     *
     * @return {ScoreStrategy}
     */
    static createDefault(): ScoreStrategy;
    /**
     * Create relevance boosting
     *
     * @return {ScoreStrategy}
     */
    static createRelevanceBoosting(): ScoreStrategy;
    /**
     * Create relevance boosting
     *
     * @param innerFunction
     *
     * @return {ScoreStrategy}
     */
    static createCustomFunction(innerFunction: any): ScoreStrategy;
    /**
     *
     * @return {{type: number, function: string}}
     */
    toArray(): {
        "type": number;
        "function": string;
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
