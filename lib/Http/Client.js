"use strict";
exports.__esModule = true;
exports.Client = void 0;
/**
 * Client
 */
var Client = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param version
     */
    function Client(version) {
        this.version = version.replace(/^\/*|\/*$/g, "");
    }
    /**
     * Build an url parameters array by an object
     *
     * @param params
     *
     * @returns {string}
     */
    Client.objectToUrlParameters = function (params) {
        var builtParams = [];
        for (var i in params) {
            builtParams.push(i + "=" + params[i]);
        }
        return builtParams.join("&");
    };
    return Client;
}());
exports.Client = Client;
