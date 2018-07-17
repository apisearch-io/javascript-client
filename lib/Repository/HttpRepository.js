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
     * flush items
     *
     * @param itemsToUpdate
     * @param itemsToDelete
     *
     * @Returns {Promise<void>}
     */
    HttpRepository.prototype.flushItems = function (itemsToUpdate, itemsToDelete) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, this.flushUpdateItems(itemsToUpdate)];
                    case 1:
                        _c = [
                            _d.sent()
                        ];
                        return [4 /*yield*/, this.flushDeleteItems(itemsToDelete)];
                    case 2: return [4 /*yield*/, _b.apply(_a, [_c.concat([
                                _d.sent()
                            ])]).then(function (_) {
                            return;
                        })];
                    case 3:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
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
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (itemsToUpdate.length > 0)];
                    case 1: return [2 /*return*/, (_a.sent())
                            ? this
                                .httpClient
                                .get("/items", "post", this.getCredentials(), {}, {
                                items: itemsToUpdate.map(function (item) {
                                    return item.toArray();
                                })
                            })
                                .then(function (response) {
                                HttpRepository.throwTransportableExceptionIfNeeded(response);
                            })
                            : null];
                }
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
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (itemsToDelete.length > 0)];
                    case 1: return [2 /*return*/, (_a.sent())
                            ? this
                                .httpClient
                                .get("/items", "delete", this.getCredentials(), {}, {
                                items: itemsToDelete.map(function (itemUUID) {
                                    return itemUUID.toArray();
                                })
                            })
                                .then(function (response) {
                                HttpRepository.throwTransportableExceptionIfNeeded(response);
                            })
                            : null];
                }
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
            var that;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        return [4 /*yield*/, this
                                .httpClient
                                .get("/", "get", this.getCredentials(), {
                                query: JSON.stringify(query.toArray())
                            }, {})
                                .then(function (response) {
                                HttpRepository.throwTransportableExceptionIfNeeded(response);
                                var result = Result_1.Result.createFromArray(response.getBody());
                                return Result_1.Result.create(result.getQuery(), result.getTotalItems(), result.getTotalHits(), result.getAggregations(), result.getSuggests(), that
                                    .transformer
                                    .fromItems(result.getItems()));
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
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
                            .get("/items", "put", this.getCredentials(), {}, {
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
     * @param immutableConfig
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.createIndex = function (immutableConfig) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/index", "post", this.getCredentials(), {}, {
                            config: immutableConfig.toArray()
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
     * Delete index
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.deleteIndex = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/index", "delete", this.getCredentials(), {}, {})
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
     * @return {Promise<void>}
     */
    HttpRepository.prototype.resetIndex = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/index/reset", "post", this.getCredentials(), {}, {})
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
     * @return {Promise<boolean>}
     */
    HttpRepository.prototype.checkIndex = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/index", "head", this.getCredentials(), {}, {})
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
     * Configure index
     *
     * @param config
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.configureIndex = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/index/config", "post", this.getCredentials(), {}, {
                            config: config.toArray()
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
     * Get query values
     *
     * @returns any
     */
    HttpRepository.prototype.getCredentials = function () {
        return {
            app_id: this.appId,
            index: this.indexId,
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
