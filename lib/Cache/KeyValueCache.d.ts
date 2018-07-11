/**
 * Cache class
 */
export interface KeyValueCache {
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
    get(key: string): any;
    /**
     * Deletes element from cache
     *
     * @param key
     */
    del(key: string): any;
    /**
     * Clear cache
     */
    clear(): any;
}
