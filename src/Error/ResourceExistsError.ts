import {ErrorWithMessage} from "./ErrorWithMessage";

/**
 * Resource exists error
 */
export class ResourceExistsError extends ErrorWithMessage {

    /**
     * Get transportable http error
     *
     * @return {number}
     */
    public static getTransportableHTTPError() {
        return 409;
    }

    /**
     * Index not available
     *
     * @return {InvalidFormatError}
     */
    public static indexAvailable() {
        return new ResourceExistsError("Index exists and cannot be created again");
    }

    /**
     * Events not available
     *
     * @return {InvalidFormatError}
     */
    public static eventsIndexAvailable() {
        return new ResourceExistsError("Events index exists and cannot be created again");
    }

    /**
     * Logs not available
     *
     * @return {InvalidFormatError}
     */
    public static logsIndexAvailable() {
        return new ResourceExistsError("Logs index exists and cannot be created again");
    }
}
