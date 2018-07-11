import {ErrorWithMessage} from "./ErrorWithMessage";

/**
 * Invalid token error
 */
export class InvalidTokenError extends ErrorWithMessage {

    /**
     * Get transportable http error
     *
     * @return {number}
     */
    public static getTransportableHTTPError() {
        return 401;
    }

    /**
     * Invalid token permissions
     *
     * @param tokenReference
     *
     * @return {InvalidTokenError}
     */
    public static createInvalidTokenPermissions(tokenReference) {
        return new InvalidTokenError("Token " + tokenReference + "not valid");
    }

    /**
     * Invalid token permissions
     *
     * @param tokenReference
     * @param maxHitsPerQuery
     *
     * @return {InvalidTokenError}
     */
    public static createInvalidTokenMaxHitsPerQuery(tokenReference, maxHitsPerQuery) {
        return new InvalidTokenError("Token " + tokenReference + "not valid. Max " + maxHitsPerQuery + " hits allowed");
    }
}
