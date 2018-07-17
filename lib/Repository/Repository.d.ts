import { Config } from "../Config/Config";
import { ImmutableConfig } from "../Config/ImmutableConfig";
import { Changes } from "../Model/Changes";
import { Item } from "../Model/Item";
import { ItemUUID } from "../Model/ItemUUID";
import { Query } from "../Query/Query";
import { Result } from "../Result/Result";
/**
 * Aggregation class
 */
export declare abstract class Repository {
    protected itemsToUpdate: Item[];
    protected itemsToDelete: ItemUUID[];
    protected appId: string;
    protected indexId: string;
    protected token: string;
    /**
     * Constructor
     *
     * @param appId
     * @param indexId
     * @param token
     */
    constructor(appId: string, indexId: string, token: string);
    /**
     * Reset cached elements
     */
    private resetCachedElements;
    /**
     * Add element
     *
     * @param item
     */
    addItem(item: Item): void;
    /**
     * Add elements
     *
     * @param items
     */
    addItems(items: Item[]): void;
    /**
     * Delete item
     *
     * @param itemUUID
     */
    deleteItem(itemUUID: ItemUUID): void;
    /**
     * Delete items
     *
     * @param itemsUUID
     */
    deleteItems(itemsUUID: ItemUUID[]): void;
    /**
     * flush
     *
     * @param bulkNumber
     * @param skipIfLess
     *
     * @return {Promise<void>}
     */
    flush(bulkNumber?: number, skipIfLess?: boolean): Promise<void>;
    /**
     * Make chunks of n elements
     *
     * @param array
     * @param chunk
     *
     * @return any[]
     */
    static chunkArray(array: any[], chunk: number): any[];
    /**
     * Flush update items
     *
     * @param itemsToUpdate
     *
     * @return {Promise<void>}
     */
    abstract flushUpdateItems(itemsToUpdate: Item[]): Promise<void>;
    /**
     * Flush delete items
     *
     * @param itemsToDelete
     *
     * @return {Promise<void>}
     */
    abstract flushDeleteItems(itemsToDelete: ItemUUID[]): Promise<void>;
    /**
     * Query
     *
     * @param query
     *
     * @return {Promise<Result>}
     */
    abstract query(query: Query): Promise<Result>;
    /**
     * Update items
     *
     * @param query
     * @param changes
     *
     * @return {Promise<void>}
     */
    abstract updateItems(query: Query, changes: Changes): Promise<void>;
    /**
     * Create index
     *
     * @param immutableConfig
     *
     * @return {Promise<void>}
     */
    abstract createIndex(immutableConfig: ImmutableConfig): Promise<void>;
    /**
     * Delete index
     *
     * @return {Promise<void>}
     */
    abstract deleteIndex(): Promise<void>;
    /**
     * Reset index
     *
     * @return {Promise<void>}
     */
    abstract resetIndex(): Promise<void>;
    /**
     * Check index
     *
     * @return {Promise<boolean>}
     */
    abstract checkIndex(): Promise<boolean>;
    /**
     * Configure index
     *
     * @param config
     *
     * @return {Promise<void>}
     */
    abstract configureIndex(config: Config): Promise<void>;
}
