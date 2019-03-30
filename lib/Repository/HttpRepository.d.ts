import { Config } from "../Config/Config";
import { HttpClient } from "../Http/HttpClient";
import { Response } from "../Http/Response";
import { Changes } from "../Model/Changes";
import { Item } from "../Model/Item";
import { ItemUUID } from "../Model/ItemUUID";
import { Query } from "../Query/Query";
import { Result } from "../Result/Result";
import { Transformer } from "../Transformer/Transformer";
import { Repository } from "./Repository";
import { IndexUUID } from "../Model/IndexUUID";
import { Index } from "../Model/Index";
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
     */
    addObject(object: any): void;
    /**
     * Delete item document by uuid.
     *
     * @param object
     */
    deleteObject(object: any): void;
    /**
     * Flush update items
     *
     * @param itemsToUpdate
     *
     * @return {Promise<void>}
     */
    flushUpdateItems(itemsToUpdate: Item[]): Promise<void>;
    /**
     * Flush delete items
     *
     * @param itemsToDelete
     *
     * @return {Promise<void>}
     */
    flushDeleteItems(itemsToDelete: ItemUUID[]): Promise<void>;
    /**
     * Query
     *
     * @param query
     *
     * @return {Promise<Result>}
     */
    query(query: Query): Promise<Result>;
    /**
     * Apply transformers to results
     *
     * @param result
     *
     * @return {Result}
     */
    private applyTransformersToResult;
    /**
     * Update items
     *
     * @param query
     * @param changes
     *
     * @return {Promise<void>}
     */
    updateItems(query: Query, changes: Changes): Promise<void>;
    /**
     * Create index
     *
     * @param indexUUID
     * @param config
     *
     * @return {Promise<void>}
     */
    createIndex(indexUUID: IndexUUID, config: Config): Promise<void>;
    /**
     * Delete index
     *
     * @param indexUUID
     *
     * @return {Promise<void>}
     */
    deleteIndex(indexUUID: IndexUUID): Promise<void>;
    /**
     * Reset index
     *
     * @param indexUUID
     *
     * @return {Promise<void>}
     */
    resetIndex(indexUUID: IndexUUID): Promise<void>;
    /**
     * Check index
     *
     * @param indexUUID
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
     * @param indexUUID
     * @param config
     *
     * @return {Promise<void>}
     */
    configureIndex(indexUUID: IndexUUID, config: Config): Promise<void>;
    /**
     * Get query values
     *
     * @returns any
     */
    private getCredentials;
    /**
     * Get query values
     *
     * @param indexComposedUUID
     *
     * @returns any
     */
    private getCredentialsWithIndex;
    /**
     * throw error if needed
     *
     * @param response
     */
    static throwTransportableExceptionIfNeeded(response: Response): void;
}
