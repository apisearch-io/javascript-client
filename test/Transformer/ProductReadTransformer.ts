import {ReadTransformer} from "../../src/Transformer/ReadTransformer";
import {Product} from "./Product";
import {Item} from "../../src/Model/Item";

/**
 * Product ReadTransformer
 */
export class ProductReadTransformer implements ReadTransformer {

    /**
     * The item should be converted by this transformer.
     *
     * @param item
     *
     * @return  {boolean}
     */
    isValidItem(item:Item): boolean {
        return item.getType() === 'product';
    }

    /**
     * Create object by item.
     *
     * @param item
     *
     * @return {any}
     */
    fromItem(item:Item) : any {
        return new Product(
            item.getId(),
            item.get('sku'),
            item.get('name')
        );
    }
}