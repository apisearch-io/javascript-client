import AxiosClient from "./Http/AxiosClient";
import {KeyValueCache} from "./Cache/KeyValueCache";
import RetryMap from "./Http/RetryMap";
import HttpRepository from "./Repository/HttpRepository";
import NoCache from "./Cache/NoCache";
import Repository from "./Repository/Repository";
import Query from "./Query/Query";
import ItemUUID from "./Model/ItemUUID";
import Coordinate from "./Model/Coordinate";
import {QUERY_DEFAULT_PAGE} from "./Query/Query";
import {QUERY_DEFAULT_SIZE} from "./Query/Query";

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
    static createRepository(
        config:{
            app_id:string,
            index_id:string,
            token:string,
            options: {
                endpoint?:string,
                api_version?:string,
                timeout?:number,
                override_queries?:boolean,
                cache?: KeyValueCache
            }
        }
    ) : Repository {
        config.options = {
            api_version: 'v1',
            timeout: 10000,
            override_queries: true,
            cache: new NoCache(),
            ...config.options,
        };

        /**
         * Client
         */
        let httpClient = new AxiosClient(
            config.options.endpoint,
            config.options.api_version,
            config.options.timeout,
            new RetryMap(),
            config.options.override_queries,
            config.options.cache
        );

        return new HttpRepository(
            httpClient,
            config.app_id,
            config.index_id,
            config.token,
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
    static createQueryLocated(coordinate: Coordinate,
                         queryText: string,
                         page: number = QUERY_DEFAULT_PAGE,
                         size: number = QUERY_DEFAULT_SIZE): Query {
        return Query.createLocated(
            coordinate,
            queryText,
            page,
            size
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
    static createQuery(queryText: string,
                  page: number = QUERY_DEFAULT_PAGE,
                  size: number = QUERY_DEFAULT_SIZE): Query {
        return Query.create(
            queryText,
            page,
            size
        );
    }

    /**
     * Create match all
     *
     * @return {Query}
     */
    static createQueryMatchAll(): Query {
        return Query.createMatchAll();
    }

    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    static createQueryByUUID(uuid: ItemUUID): Query {
        return Query.createByUUID(uuid);
    }

    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    static createQueryByUUIDs(...uuids: ItemUUID[]): Query {
        return Query.createByUUIDs(...uuids);
    }
}