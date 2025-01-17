"use strict";
exports.__esModule = true;
exports.HttpRepository = void 0;
var tslib_1 = require("tslib");
var ConnectionError_1 = require("../Error/ConnectionError");
var InvalidFormatError_1 = require("../Error/InvalidFormatError");
var InvalidTokenError_1 = require("../Error/InvalidTokenError");
var ResourceExistsError_1 = require("../Error/ResourceExistsError");
var ResourceNotAvailableError_1 = require("../Error/ResourceNotAvailableError");
var UnknownError_1 = require("../Error/UnknownError");
var Response_1 = require("../Http/Response");
var Index_1 = require("../Model/Index");
var Item_1 = require("../Model/Item");
var ItemUUID_1 = require("../Model/ItemUUID");
var Result_1 = require("../Result/Result");
var Repository_1 = require("./Repository");
/**
 * Aggregation class
 */
var HttpRepository = /** @class */ (function (_super) {
    tslib_1.__extends(HttpRepository, _super);
    /**
     * Constructor
     *
     * @param httpClient
     * @param appId
     * @param indexId
     * @param token
     * @param transformer
     */
    function HttpRepository(httpClient, appId, indexId, token, transformer) {
        var _this = _super.call(this, appId, indexId, token) || this;
        _this.httpClient = httpClient;
        _this.transformer = transformer;
        return _this;
    }
    /**
     * Get transformer
     *
     * @return {Transformer}
     */
    HttpRepository.prototype.getTransformer = function () {
        return this.transformer;
    };
    /**
     * Generate item document by a simple object.
     *
     * @param object
     *
     * @returns {void}
     */
    HttpRepository.prototype.addObject = function (object) {
        var item = this
            .transformer
            .toItem(object);
        if (item instanceof Item_1.Item) {
            this.addItem(item);
        }
    };
    /**
     * Delete item document by uuid.
     *
     * @param object
     *
     * @returns {void}
     */
    HttpRepository.prototype.deleteObject = function (object) {
        var itemUUID = this
            .transformer
            .toItemUUID(object);
        if (itemUUID instanceof ItemUUID_1.ItemUUID) {
            this.deleteItem(itemUUID);
        }
    };
    /**
     * Flush update items
     *
     * @param {Item[]} itemsToUpdate
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.flushUpdateItems = function (itemsToUpdate) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (itemsToUpdate.length === 0) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId + "/items", "put", this.getCredentials(), {}, itemsToUpdate.map(function (item) {
                                return item.toArray();
                            }))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response_1 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Flush delete items
     *
     * @param {ItemUUID[]} itemsToDelete
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.flushDeleteItems = function (itemsToDelete) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (itemsToDelete.length === 0) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId + "/items", "delete", this.getCredentials(), {}, itemsToDelete.map(function (itemUUID) {
                                return itemUUID.toArray();
                            }))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response_2 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Query
     *
     * @param {Query} query
     *
     * @return {Promise<Result>}
     */
    HttpRepository.prototype.query = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, response_3, result, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId, "get", this.getCredentials(), {
                                query: JSON.stringify(query.toArray())
                                    .replace(/&/g, "%26")
                            }, {})];
                    case 1:
                        response = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_3 = _c.sent();
                        throw HttpRepository.createErrorFromResponse(response_3);
                    case 3:
                        result = Result_1.Result.createFromArray(response.getBody());
                        result = this.applyTransformersToResult(result);
                        if (!(typeof globalThis !== "undefined" &&
                            typeof globalThis.apisearchItemsTransformation === "function")) return [3 /*break*/, 5];
                        _b = (_a = result).withItems;
                        return [4 /*yield*/, globalThis.apisearchItemsTransformation(result.getItems())];
                    case 4:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 5;
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Get similar items
     *
     * @param {Query} query
     * @param {ItemUUID[]} itemUUIDs
     * @param {number} similarity
     *
     * @return {Promise<Result>}
     */
    HttpRepository.prototype.getSimilarItems = function (query, itemUUIDs, similarity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, response_4, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId + '/similar-items', "get", this.getCredentials(), {}, {
                                query: query.toArray(),
                                items_uuid: itemUUIDs.map(function (itemUUID) {
                                    return itemUUID.toArray();
                                }),
                                similarity: similarity
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_4 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_4);
                    case 3:
                        result = Result_1.Result.createFromArray(response.getBody());
                        return [2 /*return*/, this.applyTransformersToResult(result)];
                }
            });
        });
    };
    /**
     * Get recommended items
     *
     * @param {Query} query
     *
     * @return {Promise<Result>}
     */
    HttpRepository.prototype.getRecommendedItems = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, response_5, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId + '/recommended-items', "get", this.getCredentials(), {}, query.toArray())];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_5 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_5);
                    case 3:
                        result = Result_1.Result.createFromArray(response.getBody());
                        return [2 /*return*/, this.applyTransformersToResult(result)];
                }
            });
        });
    };
    /**
     * Update items
     *
     * @param {Query} query
     * @param {Changes} changes
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.updateItems = function (query, changes) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId + "/items/update-by-query", "put", this.getCredentials(), {}, {
                                changes: changes.toArray(),
                                query: query.toArray()
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_6 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_6);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create index
     *
     * @param {IndexUUID} indexUUID
     * @param {Config} config
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.createIndex = function (indexUUID, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID(), "put", this.getCredentials(), {}, config.toArray())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_7 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_7);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.deleteIndex = function (indexUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID(), "delete", this.getCredentials(), {}, {})];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_8 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_8);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reset index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.resetIndex = function (indexUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID() + "/reset", "put", this.getCredentials(), {}, {})];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_9 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_9);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<boolean>}
     */
    HttpRepository.prototype.checkIndex = function (indexUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, response_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID(), "head", this.getCredentials(), {}, {})];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_10 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_10);
                    case 3: return [2 /*return*/, response.getCode() === 200];
                }
            });
        });
    };
    /**
     * Check index
     *
     * @return {Promise<Index[]>}
     */
    HttpRepository.prototype.getIndices = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, response_11, result, _i, _a, indexAsArray;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/", "get", this.getCredentials(), {}, {})];
                    case 1:
                        response = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_11 = _b.sent();
                        throw HttpRepository.createErrorFromResponse(response_11);
                    case 3:
                        result = [];
                        for (_i = 0, _a = response.getBody(); _i < _a.length; _i++) {
                            indexAsArray = _a[_i];
                            result.push(Index_1.Index.createFromArray(indexAsArray));
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Configure index
     *
     * @param {IndexUUID} indexUUID
     * @param {Config} config
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.configureIndex = function (indexUUID, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID() + "/configure", "put", this.getCredentials(), {}, config.toArray())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_12 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_12);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param indexUUID
     * @param itemUUID
     * @param userId
     * @param queryString
     * @param interaction
     * @param site
     * @param device
     * @param position
     */
    HttpRepository.prototype.pushInteraction = function (indexUUID, itemUUID, userId, queryString, interaction, site, device, position) {
        if (site === void 0) { site = null; }
        if (device === void 0) { device = null; }
        if (position === void 0) { position = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var parameters, response_13;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {
                            query_string: queryString,
                            site: site,
                            device: device,
                            user_id: userId,
                            position: position
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID() + "/items/" + itemUUID.composedUUID() + "/interaction/" + interaction, "post", {
                                token: this.token
                            }, parameters, {})];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response_13 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_13);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {IndexUUID} indexUUID
     * @param {string} userId
     * @param {ItemUUID[]} itemUUIDs
     * @param {string} site
     * @param {string} device
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.purchase = function (indexUUID, userId, itemUUIDs, site, device) {
        if (site === void 0) { site = null; }
        if (device === void 0) { device = null; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var parameters, response_14;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {
                            site: site,
                            device: device,
                            user_id: userId
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID() + "/purchase", "post", {
                                token: this.token
                            }, parameters, {
                                items_uuid: itemUUIDs.map(function (itemUUID) {
                                    return itemUUID.toArray();
                                })
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response_14 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_14);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     */
    HttpRepository.prototype.getHttpClient = function () {
        return this.httpClient;
    };
    /**
     * Get query values
     *
     * @returns any
     */
    HttpRepository.prototype.getCredentials = function () {
        return {
            app_id: this.appId,
            token: this.token
        };
    };
    /**
     * Apply transformers to results
     *
     * @param {Result} result
     *
     * @return {Result}
     */
    HttpRepository.prototype.applyTransformersToResult = function (result) {
        if (!this.transformer.hasReadTransformers()) {
            return result;
        }
        var subresults = result.getSubresults();
        if (Object.keys(subresults).length > 0) {
            Object.keys(subresults).map(function (key) {
                subresults[key] = this.applyTransformersToResult(subresults[key]);
            }.bind(this));
            return Result_1.Result.createMultiresults(subresults);
        }
        return Result_1.Result.create(result.getQueryUUID(), result.getTotalItems(), result.getTotalHits(), result.getAggregations(), result.getSuggestions(), this
            .transformer
            .fromItems(result.getItems()), result.getAutocomplete());
    };
    /**
     * @param response
     * @private
     */
    HttpRepository.createErrorFromResponse = function (response) {
        var error;
        if (response instanceof Response_1.Response) {
            switch (response.getCode()) {
                case ResourceNotAvailableError_1.ResourceNotAvailableError.getTransportableHTTPError():
                    error = new ResourceNotAvailableError_1.ResourceNotAvailableError(response.getBody().message);
                    break;
                case InvalidTokenError_1.InvalidTokenError.getTransportableHTTPError():
                    error = new InvalidTokenError_1.InvalidTokenError(response.getBody().message);
                    break;
                case InvalidFormatError_1.InvalidFormatError.getTransportableHTTPError():
                    error = new InvalidFormatError_1.InvalidFormatError(response.getBody().message);
                    break;
                case ResourceExistsError_1.ResourceExistsError.getTransportableHTTPError():
                    error = new ResourceExistsError_1.ResourceExistsError(response.getBody().message);
                    break;
                case ConnectionError_1.ConnectionError.getTransportableHTTPError():
                    error = new ConnectionError_1.ConnectionError(response.getBody().message);
                    break;
            }
        }
        return undefined === error
            ? UnknownError_1.UnknownError.createUnknownError()
            : error;
    };
    return HttpRepository;
}(Repository_1.Repository));
exports.HttpRepository = HttpRepository;
