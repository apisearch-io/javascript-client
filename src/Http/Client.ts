/**
 * Client
 */
export abstract class Client {
    protected version: string;

    /**
     * Constructor
     *
     * @param version
     */
    constructor(version: string) {
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
