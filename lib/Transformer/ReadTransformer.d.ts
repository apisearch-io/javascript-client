import { Item } from "../Model/Item";
/**
 * Read Transformer
 */
export interface ReadTransformer {
    /**
     * The item should be converted by this transformer.
     *
     * @param item
     *
     * @return  {boolean}
     */
    isValidItem(item: Item): boolean;
    /**
     * Create object by item.
     *
     * @param item
     *
     * @return {any}
     */
    fromItem(item: Item): any;
}
