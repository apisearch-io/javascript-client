import {AxiosClient} from "./Http/AxiosClient";
import {HttpClient} from "./Http/HttpClient";
import {Coordinate} from "./Model/Coordinate";
import {ItemUUID} from "./Model/ItemUUID";
import {QUERY_DEFAULT_PAGE} from "./Query/Query";
import {QUERY_DEFAULT_SIZE} from "./Query/Query";
import {Query} from "./Query/Query";
import {SortBy} from "./Query/SortBy";
import {HttpRepository} from "./Repository/HttpRepository";
import {Result} from "./Result/Result";
import {ResultAggregations} from "./Result/ResultAggregations";
import {Transformer} from "./Transformer/Transformer";
import {CacheClient} from "./Http/CacheClient";

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
    public static createRepository(config: {
        app_id: string,
        index_id: string,
        token: string,
        options: {
            endpoint: string,
            api_version?: string,
            timeout?: number,
            override_queries?: boolean,
            http_client?: HttpClient,
            use_cache?: boolean,
        },
    }): HttpRepository {

        Apisearch.ensureRepositoryConfigIsValid(config);

        config.options = {
            api_version: "v1",
            override_queries: true,
            timeout: 3000,
            ...config.options,
        };

        /**
         * Client
         */
        let httpClient = typeof config.options.http_client !== "undefined"
            ? config.options.http_client
            : new AxiosClient(
                config.options.endpoint,
                config.options.api_version,
                config.options.timeout,
                config.options.override_queries,
            );

        if (config.options.use_cache) {
            httpClient = new CacheClient(httpClient);
        }

        return new HttpRepository(
            httpClient,
            config.app_id,
            config.index_id,
            config.token,
            new Transformer(),
        );
    }

    /**
     * Ensure the Repository configuration is valid
     *
     * @param config
     */
    public static ensureRepositoryConfigIsValid(config: any) {
        Apisearch.ensureIsDefined(config.app_id, "app_id");
        Apisearch.ensureIsDefined(config.index_id, "index_id");
        Apisearch.ensureIsDefined(config.token, "token");
        Apisearch.ensureIsDefined(config.options.endpoint, "options.endpoint");
    }

    /**
     * Ensure the value is not undefined
     *
     * @param param
     * @param name
     */
    public static ensureIsDefined(
        param: any,
        name: string,
    ) {
        if (typeof param === "undefined") {
            throw new TypeError(`${name} parameter must be defined.`);
        }
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
            "",
            0,
            0,
            new ResultAggregations(0),
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

    /**
     * Create empty sortby
     *
     * @return {SortBy}
     */
    public static createEmptyScoreStrategy(): SortBy {
        return SortBy.create();
    }
}
