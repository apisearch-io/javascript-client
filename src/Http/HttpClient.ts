import {Response} from "./Response";
/**
 * Http class
 */
export abstract class HttpClient {

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
    public abstract async get(
        url: string,
        method: string,
        credentials: any,
        parameters: any,
        data: any,
    ): Promise<Response>;

    /**
     * Generate a new cancellation token for a query
     *
     * @param url
     */
    public abstract generateCancelToken(url: string);

    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     */
    public abstract abort(url: string);
}
