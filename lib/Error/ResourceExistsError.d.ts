import { ErrorWithMessage } from "./ErrorWithMessage";
/**
 * Resource exists error
 */
export declare class ResourceExistsError extends ErrorWithMessage {
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    static getTransportableHTTPError(): number;
    /**
     * Index not available
     *
     * @return {InvalidFormatError}
     */
    static indexAvailable(): ResourceExistsError;
    /**
     * Events not available
     *
     * @return {InvalidFormatError}
     */
    static eventsIndexAvailable(): ResourceExistsError;
    /**
     * Logs not available
     *
     * @return {InvalidFormatError}
     */
    static logsIndexAvailable(): ResourceExistsError;
}
