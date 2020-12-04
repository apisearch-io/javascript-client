import { Coordinate } from "..";
import { Filter } from "./Filter";
/**
 export * Sort by constants
 */
export declare const SORT_BY_TYPE_FIELD = "field";
export declare const SORT_BY_TYPE_NESTED = "nested";
export declare const SORT_BY_TYPE_SCORE = "score";
export declare const SORT_BY_TYPE_DISTANCE = "distance";
export declare const SORT_BY_TYPE_FUNCTION = "function";
export declare const SORT_BY_TYPE_RANDOM = "random";
export declare const SORT_BY_ASC = "asc";
export declare const SORT_BY_DESC = "desc";
export declare const SORT_BY_MODE_AVG = "avg";
export declare const SORT_BY_MODE_SUM = "sum";
export declare const SORT_BY_MODE_MIN = "min";
export declare const SORT_BY_MODE_MAX = "max";
export declare const SORT_BY_MODE_MEDIAN = "median";
export declare const SORT_BY_SCORE: {
    type: string;
};
export declare const SORT_BY_RANDOM: {
    type: string;
};
export declare const SORT_BY_AL_TUN_TUN: {
    type: string;
};
export declare const SORT_BY_ID_ASC: {
    field: string;
    order: string;
};
export declare const SORT_BY_ID_DESC: {
    field: string;
    order: string;
};
export declare const SORT_BY_TYPE_ASC: {
    field: string;
    order: string;
};
export declare const SORT_BY_TYPE_DESC: {
    field: string;
    order: string;
};
export declare const SORT_BY_LOCATION_KM_ASC: {
    type: string;
    unit: string;
};
export declare const SORT_BY_LOCATION_MI_ASC: {
    type: string;
    unit: string;
};
/**
 * ScoreStrategy
 */
export declare class SortBy {
    private sortsBy;
    /**
     * Create
     *
     * @return {SortBy}
     */
    static create(): SortBy;
    /**
     * Sort By fields values
     *
     * @param shortSortByElements
     *
     * @return {SortBy}
     */
    static byFieldsValues(shortSortByElements: any): SortBy;
    /**
     * All
     *
     * @return {Array}
     */
    all(): any;
    /**
     * Sort by value
     *
     * @param value
     *
     * @return {SortBy}
     */
    byValue(value: any): SortBy;
    /**
     * Sort by field value
     *
     * @param field
     * @param order
     *
     * @return {SortBy}
     */
    byFieldValue(field: string, order: string): SortBy;
    /**
     * Sort by nested field
     *
     * @param field
     * @param order
     * @param mode
     *
     * @return {SortBy}
     */
    byNestedField(field: string, order: string, mode?: string): SortBy;
    /**
     * Sort by nested field and filter
     *
     * @param field
     * @param order
     * @param filter
     * @param mode
     *
     * @return {SortBy}
     */
    byNestedFieldAndFilter(field: string, order: string, filter: Filter, mode?: string): SortBy;
    /**
     * Sort by function
     *
     * @param func
     * @param order
     *
     * @return {SortBy}
     */
    byFunction(func: string, order: string): SortBy;
    /**
     * Is sorted by geo distance
     *
     * @return {boolean}
     */
    isSortedByGeoDistance(): boolean;
    /**
     * Set coordinate
     *
     * @param coordinate
     *
     * @return {SortBy}
     */
    setCoordinate(coordinate: Coordinate): SortBy;
    /**
     * Has random sort
     *
     * @return {boolean}
     */
    hasRandomSort(): boolean;
    /**
     * get first sort value as string
     *
     * @return {string}
     */
    getFirstSortAsString(): string;
    /**
     * To array
     *
     * @return {[]}
     */
    toArray(): any;
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {SortBy}
     */
    static createFromArray(array: any): SortBy;
    /**
     * Make a copy of this
     *
     * @returns {SortBy}
     */
    copy(): SortBy;
}
