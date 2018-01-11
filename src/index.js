import Apisearch from "./Apisearch";

/**
 * Entry point for the Apisearch client
 *
 * @param appId
 * @param apiKey
 * @param options
 *
 * @returns {Apisearch}
 */

module.exports = function({
    appId,
    indexId,
    token,
    options = {}
}) {
    ensureIsDefined(appId, 'appId');
    ensureIsDefined(indexId, 'indexId');
    ensureIsDefined(token, 'token');

    options = {
        endpoint: 'https://apisearch.global.ssl.fastly.net',
        apiVersion: 'v1',
        timeout: 10000,
        overrideQueries: true,
        cache: true,
        ...options,
    };

    return new Apisearch({
        appId,
        indexId,
        token,
        options
    });
};

function ensureIsDefined(param, name) {
    if (typeof param === 'undefined') {
        throw new TypeError(`${name} parameter must be defined.`)
    }
}