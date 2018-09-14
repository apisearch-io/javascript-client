"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var Query_1 = require("../Query/Query");
var Result_1 = require("../Result/Result");
var Response_1 = require("./Response");
/**
 * AxiosClient
 */
var TestClient = /** @class */ (function () {
    function TestClient() {
        this.calls = [];
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
    TestClient.prototype.get = function (url, method, credentials, parameters, data) {
        if (parameters === void 0) { parameters = {}; }
        if (data === void 0) { data = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.calls.push({
                    url: url,
                    method: method,
                    credentials: credentials,
                    parameters: parameters,
                    data: data
                });
                if (credentials.token === "error") {
                    throw new Error("Error found");
                }
                return [2 /*return*/, new Promise(function (resolve) { return resolve(new Response_1.Response(200, ((method === "get" &&
                        url === "/")
                        ? Result_1.Result.createFromArray({
                            query: Query_1.Query.createMatchAll()
                        }).toArray()
                        : ""))); })];
            });
        });
    };
    /**
     * Generate a new cancellation token for a query
     *
     * @param url
     */
    TestClient.prototype.generateCancelToken = function (url) {
    };
    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     */
    TestClient.prototype.abort = function (url) {
    };
    return TestClient;
}());
exports.TestClient = TestClient;
