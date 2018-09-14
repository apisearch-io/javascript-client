import { KeyValueCache } from "../Cache/KeyValueCache";
import { Client } from "./Client";
import { HttpClient } from "./HttpClient";
import { Response } from "./Response";
import { RetryMap } from "./RetryMap";
/**
 * AxiosClient
 */
export declare class AxiosClient extends Client implements HttpClient {
    private host;
    private cache;
    private timeout;
    private overrideQueries;
    private cancelToken;
    /**
     * Constructor
     *
     * @param host
     * @param version
     * @param timeout
     * @param retryMap
     * @param overrideQueries
     * @param cache
     */
    constructor(host: string, version: string, timeout: number, retryMap: RetryMap, overrideQueries: boolean, cache: KeyValueCache);
    /**
     * Get
     *
     * @param url
     * @param method
     * @param credentials
     * @param parameters
     * @param data
     *
     * @return {Promise<Response>}
     */
    get(url: string, method: string, credentials: any, parameters?: any, data?: any): Promise<Response>;
    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     */
    abort(url: string): void;
    /**
     * Generate a new cancellation token for a query
     *
     * @param url
     */
    generateCancelToken(url: string): void;
}
