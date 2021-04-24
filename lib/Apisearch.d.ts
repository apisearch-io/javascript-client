import { HttpClient } from "./Http/HttpClient";
import { Coordinate } from "./Model/Coordinate";
import { ItemUUID } from "./Model/ItemUUID";
import { Query } from "./Query/Query";
import { SortBy } from "./Query/SortBy";
import { HttpRepository } from "./Repository/HttpRepository";
import { Result } from "./Result/Result";
/**
 * Apisearch class
 */
export default class Apisearch {
    /**
     * Constructor
     *
     * @param config
     *
     * @return {HttpRepository}
     */
    static createRepository(config: {
        app_id: string;
        index_id: string;
        token: string;
        options: {
            endpoint: string;
            api_version?: string;
            timeout?: number;
            override_queries?: boolean;
            http_client?: HttpClient;
            use_cache?: boolean;
        };
    }): HttpRepository;
    /**
     * Ensure the Repository configuration is valid
     *
     * @param config
     */
    static ensureRepositoryConfigIsValid(config: any): void;
    /**
     * Ensure the value is not undefined
     *
     * @param param
     * @param name
     */
    static ensureIsDefined(param: any, name: string): void;
    /**
     * Created located
     *
     * @param coordinate
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    static createQueryLocated(coordinate: Coordinate, queryText: string, page?: number, size?: number): Query;
    /**
     * Create
     *
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    static createQuery(queryText: string, page?: number, size?: number): Query;
    /**
     * Create match all
     *
     * @return {Query}
     */
    static createQueryMatchAll(): Query;
    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    static createQueryByUUID(uuid: ItemUUID): Query;
    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    static createQueryByUUIDs(...uuids: ItemUUID[]): Query;
    /**
     * Create empty result
     *
     * @return {Result}
     */
    static createEmptyResult(): Result;
    /**
     * Create empty sortby
     *
     * @return {SortBy}
     */
    static createEmptySortBy(): SortBy;
    /**
     * Create empty sortby
     *
     * @return {SortBy}
     */
    static createEmptyScoreStrategy(): SortBy;
}
