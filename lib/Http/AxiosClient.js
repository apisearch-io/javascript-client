"use strict";
exports.__esModule = true;
exports.AxiosClient = void 0;
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
     * @param overrideQueries
     */
    function AxiosClient(host, version, timeout, overrideQueries) {
        var _this = _super.call(this, version) || this;
        _this.host = host;
        _this.timeout = timeout;
        _this.overrideQueries = overrideQueries;
        _this.abortControllers = {};
        return _this;
    }
    /**
     * @param url
     * @param method
     * @param credentials
     * @param parameters
     * @param data
     */
    AxiosClient.prototype.get = function (url, method, credentials, parameters, data) {
        if (parameters === void 0) { parameters = {}; }
        if (data === void 0) { data = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headers, axiosRequestConfig, axiosResponse, error_1, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = url.replace(/^\/*|\/*$/g, "");
                        url = "/" + (this.version + "/" + url).replace(/^\/*|\/*$/g, "");
                        method = method.toLowerCase();
                        if ("get" === method &&
                            this.overrideQueries) {
                            this.abort(url, true);
                        }
                        headers = "get" === method
                            ? {}
                            : {
                                "Content-Encoding": "gzip",
                                "Content-Type": "application/json"
                            };
                        axiosRequestConfig = {
                            baseURL: this.host.replace(/\/*$/g, ""),
                            data: data,
                            headers: headers,
                            method: method,
                            timeout: this.timeout,
                            transformRequest: [function (rawData) { return JSON.stringify(rawData); }],
                            url: url + "?" + Client_1.Client.objectToUrlParameters(tslib_1.__assign(tslib_1.__assign({}, parameters), {
                                token: credentials.token
                            })).replace(/#/g, "%23")
                        };
                        if (typeof this.abortControllers[url] !== "undefined") {
                            axiosRequestConfig.signal = this.abortControllers[url].signal;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fetch(url, axiosRequestConfig, 3)];
                    case 2:
                        axiosResponse = _a.sent();
                        return [2 /*return*/, new Response_1.Response(axiosResponse.status, axiosResponse.data)];
                    case 3:
                        error_1 = _a.sent();
                        response = void 0;
                        if (error_1.response) {
                            response = new Response_1.Response(error_1.response.status, error_1.response.data);
                        }
                        else {
                            response = new Response_1.Response(__1.ConnectionError.getTransportableHTTPError(), {
                                message: error_1.message
                            });
                        }
                        throw response;
                    case 4: return [2 /*return*/];
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
    AxiosClient.prototype.abort = function (url, urlIsFormatted) {
        if (!urlIsFormatted) {
            url = url.replace(/^\/*|\/*$/g, "");
            url = "/" + (this.version + "/" + url).replace(/^\/*|\/*$/g, "");
        }
        if (typeof this.abortControllers[url] !== "undefined") {
            this.abortControllers[url].abort();
        }
        this.generateAbortController(url);
    };
    /**
     * Generate a new cancellation token for a query
     *
     * @param url
     */
    AxiosClient.prototype.generateAbortController = function (url) {
        this.abortControllers[url] = new AbortController();
    };
    /**
     * @param url
     * @param options
     * @param retries
     */
    AxiosClient.prototype.fetch = function (url, options, retries) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"]
                            .request(options)
                            .then(function (response) {
                            return {
                                data: response.data,
                                status: response.status
                            };
                        })["catch"](function (error) {
                            var response = error.response;
                            if (error.code !== undefined &&
                                error.code !== "ECONNREFUSED" &&
                                error.code !== "ECONNABORTED" &&
                                error.code !== "ERR_BAD_REQUEST" &&
                                error.message !== "Network Error") {
                                return {
                                    data: response.data,
                                    status: response.status
                                };
                            }
                            if (retries <= 0) {
                                throw error;
                            }
                            retries = retries - 1;
                            return _this.fetch(url, options, retries);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AxiosClient;
}(Client_1.Client));
exports.AxiosClient = AxiosClient;
