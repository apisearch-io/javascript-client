"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var axios_1 = require("axios");
var __1 = require("..");
var Client_1 = require("./Client");
var Response_1 = require("./Response");
/**
 * AxiosClient
 */
var AxiosClient = /** @class */ (function (_super) {
    tslib_1.__extends(AxiosClient, _super);
    /**
     * Constructor
     *
     * @param host
     * @param version
     * @param timeout
     * @param retryMap
     * @param overrideQueries
     * @param cache
     */
    function AxiosClient(host, version, timeout, retryMap, overrideQueries, cache) {
        var _this = _super.call(this, version, retryMap) || this;
        _this.host = host;
        _this.timeout = timeout;
        _this.cache = cache;
        _this.overrideQueries = overrideQueries;
        _this.cancelToken = {};
        return _this;
    }
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
    AxiosClient.prototype.get = function (url, method, credentials, parameters, data) {
        if (parameters === void 0) { parameters = {}; }
        if (data === void 0) { data = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var that;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                that = this;
                url = url.replace(/^\/*|\/*$/g, "");
                url = "/" + (this.version + "/" + url).replace(/^\/*|\/*$/g, "");
                method = method.toLowerCase();
                if ("get" === method &&
                    this.overrideQueries) {
                    this.abort(url);
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var headers = "get" === method
                            ? {}
                            : {
                                "Content-Encoding": "gzip",
                                "Content-Type": "application/json"
                            };
                        var axiosRequestConfig = {
                            baseURL: that.host.replace(/\/*$/g, ""),
                            data: data,
                            headers: headers,
                            method: method,
                            timeout: that.timeout,
                            transformRequest: [function (rawData) { return JSON.stringify(rawData); }],
                            url: url + "?" + Client_1.Client.objectToUrlParameters(tslib_1.__assign({}, parameters, {
                                token: credentials.token
                            }))
                        };
                        if (typeof _this.cancelToken[url] !== "undefined") {
                            axiosRequestConfig.cancelToken = _this.cancelToken[url].token;
                        }
                        axios_1["default"]
                            .request(axiosRequestConfig)
                            .then(function (axiosResponse) {
                            var response = new Response_1.Response(axiosResponse.status, axiosResponse.data);
                            return resolve(response);
                        })["catch"](function (error) {
                            var response;
                            if (error.response) {
                                response = new Response_1.Response(error.response.status, error.response.data);
                            }
                            else {
                                response = new Response_1.Response(__1.ConnectionError.getTransportableHTTPError(), {
                                    message: "Connection failed or timed out"
                                });
                            }
                            reject(response);
                        });
                    })];
            });
        });
    };
    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     */
    AxiosClient.prototype.abort = function (url) {
        if (typeof this.cancelToken[url] !== "undefined") {
            this.cancelToken[url].cancel();
        }
        this.generateCancelToken(url);
    };
    /**
     * Generate a new cancellation token for a query
     *
     * @param url
     */
    AxiosClient.prototype.generateCancelToken = function (url) {
        this.cancelToken[url] = axios_1["default"].CancelToken.source();
    };
    return AxiosClient;
}(Client_1.Client));
exports.AxiosClient = AxiosClient;
