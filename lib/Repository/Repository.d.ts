import { Config } from "../Config/Config";
import { Changes } from "../Model/Changes";
import { Item } from "../Model/Item";
import { ItemUUID } from "../Model/ItemUUID";
import { Query } from "../Query/Query";
import { Result } from "../Result/Result";
import { IndexUUID } from "../Model/IndexUUID";
import { Index } from "../Model/Index";
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
     * @return {Promise<any[]>}
     */
    flush(bulkNumber?: number, skipIfLess?: boolean): Promise<any[]>;
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
     * @param indexUUID
     * @param config
     *
     * @return {Promise<void>}
     */
    abstract createIndex(indexUUID: IndexUUID, config: Config): Promise<void>;
    /**
     * Delete index
     *
     * @param indexUUID
     *
     * @return {Promise<void>}
     */
    abstract deleteIndex(indexUUID: IndexUUID): Promise<void>;
    /**
     * Reset index
     *
     * @param indexUUID
     *
     * @return {Promise<void>}
     */
    abstract resetIndex(indexUUID: IndexUUID): Promise<void>;
    /**
     * Check index
     *
     * @param indexUUID
     *
     * @return {Promise<boolean>}
     */
    abstract checkIndex(indexUUID: IndexUUID): Promise<boolean>;
    /**
     * Check index
     *
     * @return {Promise<Index[]>}
     */
    abstract getIndices(): Promise<Index[]>;
    /**
     * Configure index
     *
     * @param indexUUID
     * @param config
     *
     * @return {Promise<void>}
     */
    abstract configureIndex(indexUUID: IndexUUID, config: Config): Promise<void>;
    /**
     * @param indexUUID
     * @param itemUUID
     * @param userId
     * @param queryString
     * @param interaction
     * @param site
     * @param device
     * @param position
     */
    abstract pushInteraction(indexUUID: IndexUUID, itemUUID: ItemUUID, userId: string, queryString: string, interaction: string, site: string, device: string, position: number): Promise<void>;
    /**
     * @param {IndexUUID} indexUUID
     * @param {string} userId
     * @param {ItemUUID[]} itemUUIDs
     *
     * @return {Promise<void>}
     */
    abstract purchase(indexUUID: IndexUUID, userId: string, itemUUIDs: ItemUUID[]): Promise<void>;
}
