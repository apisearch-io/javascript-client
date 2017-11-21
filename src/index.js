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
    options
}) {
    if (typeof appId === 'undefined') {
        throw new TypeError(`appId parameter must be defined.`)
    }
    if (typeof apiKey === 'undefined') {
       throw new TypeError(`apiKey parameter must be defined.`)
    }
    if (typeof options === 'undefined') {
        options = {}
    }

    return new Apisearch({
        appId,
        apiKey,
        options: {
            endpoint: options.endpoint,
            apiVersion: options.apiVersion,
            cache: options.cache
        }
    });
};