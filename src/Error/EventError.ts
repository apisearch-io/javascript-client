import {ErrorWithMessage} from "./ErrorWithMessage";

/**
 * EventError
 */
export class EventError extends ErrorWithMessage {

    /**
     * Get transportable http error
     *
     * @return {number}
     */
    public static throwEndpointNotAvailable() {
        return new EventError("Endpoint not available");
    }
}
