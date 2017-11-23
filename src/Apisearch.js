import HttpClient from "./Http/HttpClient";
import SecureObjectFactory from "./Factory/SecureObjectFactory";
import QueryFactory from "./Factory/QueryFactory";

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
            timeout,
            cache: {
                inMemory: inMemoryCache,
                http: httpCacheTTL
            }
        }
    }) {
        /**
         * Api
         */
        this.appId = appId;
        this.apiKey = apiKey;
        this.apiVersion = apiVersion;
        this.endpoint = endpoint;
        this.httpCacheTTL = httpCacheTTL;
        this.timeout = timeout;

        /**
         * Query
         */
        this.query = QueryFactory;
        this.createObject = SecureObjectFactory;

        /**
         * HttpClient
         */
        this.repository = new HttpClient(inMemoryCache);
    }

    search(query, callback) {
        let encodedQuery = encodeURIComponent(
            JSON.stringify(query)
        );
        let composedQuery = {
            url: `${this.endpoint}/${this.apiVersion}?app_id=${this.appId}&key=${this.apiKey}&query=${encodedQuery}`,
            options: {
                timeout: this.timeout,
            }
        };

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