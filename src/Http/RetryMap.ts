import {Retry} from "./Retry";

/**
 * Http class
 */
export class RetryMap {

    private retries: any = {};

    /**
     * Add retry
     *
     * @param retry
     */
    public addRetry(retry: Retry) {
        this.retries[retry.getUrl() + "~~" + retry.getMethod()] = retry;
    }

    /**
     * Create from array
     */
    public static createFromArray(array: any): RetryMap {
        const retryMap = new RetryMap();
        retryMap.retries = array.map((retry) => Retry.createFromArray(retry));

        return retryMap;
    }

    /**
     * Get retry
     *
     * @param url
     * @param method
     *
     * @returns {Retry}
     */
    public getRetry(
        url: string,
        method: string,
    ): Retry {
        if (this.retries[url + "~~" + method] instanceof Retry) {
            return this.retries[url + "~~" + method];
        }

        if (this.retries["*~~" + method] instanceof Retry) {
            return this.retries["*~~" + method];
        }

        if (this.retries[url + "~~*"] instanceof Retry) {
            return this.retries[url + "~~*"];
        }

        if (this.retries["*~~*"] instanceof Retry) {
            return this.retries["*~~*"];
        }

        return null;
    }
}
