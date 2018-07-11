import { RetryMap } from "./RetryMap";
/**
 * Client
 */
export declare abstract class Client {
    protected version: string;
    protected retryMap: RetryMap;
    /**
     * Constructor
     *
     * @param version
     * @param retryMap
     */
    constructor(version: string, retryMap: RetryMap);
    /**
     * Build an url parameters array by an object
     *
     * @param params
     *
     * @returns {string}
     */
    static objectToUrlParameters(params: any): string;
}
