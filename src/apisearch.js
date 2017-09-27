const HttpRepository = require("./Repository/HttpRepository");
const SecureObjectFactory = require("./Factory/SecureObjectFactory").SecureObjectFactory;
const QueryFactory = require("./Factory/QueryFactory").QueryFactory;

/**
 * Entry point for the Apisearch client
 *
 * @param apiKey
 * @param endpoint
 *
 * @returns {Apisearch}
 */
module.exports = function(apiKey, endpoint) {
    if (typeof apiKey === 'undefined') {
       throw new TypeError(`ApiKey parameter must be defined.`)
    }

    return new Apisearch(
        'apisearch-app-id',
        apiKey,
        endpoint
    );
};

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

        this.repository = new HttpRepository(
            this.endpoint,
            this.apiKey,
            options.cache || true
        );
    }

    search(query, callback) {
        return this.repository
            .query(query)
            .then(
                response => callback(response, null)
            )
            .catch(
                error => callback(null, error)
            )
        ;
    }
}