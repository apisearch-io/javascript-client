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

module.exports = function(appId, apiKey, options) {
    if (typeof appId === 'undefined') {
        throw new TypeError(`AppId parameter must be defined.`)
    }
    if (typeof apiKey === 'undefined') {
       throw new TypeError(`ApiKey parameter must be defined.`)
    }

    return new Apisearch(
        appId,
        apiKey,
        options
    );
};