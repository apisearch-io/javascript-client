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
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     * @param urlIsFormatted
     */
    public abstract abort(
        url: string,
        urlIsFormatted: boolean,
    );
}
