import { HttpClient } from "./HttpClient";
import { Response } from "./Response";
/**
 * AxiosClient
 */
export declare class TestClient implements HttpClient {
    calls: any[];
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
