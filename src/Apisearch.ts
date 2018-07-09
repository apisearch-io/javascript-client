import {KeyValueCache} from "./Cache/KeyValueCache";
import NoCache from "./Cache/NoCache";
import AxiosClient from "./Http/AxiosClient";
import RetryMap from "./Http/RetryMap";
import Coordinate from "./Model/Coordinate";
import ItemUUID from "./Model/ItemUUID";
import Query from "./Query/Query";
import {QUERY_DEFAULT_PAGE} from "./Query/Query";
import {QUERY_DEFAULT_SIZE} from "./Query/Query";
import SortBy from "./Query/SortBy";
import HttpRepository from "./Repository/HttpRepository";
import Repository from "./Repository/Repository";
import Aggregations from "./Result/Aggregations";
import Result from "./Result/Result";
import Transformer from "./Transformer/Transformer";

/**
 * Apisearch class
 */
export default class Apisearch {

    /**
     * Constructor
     *
     * @param config
     *
     * @returns {Repository}
     */
    public static createRepository(
        config: {
            app_id: string,
            index_id: string,
            token: string,
            options: {
                endpoint?: string,
                api_version?: string,
                timeout?: number,
                override_queries?: boolean,
                cache?: KeyValueCache,
            },
        },
    ): Repository {
        config.options = {
            api_version: "v1",
            cache: new NoCache(),
            timeout: 10000,
            override_queries: true,
            ...config.options,
        };

        /**
         * Client
         */
        const httpClient = new AxiosClient(
            config.options.endpoint,
            config.options.api_version,
            config.options.timeout,
            new RetryMap(),
            config.options.override_queries,
            config.options.cache,
        );

        return new HttpRepository(
            httpClient,
            config.app_id,
            config.index_id,
            config.token,
            new Transformer(),
        );
    }

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
    public static createQueryLocated(coordinate: Coordinate,
                                     queryText: string,
                                     page: number = QUERY_DEFAULT_PAGE,
                                     size: number = QUERY_DEFAULT_SIZE): Query {
        return Query.createLocated(
            coordinate,
            queryText,
            page,
            size,
        );
    }

    /**
     * Create
     *
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    public static createQuery(queryText: string,
                              page: number = QUERY_DEFAULT_PAGE,
                              size: number = QUERY_DEFAULT_SIZE): Query {
        return Query.create(
            queryText,
            page,
            size,
        );
    }

    /**
     * Create match all
     *
     * @return {Query}
     */
    public static createQueryMatchAll(): Query {
        return Query.createMatchAll();
    }

    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    public static createQueryByUUID(uuid: ItemUUID): Query {
        return Query.createByUUID(uuid);
    }

    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    public static createQueryByUUIDs(...uuids: ItemUUID[]): Query {
        return Query.createByUUIDs(...uuids);
    }

    /**
     * Create empty result
     *
     * @return {Result}
     */
    public static createEmptyResult(): Result {
        return Result.create(
            Apisearch.createQueryMatchAll(),
            0,
            0,
            new Aggregations(0),
            [],
            [],
        );
    }

    /**
     * Create empty sortby
     *
     * @return {SortBy}
     */
    public static createEmptySortBy(): SortBy {
        return SortBy.create();
    }
}
