/**
 * Cache class
 */
class MemoryCache {
    constructor() {
        this.cache = {};
        this.size = 0;

        return this;
    }

    set(key, value) {
        this.cache = {
            ...this.cache,
            [key]: value
        };
        this.size = this.size + 1;

        return this;
    }

    get(key) {
        return this.cache[key];
    }

    clear() {
        this.cache = {};
        this.size = 0;
    }
}

module.exports = MemoryCache;