"use strict";
exports.__esModule = true;
exports.Config = exports.DEFAULT_REPLICAS = exports.DEFAULT_SHARDS = void 0;
var Synonym_1 = require("./Synonym");
exports.DEFAULT_SHARDS = 1;
exports.DEFAULT_REPLICAS = 0;
/**
 * Result class
 */
var Config = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param language
     * @param storeSearchableMetadata
     * @param shards
     * @param replicas
     */
    function Config(language, storeSearchableMetadata, shards, replicas) {
        if (language === void 0) { language = null; }
        if (storeSearchableMetadata === void 0) { storeSearchableMetadata = true; }
        if (shards === void 0) { shards = exports.DEFAULT_SHARDS; }
        if (replicas === void 0) { replicas = exports.DEFAULT_REPLICAS; }
        this.synonyms = [];
        this.language = language;
        this.storeSearchableMetadata = storeSearchableMetadata;
        this.shards = shards;
        this.replicas = replicas;
    }
    /**
     * Get language
     *
     * @return {string}
     */
    Config.prototype.getLanguage = function () {
        return this.language;
    };
    /**
     * Should searchable metadata be stored
     *
     * @return {boolean}
     */
    Config.prototype.shouldSearchableMetadataBeStored = function () {
        return this.storeSearchableMetadata;
    };
    /**
     * Add synonym
     *
     * @param synonym
     */
    Config.prototype.addSynonym = function (synonym) {
        this.synonyms.push(synonym);
    };
    /**
     * Get synonyms
     *
     * @return {Synonym[]}
     */
    Config.prototype.getSynonyms = function () {
        return this.synonyms;
    };
    /**
     * Get shards
     *
     * @return {number}
     */
    Config.prototype.getShards = function () {
        return this.shards;
    };
    /**
     * Get replicas
     *
     * @return {number}
     */
    Config.prototype.getReplicas = function () {
        return this.replicas;
    };
    /**
     * to array
     */
    Config.prototype.toArray = function () {
        return {
            language: this.language,
            store_searchable_metadata: this.storeSearchableMetadata,
            synonyms: this.synonyms.map(function (synonym) { return synonym.toArray(); }),
            shards: this.shards,
            replicas: this.replicas
        };
    };
    /**
     * Create from array
     */
    Config.createFromArray = function (array) {
        var config = new Config(array.language ? array.language : null, typeof array.store_searchable_metadata == "boolean"
            ? array.store_searchable_metadata
            : true);
        if (array.synonyms instanceof Array &&
            array.synonyms.length > 0) {
            config.synonyms = array.synonyms.map(function (synonym) { return Synonym_1.Synonym.createFromArray(synonym); });
        }
        config.shards = typeof array.shards == "number"
            ? array.shards
            : exports.DEFAULT_SHARDS;
        config.replicas = typeof array.replicas == "number"
            ? array.replicas
            : exports.DEFAULT_REPLICAS;
        return config;
    };
    return Config;
}());
exports.Config = Config;
