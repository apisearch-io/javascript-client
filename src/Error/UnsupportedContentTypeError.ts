import {ErrorWithMessage} from "./ErrorWithMessage";

/**
 * Unsupported content type error
 */
export class UnsupportedContentTypeError extends ErrorWithMessage {

    /**
     * Get transportable http error
     *
     * @return {number}
     */
    public static getTransportableHTTPError() {
        return 415;
    }

    /**
     * Unsupported content type
     *
     * @return {InvalidFormatError}
     */
    public static createUnsupportedContentTypeException() {
        return new UnsupportedContentTypeError("This content type is not accepted. Please use application/json");
    }
}
