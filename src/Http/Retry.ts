export const DEFAULT_MICROSECONDS_BETWEEN_RETRIES = 1000;

export interface RetryConfig {
    url?: string;
    method?: string;
    retries?: number;
    microseconds_between_retries?: number;
}

/**
 * Http class
 */
export class Retry {

    /**
     * Create from array
     *
     * @param array
     *
     * @return {Retry}
     */
    public static createFromArray(array: RetryConfig): Retry {
        return new Retry(
            array.url ? array.url : "*",
            array.method ? array.method : "*",
            array.retries ? array.retries : 0,
            array.microseconds_between_retries
                ? array.microseconds_between_retries
                : DEFAULT_MICROSECONDS_BETWEEN_RETRIES,
        );
    }

    private url: string;
    private method: string;
    private retries: number;
    private microsecondsBetweenRetries: number;

    /**
     * Constructor
     *
     * @param url
     * @param method
     * @param retries
     * @param microsecondsBetweenRetries
     */
    constructor(
        url: string,
        method: string,
        retries: number,
        microsecondsBetweenRetries: number,
    ) {
        this.url = url;
        this.method = method;
        this.retries = retries;
        this.microsecondsBetweenRetries = microsecondsBetweenRetries;
    }

    /**
     * Get url
     *
     * @return {string}
     */
    public getUrl(): string {
        return this.url;
    }

    /**
     * Get method
     *
     * @return {string}
     */
    public getMethod(): string {
        return this.method;
    }

    /**
     * Ge retries
     *
     * @return {number}
     */
    public getRetries(): number {
        return this.retries;
    }

    /**
     * Get microseconds between retries
     *
     * @return {number}
     */
    public getMicrosecondsBetweenRetries(): number {
        return this.microsecondsBetweenRetries;
    }
}
