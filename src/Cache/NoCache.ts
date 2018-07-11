import {KeyValueCache} from "./KeyValueCache";

/**
 * Cache class
 */
export class NoCache implements KeyValueCache {

    /**
     * Set cache element
     *
     * @param key
     * @param value
     *
     * @returns {void}
     */
    public set(key: string, value: any): void {
        // Empty
    }

    /**
     * Get element from cache
     *
     * @param key
     *
     * @returns {any}
     */
    public get(key: string): any {
        return undefined;
    }

    /**
     * Deletes element from cache
     *
     * @param key
     */
    public del(key: string) {
        // Empty
    }

    /**
     * Clear cache
     */
    public clear() {
        // Empty
    }
}
