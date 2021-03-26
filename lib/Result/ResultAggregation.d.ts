import { Counter } from "./Counter";
/**
 * ResultAggregation class
 */
export declare class ResultAggregation {
    private name;
    private counters;
    private applicationType;
    private totalElements;
    private activeElements;
    private highestActiveElement;
    private metadata;
    /**
     * @param name
     * @param applicationType
     * @param totalElements
     * @param activeElements
     * @param metadata
     */
    constructor(name: string, applicationType: number, totalElements: number, activeElements: any[], metadata?: any);
    /**
     * Add counter
     *
     * @param name
     * @param counter
     */
    addCounter(name: string, counter: number): void;
    /**
     * Get name
     *
     * @return {string}
     */
    getName(): string;
    /**
     * Get counter
     *
     * @return {any}
     */
    getCounters(): any;
    /**
     *
     */
    getMetadata(): any;
    /**
     * Return if the aggregation belongs to a filter.
     *
     * @return {boolean}
     */
    isFilter(): boolean;
    /**
     * Aggregation has levels.
     *
     * @return {boolean}
     */
    hasLevels(): boolean;
    /**
     * Get counter by name
     *
     * @param name
     *
     * @return {null}
     */
    getCounter(name: any): Counter;
    /**
     * Get all elements
     *
     * @return {{}}
     */
    getAllElements(): any;
    /**
     * Get total elements
     *
     * @return {number}
     */
    getTotalElements(): number;
    /**
     * Get active elements
     *
     * @return {any}
     */
    getActiveElements(): any;
    /**
     * Clean results by level and remove all levels higher than the lowest.
     */
    cleanCountersByLevel(): void;
    /**
     * Is empty
     *
     * @returns {boolean}
     */
    isEmpty(): boolean;
    /**
     * To array
     *
     * @return {any}
     */
    toArray(): any;
    /**
     * Create from array
     *
     * @param array
     */
    static createFromArray(array: any): ResultAggregation;
}
