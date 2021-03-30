/**
 * Response
 */
export class Response {

    code: number;
    body: any;

    /**
     * Constructor
     *
     * @param code
     * @param body
     */
    constructor(
        code: number,
        body: any,
    ) {
        this.code = code;
        this.body = body;
    }

    /**
     * Get code
     *
     * @return {number}
     */
    public getCode(): number {
        return this.code;
    }

    /**
     * Get body
     *
     * @return {any}
     */
    public getBody(): any {
        return this.body;
    }
}
