/**
 * filter constants
 */
export declare const FILTER_MUST_ALL = 4;
export declare const FILTER_MUST_ALL_WITH_LEVELS = 5;
export declare const FILTER_AT_LEAST_ONE = 8;
export declare const FILTER_EXCLUDE = 16;
export declare const FILTER_PROMOTE = 32;
export declare const FILTER_TYPE_FIELD = "field";
export declare const FILTER_TYPE_RANGE = "range";
export declare const FILTER_TYPE_DATE_RANGE = "date_range";
export declare const FILTER_TYPE_GEO = "geo";
export declare const FILTER_TYPE_QUERY = "query";
/**
 * Filter class
 */
export declare class Filter {
    private field;
    private values;
    private applicationType;
    private filterType;
    private filterTerms;
    /**
     * Constructor
     *
     * @param field
     * @param values
     * @param applicationType
     * @param filterType
     * @param filterTerms
     */
    private constructor();
    /**
     * Get field
     *
     * @returns {string}
     */
    getField(): string;
    /**
     * Get values
     *
     * @returns {any}
     */
    getValues(): any;
    /**
     * Has value
     *
     * @param value
     *
     * @returns {boolean}
     */
    hasValue(value: any): boolean;
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
     * Get filter type
     *
     * @return {{}}
     */
    getFilterTerms(): string[];
    /**
     * Create
     *
     * @param field
     * @param values
     * @param applicationType
     * @param filterType
     * @param filterTerms
     *
     * @return {Filter}
     */
    static create(field: string, values: any, applicationType: number, filterType: string, filterTerms?: string[]): Filter;
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
     * @returns {Filter}
     */
    static createFromArray(array: any): Filter;
}
