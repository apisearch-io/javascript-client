import {ErrorWithMessage} from "./ErrorWithMessage";

/**
 * Connection error
 */
export class UnknownError extends ErrorWithMessage {

  /**
   * Unknown error
   *
   * @return this
   */
  public static createUnknownError() {
    return new this("Unknown error.");
  }
}
