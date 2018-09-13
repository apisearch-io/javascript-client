import {Config} from "../Config/Config";
import {Changes} from "../Model/Changes";
import {Item} from "../Model/Item";
import {ItemUUID} from "../Model/ItemUUID";
import {Query} from "../Query/Query";
import {Result} from "../Result/Result";
import {IndexUUID} from "../Model/IndexUUID";
import {Index} from "../Model/Index";

/**
 * Aggregation class
 */
export abstract class Repository {

    protected itemsToUpdate: Item[] = [];
    protected itemsToDelete: ItemUUID[] = [];
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
    constructor(
        appId: string,
        indexId: string,
        token: string,
    ) {
        this.appId = appId;
        this.indexId = indexId;
        this.token = token;
    }

    /**
     * Reset cached elements
     */
    private resetCachedElements() {
        this.itemsToUpdate = [];
        this.itemsToDelete = [];
    }

    /**
     * Add element
     *
     * @param item
     */
    public addItem(item: Item) {
        this.itemsToUpdate.push(item);
    }

    /**
     * Add elements
     *
     * @param items
     */
    public addItems(items: Item[]) {
        for (const i in items) {
            this.addItem(items[i]);
        }
    }

    /**
     * Delete item
     *
     * @param itemUUID
     */
    public deleteItem(itemUUID: ItemUUID) {
        this.itemsToDelete.push(itemUUID);
    }

    /**
     * Delete items
     *
     * @param itemsUUID
     */
    public deleteItems(itemsUUID: ItemUUID[]) {
        for (const i in itemsUUID) {
            this.deleteItem(itemsUUID[i]);
        }
    }

    /**
     * flush
     *
     * @param bulkNumber
     * @param skipIfLess
     *
     * @return {Promise<void>}
     */
    public async flush(
        bulkNumber?: number,
        skipIfLess?: boolean,
    ): Promise<void> {

        if (!bulkNumber) {
            bulkNumber = 500;
        }

        if (!skipIfLess) {
            skipIfLess = false;
        }

        if (
            skipIfLess &&
            this.itemsToUpdate.length < bulkNumber
        ) {
            return;
        }

        return Promise.all(Repository
            .chunkArray(
                this.itemsToUpdate,
                bulkNumber,
            )
            .map((arrayOfItems) => {
                return this.flushUpdateItems(arrayOfItems);
            })
            .concat(Repository
                .chunkArray(
                    this.itemsToDelete,
                    bulkNumber,
                )
                .map((arrayOfItemsUUID) => {
                    return this.flushDeleteItems(arrayOfItemsUUID);
                }),
            ),
        ).then((_) => {
            this.resetCachedElements();
        }).catch((_) => {
            this.resetCachedElements();
        });
    }

    /**
     * Make chunks of n elements
     *
     * @param array
     * @param chunk
     *
     * @return any[]
     */
    public static chunkArray(
        array: any[],
        chunk: number,
    ) {
        const arrayChunked: any[] = [];
        for (let i: number = 0, j: number = array.length; i < j; i += chunk) {
            arrayChunked.push(array.slice(i, i + chunk));
        }

        return arrayChunked;
    }

    /**
     * Flush update items
     *
     * @param itemsToUpdate
     *
     * @return {Promise<void>}
     */
    public abstract async flushUpdateItems(itemsToUpdate: Item[]): Promise<void>;

    /**
     * Flush delete items
     *
     * @param itemsToDelete
     *
     * @return {Promise<void>}
     */
    public abstract async flushDeleteItems(itemsToDelete: ItemUUID[]): Promise<void>;

    /**
     * Query
     *
     * @param query
     *
     * @return {Promise<Result>}
     */
    public abstract async query(query: Query): Promise<Result>;

    /**
     * Update items
     *
     * @param query
     * @param changes
     *
     * @return {Promise<void>}
     */
    public abstract async updateItems(
        query: Query,
        changes: Changes,
    ): Promise<void>;

    /**
     * Create index
     *
     * @param indexUUID
     * @param config
     *
     * @return {Promise<void>}
     */
    public abstract async createIndex(
        indexUUID: IndexUUID,
        config: Config
    ): Promise<void>;

    /**
     * Delete index
     *
     * @param indexUUID
     *
     * @return {Promise<void>}
     */
    public abstract async deleteIndex(indexUUID: IndexUUID): Promise<void>;

    /**
     * Reset index
     *
     * @param indexUUID
     *
     * @return {Promise<void>}
     */
    public abstract async resetIndex(indexUUID: IndexUUID): Promise<void>;

    /**
     * Check index
     *
     * @param indexUUID
     *
     * @return {Promise<boolean>}
     */
    public abstract async checkIndex(indexUUID: IndexUUID): Promise<boolean>;

    /**
     * Check index
     *
     * @return {Promise<Index[]>}
     */
    public abstract async getIndices(): Promise<Index[]>;

    /**
     * Configure index
     *
     * @param indexUUID
     * @param config
     *
     * @return {Promise<void>}
     */
    public abstract async configureIndex(
        indexUUID: IndexUUID,
        config: Config
    ): Promise<void>;
}
