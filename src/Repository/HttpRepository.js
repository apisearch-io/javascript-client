/**
 * Repository class
 */
import MemoryCache from "../Cache/MemoryCache";

export default class HttpRepository {
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
                return new Promise(resolve => resolve(cachedResponse));
            }
        }

        return this.fetchData(composedQuery);
    }

    fetchData(composedQuery) {
        let self = this;
        return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            let parsedResponse = JSON.parse(this.responseText);

                            // check if cache is enabled
                            // set the composedQuery as a cache key
                            // and the valid response as a cache value
                            if (this.cache !== null) {
                                self.cache.set(
                                    composedQuery,
                                    parsedResponse
                                );
                            }

                            return resolve(parsedResponse);
                        } else {
                            return reject(`Request error.`)
                        }
                    }
                };

                xhr.open("GET", composedQuery, true);
                xhr.send();
            }
        );
    }
}