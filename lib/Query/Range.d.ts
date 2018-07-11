/**
 * Aggregation constants
 */
export declare const RANGE_ZERO = 0;
export declare const RANGE_INFINITE = -1;
export declare const RANGE_SEPARATOR = "..";
/**
 * Filter class
 */
export declare class Range {
    /**
     * Strong to array
     *
     * @param string
     *
     * @returns {[number, number]}
     */
    static stringToArray(string: string): [number, number];
    /**
     * Array to string
     *
     * @param values
     *
     * @return {string}
     */
    static arrayToString(values: [number, number]): string;
    /**
     * Create ranges
     *
     * @param from
     * @param to
     * @param incremental
     */
    static createRanges(from: number, to: number, incremental: number): string[];
}
