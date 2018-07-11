/**
 * Aggregation class
 */
export declare class Counter {
    values: any;
    used: boolean;
    n: number;
    /**
     * Constructor
     *
     * @param values
     * @param used
     * @param n
     */
    constructor(values: any, used: boolean, n: number);
    /**
     * Get id
     *
     * @return {string|null}
     */
    getId(): string;
    /**
     * Get name
     *
     * @return {string|null}
     */
    getName(): string;
    /**
     * Get slug
     *
     * @return {string|null}
     */
    getSlug(): string;
    /**
     * Get level
     *
     * @return {number}
     */
    getLevel(): number;
    /**
     * Get values
     *
     * @returns {{}}
     */
    getValues(): any;
    /**
     * Is used
     *
     * @returns {boolean}
     */
    isUsed(): boolean;
    /**
     * Get N
     *
     * @returns {number}
     */
    getN(): number;
    /**
     * Create by active elements
     *
     * @param name
     * @param n
     * @param activeElements
     */
    static createByActiveElements(name: string, n: number, activeElements: string[]): Counter;
    /**
     * To array
     *
     * @return {{}}
     */
    toArray(): any;
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Counter}
     */
    static createFromArray(array: any): Counter;
}
