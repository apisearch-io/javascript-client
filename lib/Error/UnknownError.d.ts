import { ErrorWithMessage } from "./ErrorWithMessage";
/**
 * Connection error
 */
export declare class UnknownError extends ErrorWithMessage {
    /**
     * Unknown error
     *
     * @return this
     */
    static createUnknownError(): UnknownError;
}
