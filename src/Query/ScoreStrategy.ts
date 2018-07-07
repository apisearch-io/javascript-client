/**
 * Aggregation constants
 */
export const SCORE_STRATEGY_DEFAULT = 0;
export const SCORE_STRATEGY_BOOSTING_RELEVANCE_FIELD = 1;
export const SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION = 2;

/**
 * ScoreStrategy
 */
export default class ScoreStrategy {

    private type: number = SCORE_STRATEGY_DEFAULT;
    private innerFunction: string = null;

    /**
     * Get type
     *
     * @returns {number}
     */
    public getType(): number {
        return this.type;
    }

    /**
     * Get function
     *
     * @returns {string}
     */
    public getFunction(): string {
        return this.innerFunction;
    }

    /**
     * Create default
     *
     * @return {ScoreStrategy}
     */
    public static createDefault(): ScoreStrategy {
        return new ScoreStrategy();
    }

    /**
     * Create relevance boosting
     *
     * @return {ScoreStrategy}
     */
    public static createRelevanceBoosting(): ScoreStrategy {
        const scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = SCORE_STRATEGY_BOOSTING_RELEVANCE_FIELD;

        return scoreStrategy;
    }

    /**
     * Create relevance boosting
     *
     * @param innerFunction
     *
     * @return {ScoreStrategy}
     */
    public static createCustomFunction(innerFunction): ScoreStrategy {
        const scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION;
        scoreStrategy.innerFunction = innerFunction;

        return scoreStrategy;
    }

    /**
     *
     * @return {{type: number, function: string}}
     */
    public toArray(): {"type": number, "function": string} {
        return {
            type: this.type,
            function: this.innerFunction,
        };
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @return {ScoreStrategy}
     */
    public static createFromArray(array: any): ScoreStrategy {
        array = JSON.parse(JSON.stringify(array));
        const scoreStrategy = ScoreStrategy.createDefault();
        if (typeof array.type == "undefined") {
            array.type = SCORE_STRATEGY_DEFAULT;
        }
        if (typeof array.function == "undefined") {
            array.innerFunction = null;
        }

        scoreStrategy.type = array.type;
        scoreStrategy.innerFunction = array.function;

        return scoreStrategy;
    }
}
