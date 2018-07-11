import { ErrorWithMessage } from "./ErrorWithMessage";
/**
 * Resource not available error
 */
export declare class ResourceNotAvailableError extends ErrorWithMessage {
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    static getTransportableHTTPError(): number;
    /**
     * Index not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    static indexNotAvailable(resourceId: any): ResourceNotAvailableError;
    /**
     * Events not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    static eventsIndexNotAvailable(resourceId: any): ResourceNotAvailableError;
    /**
     * Logs not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    static logsIndexNotAvailable(resourceId: any): ResourceNotAvailableError;
    /**
     * Engine not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    static engineNotAvailable(resourceId: any): ResourceNotAvailableError;
}
