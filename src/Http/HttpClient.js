const axios = require('axios/lib/axios');
const CancelToken = require('axios/lib/cancel/CancelToken');

/**
 * Http class
 */
export default class HttpClient {
    /**
     * Constructor
     * @param cache
     */
    constructor(cache) {
        this.cache = cache;
        this.cancelToken = CancelToken.source();
    }

    /**
     * Make query against the server
     * @param query
     * @returns {Promise}
     */
    query(query) {
        /**
         * Check if query exists in cache store
         * return promise with the cached value if key exists
         * if not exists, fetch the data
         */
        if (this.cache) {
            let cachedResponse = this.cache.get(query.url);
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
        /**
         * Attach new cancellation token
         */
        query.options = {
            ...query.options,
            cancelToken: this.cancelToken.token
        };

        /**
         * Request promise
         */
        const self = this;
        return new Promise((resolve, reject) => {
            axios.get(query.url, query.options)
                .then(response => {
                    /**
                     * Check if cache is enabled
                     * set the query as a cache key
                     * and the valid response as a cache value
                     */
                    if (self.cache) {
                        self.cache.set(
                            query.url,
                            response.data
                        );
                    }

                    return resolve(response.data);
                })
                .catch(
                    thrown => reject(thrown)
                )
            ;
        });
    }

    /**
     * Abort current request
     * And regenerate the cancellation token
     */
    abort() {
        this.cancelToken.cancel();
        this.cancelToken = CancelToken.source();
    }
}