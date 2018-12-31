import {Item} from "../Model/Item";
import {Filter} from "./Filter";

/**
 * ScoreStrategy constants
 */
export const DEFAULT_TYPE = 'default';
export const DEFAULT_WEIGHT = 1.0;
export const BOOSTING_FIELD_VALUE = 'field_value';
export const CUSTOM_FUNCTION = 'custom_function';
export const DECAY = 'decay';
export const DECAY_LINEAR = 'linear';
export const DECAY_EXP = 'exp';
export const DECAY_GAUSS = 'gauss';
export const MODIFIER_NONE = 'none';
export const MODIFIER_SQRT = 'sqrt';
export const MODIFIER_LOG = 'log';
export const MODIFIER_LN = 'ln';
export const MODIFIER_SQUARE = 'square';
export const SCORE_MODE_NONE = 'none';
export const SCORE_MODE_SUM = 'sum';
export const SCORE_MODE_AVG = 'avg';
export const SCORE_MODE_MAX = 'max';
export const SCORE_MODE_MIN = 'min';
export const DEFAULT_MISSING = 1.0;
export const DEFAULT_FACTOR = 1.0;

/**
 * ScoreStrategy
 */
export class ScoreStrategy {

    private type = DEFAULT_TYPE;
    private filter: Filter = null;
    private weight = DEFAULT_WEIGHT;
    private scoreMode = SCORE_MODE_AVG;
    private configuration = {};

    /**
     * Get type
     *
     * @returns {string}
     */
    public getType(): string {
        return this.type;
    }

    /**
     * Get configuration value
     *
     * @returns {string}
     */
    public getConfigurationValue(element: string){
        if (typeof this.configuration[element] == "undefined") {
            return null;
        }

        return this.configuration[element];
    }

    /**
     * Get weight.
     *
     * @return {number}
     */
    public getWeight(): number
    {
        return this.weight;
    }

    /**
     * Get score mode.
     *
     * @return {string}
     */
    public getScoreMode(): string
    {
        return this.scoreMode;
    }

    /**
     * Get filter.
     *
     * @return {Filter}
     */
    public getFilter(): Filter
    {
        return this.filter;
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
    public static createFieldBoosting(
        field: string,
        factor: number = DEFAULT_FACTOR,
        missing: number = DEFAULT_MISSING,
        modifier: string = MODIFIER_NONE,
        weight: number = DEFAULT_WEIGHT,
        filter: Filter = null,
        scoreMode: string = SCORE_MODE_AVG
    ) : ScoreStrategy {
        let scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = BOOSTING_FIELD_VALUE;
        scoreStrategy.configuration['field'] = field;
        scoreStrategy.configuration['factor'] = factor;
        scoreStrategy.configuration['missing'] = missing;
        scoreStrategy.configuration['modifier'] = modifier;
        scoreStrategy.weight = weight;
        scoreStrategy.filter = ScoreStrategy.fixFilterFieldPath(filter);
        scoreStrategy.scoreMode = scoreMode;

        return scoreStrategy;
    }

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
    public static createCustomFunction(
        func: string,
        weight: number = DEFAULT_WEIGHT,
        filter: Filter = null,
        scoreMode: string = SCORE_MODE_AVG
    ) : ScoreStrategy {
        let scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = CUSTOM_FUNCTION;
        scoreStrategy.configuration['function'] = func;
        scoreStrategy.weight = weight;
        scoreStrategy.filter = ScoreStrategy.fixFilterFieldPath(filter);
        scoreStrategy.scoreMode = scoreMode;

        return scoreStrategy;
    }

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
    public static createDecayFunction(
        type: string,
        field: string,
        origin: string,
        scale: string,
        offset: string,
        decay: number,
        weight: number = DEFAULT_WEIGHT,
        filter: Filter = null,
        scoreMode: string = SCORE_MODE_AVG
    ) : ScoreStrategy {
        let scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = DECAY;
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
    }

    /**
     * Fix filter path.
     *
     * @param filter
     *
     * @return {Filter}
     */
    private static fixFilterFieldPath(filter: Filter): Filter
    {
        if (filter == null) {
            return filter;
        }

        let filterAsArray = filter.toArray();
        filterAsArray['field'] = Item.getPathByField(filterAsArray['field']);

        return Filter.createFromArray(filterAsArray);
    }

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
    public toArray(): {
        type: string,
        configuration: any,
        weight: number,
        score_mode: string,
        filter: any
    } {
        return {
            type: this.type,
            configuration: this.configuration,
            weight: this.weight,
            score_mode: this.scoreMode,
            filter: this.filter instanceof Filter
                ? this.filter.toArray()
                : null
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
            scoreStrategy.filter = Filter.createFromArray(array.filter);
        }

        return scoreStrategy;
    }
}
