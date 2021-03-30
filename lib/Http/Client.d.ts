/**
 * Client
 */
export declare abstract class Client {
    protected version: string;
    /**
     * Constructor
     *
     * @param version
     */
    constructor(version: string);
    /**
     * Build an url parameters array by an object
     *
     * @param params
     *
     * @returns {string}
     */
    static objectToUrlParameters(params: any): string;
}
