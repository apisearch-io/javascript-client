import { Item } from "../Model/Item";
import { ItemUUID } from "../Model/ItemUUID";
import { ReadTransformer } from "./ReadTransformer";
import { WriteTransformer } from "./WriteTransformer";
/**
 * Transformer
 */
export declare class Transformer {
    private readTransformers;
    private writeTransformers;
    /**
     * Add read transformer
     *
     * @param readTransformer
     */
    addReadTransformer(readTransformer: ReadTransformer): void;
    /**
     * @return {boolean}
     */
    hasReadTransformers(): boolean;
    /**
     * Add write transformer
     *
     * @param writeTransformer
     */
    addWriteTransformer(writeTransformer: WriteTransformer): void;
    /**
     * Items to objects
     *
     * @param items
     *
     * @returns {any[]}
     */
    fromItems(items: Item[]): any[];
    /**
     * Item to object
     *
     * @param item
     *
     * @returns {any}
     */
    fromItem(item: Item): any;
    /**
     * Objects to items
     *
     * @param objects
     *
     * @returns {Item[]}
     */
    toItems(objects: any[]): Item[];
    /**
     * Object to item
     *
     * @param object
     *
     * @returns {any}
     */
    toItem(object: any): any;
    /**
     * Objects to items
     *
     * @param objects
     *
     * @returns {ItemUUID[]}
     */
    toItemUUIDs(objects: any[]): ItemUUID[];
    /**
     * Object to item
     *
     * @param object
     *
     * @returns {any}
     */
    toItemUUID(object: any): any;
}
