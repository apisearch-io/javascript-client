import HttpClient from "./Http/HttpClient";
import SecureObjectFactory from "./Factory/SecureObjectFactory";
import QueryFactory from "./Factory/QueryFactory";
import MemoryCache from "./Cache/MemoryCache";

/**
 * Apisearch class
 */
class Apisearch {
    /**
     * Constructor.
     */
    constructor({
        appId,
        indexId,
        token,
        options: {
            endpoint,
            apiVersion,
            timeout,
            overrideQueries,
            cache: inMemoryCache
        }
    }) {
        /**
         * Api
         */
        this.appId = appId;
        this.indexId = indexId;
        this.token = token;
        this.apiVersion = apiVersion;
        this.endpoint = endpoint;
        this.timeout = timeout;
        this.overrideQueries = overrideQueries;

        /**
         * Query
         */
        this.query = QueryFactory;
        this.createObject = SecureObjectFactory;

        /**
         * HttpClient
         */
        this.client = new HttpClient(
            inMemoryCache ? new MemoryCache() : false
        );
    }

    /**
     * Search items
     *
     * @param query
     * @param callback
     * @returns {Promise}
     */
    search(query, callback) {
        let encodedQuery = encodeURIComponent(
            JSON.stringify(query)
        );
        let url = `${this.endpoint}/${this.apiVersion}?app_id=${this.appId}&index=${this.indexId}&token=${this.token}&query=${encodedQuery}`;

        return this
            .fetch(url)
            .then(response => callback(response, null))
            .catch(error => callback(null, error))
        ;
    }

    /**
     * Search events
     *
     * @param query
     * @param callback
     * @returns {Promise}
     */
    events(query, callback) {
        let encodedQuery = encodeURIComponent(
            JSON.stringify(query)
        );
        let url = `${this.endpoint}/${this.apiVersion}/events?app_id=${this.appId}&index=${this.indexId}&token=${this.token}&query=${encodedQuery}`;

        return this
            .fetch(url)
            .then(response => callback(response, null))
            .catch(error => callback(null, error))
        ;
    }

    /**
     * Fetch data
     *
     * @param url
     * @returns {Promise}
     */
    fetch(url) {
        let composedQuery = {
            url: url,
            options: {
                timeout: this.timeout
            }
        };

        /**
         * Abort any previous existing request
         */
        if (this.overrideQueries) {
            this.client.abort();
        }

        /**
         * Start new request
         */
        return this.client.query(composedQuery)
    }
}

export default Apisearch;