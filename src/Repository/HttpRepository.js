const MemoryCache = require("../Cache/MemoryCache");
const fetch = require('node-fetch');

/**
 * Repository class
 */
class HttpRepository {
    /**
     * Constructor
     * @param endpoint
     * @param secret
     * @param cache
     */
    constructor(endpoint, secret, cache) {
        this.endpoint = endpoint;
        this.secret = secret;
        this.cache = cache ? new MemoryCache() : null;
    }

    /**
     * Make query against the server
     * @param query
     * @returns {Promise}
     */
    query(query) {
        query = encodeURI(
            JSON.stringify(query)
        );
        let composedQuery = `${this.endpoint}?key=${this.secret}&query=${query}`;

        // check if query exists in cache store
        // return promise with the cached value if key exists
        // if not exists, fetch data with XMLHttpRequest
        if (this.cache !== null) {
            let cachedResponse = this.cache.get(composedQuery);
            if (cachedResponse) {
                return new Promise(
                    resolve => resolve(cachedResponse)
                );
            }
        }

        return this.fetchData(composedQuery);
    }

    /**
     * Fetch data using Node-Fetch method
     * @param composedQuery
     * @returns {Promise}
     */
    fetchData(composedQuery) {
        let self = this;

        return fetch(composedQuery, {body: null})
            .then(res => {
                let jsonResponse = res.json();

                // check if cache is enabled
                // set the composedQuery as a cache key
                // and the valid response as a cache value
                if (self.cache !== null) {
                    self.cache.set(
                        composedQuery,
                        jsonResponse
                    );
                }

                return jsonResponse;
            })
            .catch(
                err => err
            )
        ;
    }
}

module.exports = HttpRepository;