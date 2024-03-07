import { Config } from "../Config/Config";
import { HttpClient } from "../Http/HttpClient";
import { Changes } from "../Model/Changes";
import { Index } from "../Model/Index";
import { IndexUUID } from "../Model/IndexUUID";
import { Item } from "../Model/Item";
import { ItemUUID } from "../Model/ItemUUID";
import { Query } from "../Query/Query";
import { Result } from "../Result/Result";
import { Transformer } from "../Transformer/Transformer";
import { Repository } from "./Repository";
/**
 * Aggregation class
 */
export declare class HttpRepository extends Repository {
    private httpClient;
    private transformer;
    /**
     * Constructor
     *
     * @param httpClient
     * @param appId
     * @param indexId
     * @param token
     * @param transformer
     */
    constructor(httpClient: HttpClient, appId: string, indexId: string, token: string, transformer: Transformer);
    /**
     * Get transformer
     *
     * @return {Transformer}
     */
    getTransformer(): Transformer;
    /**
     * Generate item document by a simple object.
     *
     * @param object
     *
     * @returns {void}
     */
    addObject(object: any): void;
    /**
     * Delete item document by uuid.
     *
     * @param object
     *
     * @returns {void}
     */
    deleteObject(object: any): void;
    /**
     * Flush update items
     *
     * @param {Item[]} itemsToUpdate
     *
     * @return {Promise<void>}
     */
    flushUpdateItems(itemsToUpdate: Item[]): Promise<void>;
    /**
     * Flush delete items
     *
     * @param {ItemUUID[]} itemsToDelete
     *
     * @return {Promise<void>}
     */
    flushDeleteItems(itemsToDelete: ItemUUID[]): Promise<void>;
    /**
     * Query
     *
     * @param {Query} query
     *
     * @return {Promise<Result>}
     */
    query(query: Query): Promise<Result>;
    /**
     * Get similar items
     *
     * @param {Query} query
     * @param {ItemUUID[]} itemUUIDs
     * @param {number} similarity
     *
     * @return {Promise<Result>}
     */
    getSimilarItems(query: Query, itemUUIDs: ItemUUID[], similarity: number): Promise<Result>;
    /**
     * Get recommended items
     *
     * @param {Query} query
     *
     * @return {Promise<Result>}
     */
    getRecommendedItems(query: Query): Promise<Result>;
    /**
     * Update items
     *
     * @param {Query} query
     * @param {Changes} changes
     *
     * @return {Promise<void>}
     */
    updateItems(query: Query, changes: Changes): Promise<void>;
    /**
     * Create index
     *
     * @param {IndexUUID} indexUUID
     * @param {Config} config
     *
     * @return {Promise<void>}
     */
    createIndex(indexUUID: IndexUUID, config: Config): Promise<void>;
    /**
     * Delete index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<void>}
     */
    deleteIndex(indexUUID: IndexUUID): Promise<void>;
    /**
     * Reset index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<void>}
     */
    resetIndex(indexUUID: IndexUUID): Promise<void>;
    /**
     * Check index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<boolean>}
     */
    checkIndex(indexUUID: IndexUUID): Promise<boolean>;
    /**
     * Check index
     *
     * @return {Promise<Index[]>}
     */
    getIndices(): Promise<Index[]>;
    /**
     * Configure index
     *
     * @param {IndexUUID} indexUUID
     * @param {Config} config
     *
     * @return {Promise<void>}
     */
    configureIndex(indexUUID: IndexUUID, config: Config): Promise<void>;
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
    pushInteraction(indexUUID: IndexUUID, itemUUID: ItemUUID, userId: string, queryString: string, interaction: string, site?: string, device?: string, position?: number): Promise<void>;
    /**
     * @param {IndexUUID} indexUUID
     * @param {string} userId
     * @param {ItemUUID[]} itemUUIDs
     * @param {string} site
     * @param {string} device
     *
     * @return {Promise<void>}
     */
    purchase(indexUUID: IndexUUID, userId: string, itemUUIDs: ItemUUID[], site?: string, device?: string): Promise<void>;
    /**
     *
     */
    getHttpClient(): HttpClient;
    /**
     * Get query values
     *
     * @returns any
     */
    private getCredentials;
    /**
     * Apply transformers to results
     *
     * @param {Result} result
     *
     * @return {Result}
     */
    private applyTransformersToResult;
    /**
     * @param response
     * @private
     */
    private static createErrorFromResponse;
}
