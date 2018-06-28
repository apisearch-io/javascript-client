import ErrorWithMessage from "./ErrorWithMessage";

export default class ConnectionError extends ErrorWithMessage {

    /**
     * Get transportable http error
     *
     * @return {number}
     */
    public static getTransportableHTTPError() {
        return 500;
    }
}
