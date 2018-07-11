import { ErrorWithMessage } from "./ErrorWithMessage";
/**
 * Forbidden Error
 */
export declare class ForbiddenError extends ErrorWithMessage {
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    static getTransportableHTTPError(): number;
    /**
     * App id is required
     *
     * @return {ForbiddenError}
     */
    static createAppIdIsRequiredException(): ForbiddenError;
    /**
     * Index id is required
     *
     * @return {ForbiddenError}
     */
    static createIndexIsRequiredException(): ForbiddenError;
    /**
     * Token is required
     *
     * @return {ForbiddenError}
     */
    static createTokenIsRequiredException(): ForbiddenError;
}
