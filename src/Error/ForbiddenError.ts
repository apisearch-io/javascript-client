import {ErrorWithMessage} from "./ErrorWithMessage";

/**
 * Forbidden Error
 */
export class ForbiddenError extends ErrorWithMessage {

    /**
     * Get transportable http error
     *
     * @return {number}
     */
    public static getTransportableHTTPError() {
        return 403;
    }

    /**
     * App id is required
     *
     * @return {ForbiddenError}
     */
    public static createAppIdIsRequiredException() {
        return new ForbiddenError("AppId query parameter MUST be defined with a valid value");
    }

    /**
     * Index id is required
     *
     * @return {ForbiddenError}
     */
    public static createIndexIsRequiredException() {
        return new ForbiddenError("Index query parameter MUST be defined with a valid value");
    }

    /**
     * Token is required
     *
     * @return {ForbiddenError}
     */
    public static createTokenIsRequiredException() {
        return new ForbiddenError("Token query parameter MUST be defined with a valid value");
    }
}
