import { Retry, RetryConfig } from "./Retry";
/**
 * Http class
 */
export declare class RetryMap {
    /**
     * Create from array
     */
    static createFromArray(array: RetryConfig[]): RetryMap;
    private retries;
    /**
     * Add retry
     *
     * @param retry
     */
    addRetry(retry: Retry): void;
    /**
     * Get retry
     *
     * @param url
     * @param method
     *
     * @returns {Retry}
     */
    getRetry(url: string, method: string): Retry;
}
