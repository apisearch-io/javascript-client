/**
 * Response
 */
export declare class Response {
    code: number;
    body: any;
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
