import HttpClient from "./Http/HttpClient";
import SecureObjectFactory from "./Factory/SecureObjectFactory";
import QueryFactory from "./Factory/QueryFactory";

/**
 * Apisearch class
 */
class Apisearch {
    constructor({
        appId,
        apiKey,
        options: {
            endpoint,
            apiVersion,
            cache
        }
    }) {
        this.appId = appId;
        this.apiKey = apiKey;
        this.apiVersion = apiVersion || 'v1';
        this.endpoint = endpoint || 'http://puntmig.net';

        this.query = QueryFactory;
        this.createObject = SecureObjectFactory;

        this.repository = new HttpClient(
            (typeof cache !== 'undefined') ? cache : true
        );
    }

    search(query, callback) {
        let encodedQuery = encodeURIComponent(
            JSON.stringify(query)
        );
        let composedQuery = (
            `${this.endpoint}/${this.apiVersion}?app_id=${this.appId}&key=${this.apiKey}&query=${encodedQuery}`
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