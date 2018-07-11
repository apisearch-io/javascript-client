import { KeyValueCache } from "./KeyValueCache";
/**
 * Cache class
 */
export declare class InMemoryCache implements KeyValueCache {
    private cache;
    private size;
    /**
     * Constructor
     */
    constructor();
    /**
     * Set cache element
     *
     * @param key
     * @param value
     *
     * @returns {void}
     */
    set(key: string, value: any): void;
    /**
     * Get element from cache
     *
     * @param key
     *
     * @returns {any}
     */
    get(key: string): any | null;
    /**
     * Deletes element from cache
     *
     * @param key
     */
    del(key: string): void;
    /**
     * Clear cache
     */
    clear(): void;
}
