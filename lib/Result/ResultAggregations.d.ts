import { ResultAggregation } from "./ResultAggregation";
/**
 * ResultAggregation class
 */
export declare class ResultAggregations {
    private aggregations;
    private totalElements;
    /**
     * Constructor
     *
     * @param totalElements
     */
    constructor(totalElements: number);
    /**
     * Add aggregation
     *
     * @param name
     * @param aggregation
     */
    addAggregation(name: string, aggregation: ResultAggregation): void;
    /**
     * Get aggregations
     *
     * @returns {{}}
     */
    getAggregations(): any;
    /**
     * Get aggregation
     *
     * @param name
     *
     * @returns {Aggregation|null}
     */
    getAggregation(name: string): any;
    /**
     * Has not empty aggregation
     *
     * @param name
     *
     * @returns {boolean}
     */
    hasNotEmptyAggregation(name: string): boolean;
    /**
     * Get total elements
     *
     * @return {number}
     */
    getTotalElements(): number;
    /**
     * To array
     *
     * @return {{total_elements?: number, aggregations?: {}}}
     */
    toArray(): {
        total_elements?: number;
        aggregations?: {};
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {ResultAggregations}
     */
    static createFromArray(array: any): ResultAggregations;
}
