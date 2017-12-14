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
    index,
    token,
    options = {}
}) {
    checkAppId(appId);
    checkIndex(index);
    checkApiKey(token);

    options = {
        endpoint: 'api.apisear.ch',
        apiVersion: 'v1',
        protocol: 'http',
        timeout: 10000,
        overrideQueries: true,
        cache: true,
        ...options,
    };

    return new Apisearch({
        appId,
        index,
        token,
        options
    });
};

function checkAppId(appId) {
    if (typeof appId === 'undefined') {
        throw new TypeError(`appId parameter must be defined.`)
    }
}

function checkIndex(index) {
    if (typeof index === 'undefined') {
        throw new TypeError(`index parameter must be defined.`)
    }
}

function checkApiKey(token) {
    if (typeof token === 'undefined') {
        throw new TypeError(`token parameter must be defined.`)
    }
}