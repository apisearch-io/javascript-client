import {Item} from "../Model/Item";
import {ItemUUID} from "../Model/ItemUUID";
import {ReadTransformer} from "./ReadTransformer";
import {WriteTransformer} from "./WriteTransformer";
/**
 * Transformer
 */
export class Transformer {

    private readTransformers: ReadTransformer[] = [];
    private writeTransformers: WriteTransformer[] = [];

    /**
     * Add read transformer
     *
     * @param readTransformer
     */
    public addReadTransformer(readTransformer: ReadTransformer) {
        this
            .readTransformers
            .push(readTransformer);
    }

    /**
     * @return {boolean}
     */
    public hasReadTransformers(): boolean {
        return this.readTransformers.length > 0;
    }

    /**
     * Add write transformer
     *
     * @param writeTransformer
     */
    public addWriteTransformer(writeTransformer: WriteTransformer) {
        this
            .writeTransformers
            .push(writeTransformer);
    }

    /**
     * Items to objects
     *
     * @param items
     *
     * @returns {any[]}
     */
    public fromItems(items: Item[]): any[] {
        const objects: any[] = [];
        for (const i in items) {
            objects.push(this.fromItem(items[i]));
        }

        return objects;
    }

    /**
     * Item to object
     *
     * @param item
     *
     * @returns {any}
     */
    public fromItem(item: Item): any {
        for (const i in this.readTransformers) {
            const transformer = this.readTransformers[i];
            if (transformer.isValidItem(item)) {
                return transformer.fromItem(item);
            }
        }

        return item;
    }

    /**
     * Objects to items
     *
     * @param objects
     *
     * @returns {Item[]}
     */
    public toItems(objects: any[]): Item[] {
        const items: any[] = [];
        for (const i in objects) {
            const item = this.toItem(objects[i]);
            if (item instanceof Item) {
                items.push(item);
            }
        }

        return items;
    }

    /**
     * Object to item
     *
     * @param object
     *
     * @returns {any}
     */
    public toItem(object: any): any {
        for (const i in this.writeTransformers) {
            const transformer = this.writeTransformers[i];
            if (transformer.isValidObject(object)) {
                return transformer.toItem(object);
            }
        }

        return object;
    }

    /**
     * Objects to items
     *
     * @param objects
     *
     * @returns {ItemUUID[]}
     */
    public toItemUUIDs(objects: any[]): ItemUUID[] {
        const itemUUIDs: any[] = [];
        for (const i in objects) {
            const itemUUID = this.toItemUUID(objects[i]);
            if (itemUUID instanceof ItemUUID) {
                itemUUIDs.push(itemUUID);
            }
        }

        return itemUUIDs;
    }

    /**
     * Object to item
     *
     * @param object
     *
     * @returns {any}
     */
    public toItemUUID(object: any): any {
        for (const i in this.writeTransformers) {
            const transformer = this.writeTransformers[i];
            if (transformer.isValidObject(object)) {
                return transformer.toItemUUID(object);
            }
        }

        return object;
    }
}
