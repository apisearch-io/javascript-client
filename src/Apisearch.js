import HttpClient from "./Http/HttpClient";
import SecureObjectFactory from "./Factory/SecureObjectFactory";
import QueryFactory from "./Factory/QueryFactory";

/**
 * Apisearch class
 */
class Apisearch {
    constructor(appId, apiKey, options = {}) {
        this.appId = appId;
        this.apiKey = apiKey;
        this.endpoint = options.endpoint || 'http://127.0.0.1:9002/app.php';

        this.query = QueryFactory;
        this.createObject = SecureObjectFactory;

        this.repository = new HttpClient(
            (typeof options.cache !== 'undefined')
                ? options.cache
                : true
        );
    }

    search(query, callback) {
        let encodedQuery = encodeURIComponent(
            JSON.stringify(query)
        );
        let composedQuery = (
            `${this.endpoint}?app_id=${this.appId}&key=${this.apiKey}&query=${encodedQuery}`
        );

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