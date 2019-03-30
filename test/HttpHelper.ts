/**
 * HttpHelper class
 */
export class HttpHelper {

    /**
     * Get items by types
     *
     * @param httpTransportable
     *
     * @return {Object}
     */
    static emulateHttpTransport(httpTransportable: any): any {
        let array = httpTransportable.toArray();
        array = JSON.parse(JSON.stringify(array));

        return httpTransportable.constructor.createFromArray(array);
    }
}
