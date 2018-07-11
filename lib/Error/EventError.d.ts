import { ErrorWithMessage } from "./ErrorWithMessage";
/**
 * EventError
 */
export declare class EventError extends ErrorWithMessage {
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    static throwEndpointNotAvailable(): EventError;
}
