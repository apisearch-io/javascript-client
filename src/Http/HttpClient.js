import MemoryCache from "../Cache/MemoryCache";
const axios = require('axios/lib/axios');

/**
 * Http class
 */
export default class HttpClient {
    /**
     * Constructor
     * @param cache
     */
    constructor(cache) {
        this.cache = cache
            ? new MemoryCache()
            : null
        ;
    }

    /**
     * Make query against the server
     * @param query
     * @returns {Promise}
     */
    query(query) {
        // check if query exists in cache store
        // return promise with the cached value if key exists
        // if not exists, fetch the data
        if (this.cache !== null) {
            let cachedResponse = this.cache.get(query);
            if (cachedResponse) {
                return new Promise(
                    resolve => resolve(cachedResponse)
                );
            }
        }

        return this.fetchData(query);
    }

    /**
     * Fetch data using Axios
     * @param query
     * @returns {Promise}
     */
    fetchData(query) {
        let self = this;

        return new Promise((resolve, reject) => {
            axios.get(query)
                .then(response => {
                    // check if cache is enabled
                    // set the query as a cache key
                    // and the valid response as a cache value
                    if (self.cache !== null) {
                        self.cache.set(
                            query,
                            response.data
                        );
                    }

                    return resolve(response.data);
                })
                .catch(
                    error => reject(error)
                );
        });
    }
}