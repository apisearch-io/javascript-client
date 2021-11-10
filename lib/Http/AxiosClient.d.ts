import { Client } from "./Client";
import { HttpClient } from "./HttpClient";
import { Response } from "./Response";
/**
 * AxiosClient
 */
export declare class AxiosClient extends Client implements HttpClient {
    private host;
    private timeout;
    private overrideQueries;
    private cancelToken;
    /**
     * Constructor
     *
     * @param host
     * @param version
     * @param timeout
     * @param overrideQueries
     */
    constructor(host: string, version: string, timeout: number, overrideQueries: boolean);
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
    /**
     * @param url
     * @param options
     * @param retries
     */
    fetch(url: string, options: {}, retries: number): any;
}
