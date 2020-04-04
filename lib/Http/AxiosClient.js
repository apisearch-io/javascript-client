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
     */
    function AxiosClient(host, version, timeout, retryMap, overrideQueries) {
        var _this = _super.call(this, version, retryMap) || this;
        _this.host = host;
        _this.timeout = timeout;
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
            var headers, axiosRequestConfig, sendRequest, retry, axiosResponse, error_1, response;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = url.replace(/^\/*|\/*$/g, "");
                        url = "/" + (this.version + "/" + url).replace(/^\/*|\/*$/g, "");
                        method = method.toLowerCase();
                        if ("get" === method &&
                            this.overrideQueries) {
                            this.abort(url);
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
                            }))
                        };
                        if (typeof this.cancelToken[url] !== "undefined") {
                            axiosRequestConfig.cancelToken = this.cancelToken[url].token;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        sendRequest = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, axios_1["default"].request(axiosRequestConfig)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); };
                        retry = this.retryMap.getRetry(axiosRequestConfig.url, axiosRequestConfig.method);
                        return [4 /*yield*/, this.tryRequest(sendRequest, retry)];
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
                                message: "Connection failed or timed out"
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
    /**
     * Performs the request and maybe retries in case of failure
     *
     * @param sendRequest The function that, when called, will perform the HTTP request
     * @param retry       If it's an instance of Retry and the request fails it will retry the request
     *
     * @return {Promise<AxiosResponse>}
     */
    AxiosClient.prototype.tryRequest = function (sendRequest, retry) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var retries, millisecondsBetweenRetries, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        retries = 0;
                        millisecondsBetweenRetries = 0;
                        if (retry instanceof __1.Retry) {
                            retries = retry.getRetries();
                            millisecondsBetweenRetries = retry.getMicrosecondsBetweenRetries() / 1000;
                        }
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 8];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 7]);
                        return [4 /*yield*/, sendRequest()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_2 = _a.sent();
                        if (retries <= 0) {
                            throw error_2;
                        }
                        retries -= 1;
                        if (!(millisecondsBetweenRetries > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, millisecondsBetweenRetries); })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return AxiosClient;
}(Client_1.Client));
exports.AxiosClient = AxiosClient;
