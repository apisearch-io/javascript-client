import { HttpClient } from "./HttpClient";
import { Response } from "./Response";
/**
 * AxiosClient
 */
export declare class CacheClient implements HttpClient {
    private cache;
    private httpClient;
    private hits;
    constructor(httpClient: HttpClient);
    flushCache(): void;
    size(): number;
    getNumberOfHits(): number;
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
     * Generate a new cancellation token for a query
     *
     * @param url
     */
    generateCancelToken(url: string): void;
    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     */
    abort(url: string): void;
}
