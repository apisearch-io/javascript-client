"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var ConnectionError_1 = require("../Error/ConnectionError");
var InvalidFormatError_1 = require("../Error/InvalidFormatError");
var InvalidTokenError_1 = require("../Error/InvalidTokenError");
var ResourceExistsError_1 = require("../Error/ResourceExistsError");
var ResourceNotAvailableError_1 = require("../Error/ResourceNotAvailableError");
var Item_1 = require("../Model/Item");
var ItemUUID_1 = require("../Model/ItemUUID");
var Result_1 = require("../Result/Result");
var Repository_1 = require("./Repository");
var Index_1 = require("../Model/Index");
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
     * @param itemsToUpdate
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.flushUpdateItems = function (itemsToUpdate) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (itemsToUpdate.length === 0) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, this
                        .httpClient
                        .get("/" + this.appId + "/indices/" + this.indexId + "/items", "put", this.getCredentials(), {}, itemsToUpdate.map(function (item) {
                        return item.toArray();
                    }))
                        .then(function (response) {
                        HttpRepository.throwTransportableExceptionIfNeeded(response);
                    })];
            });
        });
    };
    /**
     * Flush delete items
     *
     * @param itemsToDelete
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.flushDeleteItems = function (itemsToDelete) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (itemsToDelete.length === 0) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, this
                        .httpClient
                        .get("/" + this.appId + "/indices/" + this.indexId + "/items", "delete", this.getCredentials(), {}, itemsToDelete.map(function (itemUUID) {
                        return itemUUID.toArray();
                    }))
                        .then(function (response) {
                        HttpRepository.throwTransportableExceptionIfNeeded(response);
                    })];
            });
        });
    };
    /**
     * Query
     *
     * @param query
     *
     * @return {Promise<Result>}
     */
    HttpRepository.prototype.query = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/" + this.appId + "/indices/" + this.indexId, "get", this.getCredentials(), {
                            query: JSON.stringify(query.toArray())
                        }, {})
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            var result = Result_1.Result.createFromArray(response.getBody());
                            return _this.applyTransformersToResult(result);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Apply transformers to results
     *
     * @param result
     *
     * @return {Result}
     */
    HttpRepository.prototype.applyTransformersToResult = function (result) {
        var subresults = result.getSubresults();
        if (Object.keys(subresults).length > 0) {
            Object.keys(subresults).map(function (key) {
                subresults[key] = this.applyTransformersToResult(subresults[key]);
            }.bind(this));
            return Result_1.Result.createMultiresults(subresults);
        }
        return Result_1.Result.create(result.getQueryUUID(), result.getTotalItems(), result.getTotalHits(), result.getAggregations(), result.getSuggests(), this
            .transformer
            .fromItems(result.getItems()));
    };
    /**
     * Update items
     *
     * @param query
     * @param changes
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.updateItems = function (query, changes) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/" + this.appId + "/indices/" + this.indexId + "/items/update-by-query", "post", this.getCredentials(), {}, {
                            query: query.toArray(),
                            changes: changes.toArray()
                        })
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create index
     *
     * @param indexUUID
     * @param config
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.createIndex = function (indexUUID, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/" + this.appId + "/indices/" + indexUUID.composedUUID(), "put", this.getCredentials(), {}, config.toArray())
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete index
     *
     * @param indexUUID
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.deleteIndex = function (indexUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/" + this.appId + "/indices/" + this.indexId, "delete", this.getCredentials(), {}, {})
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Reset index
     *
     * @param indexUUID
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.resetIndex = function (indexUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/" + this.appId + "/indices/" + this.indexId + '/reset', "post", this.getCredentials(), {}, {})
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Check index
     *
     * @param indexUUID
     *
     * @return {Promise<boolean>}
     */
    HttpRepository.prototype.checkIndex = function (indexUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/" + this.appId + "/indices/" + this.indexId + '/reset', "head", this.getCredentials(), {}, {})
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return response.getCode() === 200;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
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
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/" + this.appId + "/indices/", "get", this.getCredentials(), {}, {})
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            var result = [];
                            for (var _i = 0, _a = response.getBody(); _i < _a.length; _i++) {
                                var indexAsArray = _a[_i];
                                result.push(Index_1.Index.createFromArray(indexAsArray));
                            }
                            return result;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Configure index
     *
     * @param indexUUID
     * @param config
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.configureIndex = function (indexUUID, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/" + this.appId + "/indices/" + this.indexId + '/configure', "post", this.getCredentials(), {}, config.toArray())
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
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
     * throw error if needed
     *
     * @param response
     */
    HttpRepository.throwTransportableExceptionIfNeeded = function (response) {
        if (typeof response.getCode() == "undefined") {
            return;
        }
        switch (response.getCode()) {
            case ResourceNotAvailableError_1.ResourceNotAvailableError.getTransportableHTTPError():
                throw new ResourceNotAvailableError_1.ResourceNotAvailableError(response.getBody().message);
            case InvalidTokenError_1.InvalidTokenError.getTransportableHTTPError():
                throw new InvalidTokenError_1.InvalidTokenError(response.getBody().message);
            case InvalidFormatError_1.InvalidFormatError.getTransportableHTTPError():
                throw new InvalidFormatError_1.InvalidFormatError(response.getBody().message);
            case ResourceExistsError_1.ResourceExistsError.getTransportableHTTPError():
                throw new ResourceExistsError_1.ResourceExistsError(response.getBody().message);
            case ConnectionError_1.ConnectionError.getTransportableHTTPError():
                throw new ConnectionError_1.ConnectionError(response.getBody().message);
        }
    };
    return HttpRepository;
}(Repository_1.Repository));
exports.HttpRepository = HttpRepository;
