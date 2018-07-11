import { Config } from "../Config/Config";
import { ImmutableConfig } from "../Config/ImmutableConfig";
import { HttpClient } from "../Http/HttpClient";
import { Response } from "../Http/Response";
import { Changes } from "../Model/Changes";
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
     */
    addObject(object: any): void;
    /**
     * Delete item document by uuid.
     *
     * @param object
     */
    deleteObject(object: any): void;
    /**
     * flush items
     *
     * @param itemsToUpdate
     * @param itemsToDelete
     *
     * @Returns {Promise<void>}
     */
    flushItems(itemsToUpdate: Item[], itemsToDelete: ItemUUID[]): Promise<void>;
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
     * @param immutableConfig
     *
     * @return {Promise<void>}
     */
    createIndex(immutableConfig: ImmutableConfig): Promise<void>;
    /**
     * Delete index
     *
     * @return {Promise<void>}
     */
    deleteIndex(): Promise<void>;
    /**
     * Reset index
     *
     * @return {Promise<void>}
     */
    resetIndex(): Promise<void>;
    /**
     * Check index
     *
     * @return {Promise<boolean>}
     */
    checkIndex(): Promise<boolean>;
    /**
     * Configure index
     *
     * @param config
     *
     * @return {Promise<void>}
     */
    configureIndex(config: Config): Promise<void>;
    /**
     * Get query values
     *
     * @returns any
     */
    private getCredentials();
    /**
     * throw error if needed
     *
     * @param response
     */
    static throwTransportableExceptionIfNeeded(response: Response): void;
}
