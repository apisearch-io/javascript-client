import {WriteTransformer} from "../../src/Transformer/WriteTransformer";
import {Product} from "./Product";
import {Item} from "../../src/Model/Item";
import {ItemUUID} from "../../src/Model/ItemUUID";

/**
 * Product ReadTransformer
 */
export class ProductWriteTransformer implements WriteTransformer {

    /**
     * Is an indexable object.
     *
     * @param object
     *
     * @return {boolean}
     */
    isValidObject(object:any): boolean {
        return object instanceof Product;
    }

    /**
     * Create item by object.
     *
     * @param object
     *
     * @return {Item}
     */
    toItem(object): Item {
        return Item.create(
            this.toItemUUID(object),
            {
                'name': object.name
            },
            {
                'sku': object.sku
            }
        );
    }

    /**
     * Create item UUID by object.
     *
     * @param object
     *
     * @return {ItemUUID}
     */
    toItemUUID(object): ItemUUID {
        return ItemUUID.createFromArray({
            id: object.id,
            type: 'product'
        })
    }
}