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
        apiKey,
        options: {
            endpoint,
            apiVersion,
            protocol,
            timeout,
            overrideQueries,
            cache: inMemoryCache
        }
    }) {
        /**
         * Api
         */
        this.appId = appId;
        this.apiKey = apiKey;
        this.apiVersion = apiVersion;
        this.endpoint = endpoint;
        this.protocol = protocol;
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
        this.repository = new HttpClient(
            inMemoryCache ? new MemoryCache() : false
        );
    }

    /**
     * Search entry point
     *
     * @param query
     * @param callback
     * @returns {Promise}
     */
    search(query, callback) {
        let encodedQuery = encodeURIComponent(
            JSON.stringify(query)
        );
        let composedQuery = {
            url: `${this.protocol}://${this.endpoint}/${this.apiVersion}?app_id=${this.appId}&key=${this.apiKey}&query=${encodedQuery}`,
            options: {
                timeout: this.timeout
            }
        };

        /**
         * Abort any previous existing request
         */
        if (this.overrideQueries) {
            this.repository.abort();
        }

        /**
         * Start new request
         */
        return this.repository
            .query(composedQuery)
            .then(
                response => callback(response, null)
            )
            .catch(
                error => callback(null, error)
            )
        ;
    }
}

export default Apisearch;