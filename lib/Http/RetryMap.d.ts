import { Retry } from "./Retry";
/**
 * Http class
 */
export declare class RetryMap {
    private retries;
    /**
     * Add retry
     *
     * @param retry
     */
    addRetry(retry: Retry): void;
    /**
     * Create from array
     */
    static createFromArray(array: any): RetryMap;
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
