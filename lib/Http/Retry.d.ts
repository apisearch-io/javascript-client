export declare const DEFAULT_MICROSECONDS_BETWEEN_RETRIES = 1000;
/**
 * Http class
 */
export declare class Retry {
    private url;
    private method;
    private retries;
    private microsecondsBetweenRetries;
    /**
     * Constructor
     *
     * @param url
     * @param method
     * @param retries
     * @param microsecondsBetweenRetries
     */
    constructor(url: string, method: string, retries: number, microsecondsBetweenRetries: number);
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Retry}
     */
    static createFromArray(array: any): Retry;
    /**
     * Get url
     *
     * @return {string}
     */
    getUrl(): string;
    /**
     * Get method
     *
     * @return {string}
     */
    getMethod(): string;
    /**
     * Ge retries
     *
     * @return {number}
     */
    getRetries(): number;
    /**
     * Get microseconds between retries
     *
     * @return {number}
     */
    getMicrosecondsBetweenRetries(): number;
}
