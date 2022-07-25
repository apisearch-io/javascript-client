"use strict";
exports.__esModule = true;
exports.CacheClient = void 0;
var tslib_1 = require("tslib");
var ts_md5_1 = require("ts-md5");
/**
 * AxiosClient
 */
var CacheClient = /** @class */ (function () {
    function CacheClient(httpClient) {
        this.cache = {};
        this.hits = 0;
        this.httpClient = httpClient;
    }
    CacheClient.prototype.flushCache = function () {
        this.cache = {};
    };
    CacheClient.prototype.size = function () {
        return Object.keys(this.cache).length;
    };
    CacheClient.prototype.getNumberOfHits = function () {
        return this.hits;
    };
    /**
     * Get
     *
     * @param url
     * @param method
     * @param credentials
     * @param parameters
     * @param data
     *
     * @return {Promise<Response>}
     */
    CacheClient.prototype.get = function (url, method, credentials, parameters, data) {
        if (parameters === void 0) { parameters = {}; }
        if (data === void 0) { data = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cacheUID, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (method !== 'get') {
                            return [2 /*return*/, this.httpClient.get(url, method, credentials, parameters, data)];
                        }
                        cacheUID = ts_md5_1.Md5.hashStr(JSON.stringify({
                            'u': url,
                            'c': credentials,
                            'p': parameters,
                            'd': data
                        })).toString();
                        if (!!this.cache[cacheUID]) return [3 /*break*/, 2];
                        _a = this.cache;
                        _b = cacheUID;
                        return [4 /*yield*/, this.httpClient.get(url, method, credentials, parameters, data)];
                    case 1:
                        _a[_b] = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.httpClient.abort(url, false);
                        this.hits++;
                        _c.label = 3;
                    case 3: return [2 /*return*/, this.cache[cacheUID]];
                }
            });
        });
    };
    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     * @param urlIsFormatted
     */
    CacheClient.prototype.abort = function (url, urlIsFormatted) {
    };
    return CacheClient;
}());
exports.CacheClient = CacheClient;
