import { ErrorWithMessage } from "./ErrorWithMessage";
/**
 * Invalid token error
 */
export declare class InvalidTokenError extends ErrorWithMessage {
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    static getTransportableHTTPError(): number;
    /**
     * Invalid token permissions
     *
     * @param tokenReference
     *
     * @return {InvalidTokenError}
     */
    static createInvalidTokenPermissions(tokenReference: any): InvalidTokenError;
    /**
     * Invalid token permissions
     *
     * @param tokenReference
     * @param maxHitsPerQuery
     *
     * @return {InvalidTokenError}
     */
    static createInvalidTokenMaxHitsPerQuery(tokenReference: any, maxHitsPerQuery: any): InvalidTokenError;
}
