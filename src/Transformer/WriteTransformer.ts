import {Item} from "../Model/Item";
import {ItemUUID} from "../Model/ItemUUID";
/**
 * Write Transformer
 */
export interface WriteTransformer {

    /**
     * Is an indexable object.
     *
     * @param object
     *
     * @return {boolean}
     */
    isValidObject(object: any): boolean;

    /**
     * Create item by object.
     *
     * @param object
     *
     * @return {Item}
     */
    toItem(object): Item;

    /**
     * Create item UUID by object.
     *
     * @param object
     *
     * @return {ItemUUID}
     */
    toItemUUID(object): ItemUUID;
}
