import { Response } from "./Response";
/**
 * Http class
 */
export declare abstract class HttpClient {
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
    abstract get(url: string, method: string, credentials: any, parameters: any, data: any): Promise<Response>;
    /**
     * Generate a new cancellation token for a query
     *
     * @param url
     */
    abstract generateCancelToken(url: string): any;
    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     */
    abstract abort(url: string): any;
}
