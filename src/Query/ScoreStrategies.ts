import {ScoreStrategy} from "./ScoreStrategy";
/**
 * ScoreStrategies constants
 */
export const MULTIPLY = 'multiply';
export const SUM = 'sum';
export const AVG = 'avg';
export const MAX = 'max';
export const MIN = 'min';

/**
 * ScoreStrategies
 */
export class ScoreStrategies {

    private scoreStrategies: ScoreStrategy[] = [];
    private scoreMode : string;

    /**
     * Create empty
     *
     * @param scoreMode
     *
     * @return {ScoreStrategies}
     */
    public static createEmpty(scoreMode: string = SUM) : ScoreStrategies {
        let scoreStrategies = new ScoreStrategies;
        scoreStrategies.scoreMode = scoreMode;

        return scoreStrategies;
    }

    /**
     * Add score strategy
     *
     * @param scoreStrategy
     *
     * @return {ScoreStrategies}
     */
    public addScoreStrategy(scoreStrategy: ScoreStrategy) : ScoreStrategies {
        this.scoreStrategies.push(scoreStrategy);

        return this;
    }

    /**
     * Get score strategies
     *
     * @return {ScoreStrategy[]}
     */
    public getScoreStrategies() : ScoreStrategy[] {
        return this.scoreStrategies;
    }

    /**
     * Get score mode
     *
     * @return {string}
     */
    public getScoreMode() : string {
        return this.scoreMode;
    }

    /**
     * To array
     *
     * @return {{
     *      score_mode: string,
     *      score_strategies: any
     * }}
     */
    public toArray(): {
        score_mode: string,
        score_strategies: any
    } {
        let scoreStrategiesAsArray = [];
        for (const i in this.scoreStrategies) {
            scoreStrategiesAsArray.push(this.scoreStrategies[i].toArray());
        }

        return {
            score_mode: this.scoreMode,
            score_strategies: scoreStrategiesAsArray
        };
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @return {ScoreStrategies}
     */
    public static createFromArray(array: any): ScoreStrategies {
        array = JSON.parse(JSON.stringify(array));
        const scoreStrategies = (typeof array.score_mode != "undefined")
            ? ScoreStrategies.createEmpty(array.score_mode)
            : ScoreStrategies.createEmpty();

        scoreStrategies.scoreStrategies = [];
        for (const i in array.score_strategies) {
            scoreStrategies
                .scoreStrategies
                .push(ScoreStrategy.createFromArray(array.score_strategies[i]));
        }

        return scoreStrategies;
    }
}
