/**
 * Aggregation constants
 */
export declare const AGGREGATION_SORT_BY_COUNT_ASC: string[];
export declare const AGGREGATION_SORT_BY_COUNT_DESC: string[];
export declare const AGGREGATION_SORT_BY_NAME_ASC: string[];
export declare const AGGREGATION_SORT_BY_NAME_DESC: string[];
export declare const AGGREGATION_NO_LIMIT = 0;
/**
 * Aggregation class
 */
export declare class Aggregation {
    private name;
    private field;
    private applicationType;
    private filterType;
    private subgroup;
    private sort;
    private limit;
    private promoted;
    /**
     * Construct
     *
     * @param name
     * @param field
     * @param applicationType
     * @param filterType
     * @param subgroup
     * @param sort
     * @param limit
     * @param promoted
     */
    private constructor();
    /**
     * Get name
     *
     * @returns {string}
     */
    getName(): string;
    /**
     * Get field
     *
     * @returns {string}
     */
    getField(): string;
    /**
     * getApplicationType
     *
     * @returns {number}
     */
    getApplicationType(): number;
    /**
     * Get filter type
     *
     * @return {string}
     */
    getFilterType(): string;
    /**
     * Get subgroup
     *
     * @return {[]}
     */
    getSubgroup(): string[];
    /**
     * Get sort
     *
     * @return {[]}
     */
    getSort(): string[];
    /**
     * Get limit
     *
     * @return {number}
     */
    getLimit(): number;
    /**
     * Get promoted
     *
     * @return {[]}
     */
    getPromoted(): string[];
    /**
     * Create
     *
     * @param name
     * @param field
     * @param applicationType
     * @param filterType
     * @param subgroup
     * @param sort
     * @param limit
     * @param promoted
     *
     * @returns {Aggregation}
     */
    static create(name: string, field: string, applicationType: number, filterType: string, subgroup?: string[], sort?: string[], limit?: number, promoted?: string[]): Aggregation;
    /**
     * To array
     *
     * @returns {Array}
     */
    toArray(): any;
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Aggregation}
     */
    static createFromArray(array: any): Aggregation;
}
