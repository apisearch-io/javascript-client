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
    apiKey,
    options = {}
}) {
    checkAppId(appId);
    checkApiKey(apiKey);

    options = {
        endpoint: '//puntmig.net',
        apiVersion: 'v1',
        timeout: 10000,
        overrideQueries: true,
        ...options,
        cache: {
            inMemory: true,
            http: 0,
            ...options.cache
        },
    };

    return new Apisearch({
        appId,
        apiKey,
        options
    });
};

function checkAppId(appId) {
    if (typeof appId === 'undefined') {
        throw new TypeError(`appId parameter must be defined.`)
    }
}

function checkApiKey(apiKey) {
    if (typeof apiKey === 'undefined') {
        throw new TypeError(`apiKey parameter must be defined.`)
    }
}