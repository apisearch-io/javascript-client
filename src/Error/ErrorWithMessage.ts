/**
 * ConnectError
 */
export abstract class ErrorWithMessage {

    /**
     * Message
     */
    private message: string;

    /**
     * Constructor
     *
     * @param message
     */
    constructor(message: string) {
        this.message = message;
    }
}
