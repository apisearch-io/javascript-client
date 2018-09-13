"use strict";
exports.__esModule = true;
var Synonym_1 = require("./Synonym");
/**
 * Result class
 */
var Config = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param language
     * @param storeSearchableMetadata
     */
    function Config(language, storeSearchableMetadata) {
        if (language === void 0) { language = null; }
        if (storeSearchableMetadata === void 0) { storeSearchableMetadata = true; }
        this.synonyms = [];
        this.language = language;
        this.storeSearchableMetadata = storeSearchableMetadata;
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
     * to array
     */
    Config.prototype.toArray = function () {
        return {
            language: this.language,
            store_searchable_metadata: this.storeSearchableMetadata,
            synonyms: this.synonyms.map(function (synonym) { return synonym.toArray(); })
        };
    };
    /**
     * Create from array
     */
    Config.createFromArray = function (array) {
        var immutableConfig = new Config(array.language ? array.language : null, typeof array.store_searchable_metadata == "boolean"
            ? array.store_searchable_metadata
            : true);
        if (array.synonyms instanceof Array &&
            array.synonyms.length > 0) {
            immutableConfig.synonyms = array.synonyms.map(function (synonym) { return Synonym_1.Synonym.createFromArray(synonym); });
        }
        return immutableConfig;
    };
    return Config;
}());
exports.Config = Config;
