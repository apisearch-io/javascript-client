export declare const DEFAULT_MICROSECONDS_BETWEEN_RETRIES = 1000;
export interface RetryConfig {
    url?: string;
    method?: string;
    retries?: number;
    microseconds_between_retries?: number;
}
/**
 * Http class
 */
export declare class Retry {
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Retry}
     */
    static createFromArray(array: RetryConfig): Retry;
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
