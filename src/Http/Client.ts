import RetryMap from "./RetryMap";

/**
 * Client
 */
export default abstract class Client {
    protected version: string;
    protected retryMap: RetryMap;

    /**
     * Constructor
     *
     * @param version
     * @param retryMap
     */
    constructor(
        version: string,
        retryMap: RetryMap,
    ) {
        this.retryMap = retryMap;
        this.version = version.replace(/^\/*|\/*$/g, "");
    }

    /**
     * Build an url parameters array by an object
     *
     * @param params
     *
     * @returns {string}
     */
    public static objectToUrlParameters(params: any): string {

        const builtParams: string[] = [];

        for (const i in params) {
            builtParams.push(i + "=" + params[i]);
        }

        return builtParams.join("&");
    }
}
