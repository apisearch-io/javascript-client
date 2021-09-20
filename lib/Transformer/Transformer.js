"use strict";
exports.__esModule = true;
exports.Transformer = void 0;
var Item_1 = require("../Model/Item");
var ItemUUID_1 = require("../Model/ItemUUID");
/**
 * Transformer
 */
var Transformer = /** @class */ (function () {
    function Transformer() {
        this.readTransformers = [];
        this.writeTransformers = [];
    }
    /**
     * Add read transformer
     *
     * @param readTransformer
     */
    Transformer.prototype.addReadTransformer = function (readTransformer) {
        this
            .readTransformers
            .push(readTransformer);
    };
    /**
     * @return {boolean}
     */
    Transformer.prototype.hasReadTransformers = function () {
        return this.readTransformers.length > 0;
    };
    /**
     * Add write transformer
     *
     * @param writeTransformer
     */
    Transformer.prototype.addWriteTransformer = function (writeTransformer) {
        this
            .writeTransformers
            .push(writeTransformer);
    };
    /**
     * Items to objects
     *
     * @param items
     *
     * @returns {any[]}
     */
    Transformer.prototype.fromItems = function (items) {
        var objects = [];
        for (var i in items) {
            objects.push(this.fromItem(items[i]));
        }
        return objects;
    };
    /**
     * Item to object
     *
     * @param item
     *
     * @returns {any}
     */
    Transformer.prototype.fromItem = function (item) {
        for (var i in this.readTransformers) {
            var transformer = this.readTransformers[i];
            if (transformer.isValidItem(item)) {
                return transformer.fromItem(item);
            }
        }
        return item;
    };
    /**
     * Objects to items
     *
     * @param objects
     *
     * @returns {Item[]}
     */
    Transformer.prototype.toItems = function (objects) {
        var items = [];
        for (var i in objects) {
            var item = this.toItem(objects[i]);
            if (item instanceof Item_1.Item) {
                items.push(item);
            }
        }
        return items;
    };
    /**
     * Object to item
     *
     * @param object
     *
     * @returns {any}
     */
    Transformer.prototype.toItem = function (object) {
        for (var i in this.writeTransformers) {
            var transformer = this.writeTransformers[i];
            if (transformer.isValidObject(object)) {
                return transformer.toItem(object);
            }
        }
        return object;
    };
    /**
     * Objects to items
     *
     * @param objects
     *
     * @returns {ItemUUID[]}
     */
    Transformer.prototype.toItemUUIDs = function (objects) {
        var itemUUIDs = [];
        for (var i in objects) {
            var itemUUID = this.toItemUUID(objects[i]);
            if (itemUUID instanceof ItemUUID_1.ItemUUID) {
                itemUUIDs.push(itemUUID);
            }
        }
        return itemUUIDs;
    };
    /**
     * Object to item
     *
     * @param object
     *
     * @returns {any}
     */
    Transformer.prototype.toItemUUID = function (object) {
        for (var i in this.writeTransformers) {
            var transformer = this.writeTransformers[i];
            if (transformer.isValidObject(object)) {
                return transformer.toItemUUID(object);
            }
        }
        return object;
    };
    return Transformer;
}());
exports.Transformer = Transformer;
