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
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     * @param urlIsFormatted
     */
    abort(url: string, urlIsFormatted: boolean): void;
}
