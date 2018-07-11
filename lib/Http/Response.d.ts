/**
 * Response
 */
export declare class Response {
    private code;
    private body;
    /**
     * Constructor
     *
     * @param code
     * @param body
     */
    constructor(code: number, body: any);
    /**
     * Get code
     *
     * @return {number}
     */
    getCode(): number;
    /**
     * Get body
     *
     * @return {any}
     */
    getBody(): any;
}
