import { ErrorWithMessage } from "./ErrorWithMessage";
/**
 * Unsupported content type error
 */
export declare class UnsupportedContentTypeError extends ErrorWithMessage {
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    static getTransportableHTTPError(): number;
    /**
     * Unsupported content type
     *
     * @return {InvalidFormatError}
     */
    static createUnsupportedContentTypeException(): UnsupportedContentTypeError;
}
