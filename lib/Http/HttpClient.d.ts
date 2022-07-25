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
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     * @param urlIsFormatted
     */
    abstract abort(url: string, urlIsFormatted: boolean): any;
}
