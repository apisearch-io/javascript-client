import { ErrorWithMessage } from "./ErrorWithMessage";
/**
 * Connection error
 */
export declare class ConnectionError extends ErrorWithMessage {
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    static getTransportableHTTPError(): number;
}
