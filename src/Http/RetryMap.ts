import {Retry, RetryConfig} from "./Retry";

/**
 * Http class
 */
export class RetryMap {

    /**
     * Create from array
     */
    public static createFromArray(array: RetryConfig[]): RetryMap {
        const retryMap = new RetryMap();
        for (const retryConfig of array) {
            retryMap.addRetry(Retry.createFromArray(retryConfig));
        }

        return retryMap;
    }

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
