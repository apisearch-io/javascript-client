import {ErrorWithMessage} from "./ErrorWithMessage";

/**
 * Connection error
 */
export class ConnectionError extends ErrorWithMessage {

    /**
     * Get transportable http error
     *
     * @return {number}
     */
    public static getTransportableHTTPError() {
        return 500;
    }
}
