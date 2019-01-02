import { ScoreStrategy } from "./ScoreStrategy";
/**
 * ScoreStrategies constants
 */
export declare const MULTIPLY = "multiply";
export declare const SUM = "sum";
export declare const AVG = "avg";
export declare const MAX = "max";
export declare const MIN = "min";
/**
 * ScoreStrategies
 */
export declare class ScoreStrategies {
    private scoreStrategies;
    private scoreMode;
    /**
     * Create empty
     *
     * @param scoreMode
     *
     * @return {ScoreStrategies}
     */
    static createEmpty(scoreMode?: string): ScoreStrategies;
    /**
     * Add score strategy
     *
     * @param scoreStrategy
     *
     * @return {ScoreStrategies}
     */
    addScoreStrategy(scoreStrategy: ScoreStrategy): ScoreStrategies;
    /**
     * Get score strategies
     *
     * @return {ScoreStrategy[]}
     */
    getScoreStrategies(): ScoreStrategy[];
    /**
     * Get score mode
     *
     * @return {string}
     */
    getScoreMode(): string;
    /**
     * To array
     *
     * @return {{
     *      score_mode: string,
     *      score_strategies: any
     * }}
     */
    toArray(): {
        score_mode: string;
        score_strategies: any;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {ScoreStrategies}
     */
    static createFromArray(array: any): ScoreStrategies;
}
