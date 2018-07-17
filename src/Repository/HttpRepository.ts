import {Config} from "../Config/Config";
import {ImmutableConfig} from "../Config/ImmutableConfig";
import {ConnectionError} from "../Error/ConnectionError";
import {InvalidFormatError} from "../Error/InvalidFormatError";
import {InvalidTokenError} from "../Error/InvalidTokenError";
import {ResourceExistsError} from "../Error/ResourceExistsError";
import {ResourceNotAvailableError} from "../Error/ResourceNotAvailableError";
import {HttpClient} from "../Http/HttpClient";
import {Response} from "../Http/Response";
import {Changes} from "../Model/Changes";
import {Item} from "../Model/Item";
import {ItemUUID} from "../Model/ItemUUID";
import {Query} from "../Query/Query";
import {Result} from "../Result/Result";
import {Transformer} from "../Transformer/Transformer";
import {Repository} from "./Repository";
/**
 * Aggregation class
 */
export class HttpRepository extends Repository {

    private httpClient: HttpClient;
    private transformer: Transformer;

    /**
     * Constructor
     *
     * @param httpClient
     * @param appId
     * @param indexId
     * @param token
     * @param transformer
     */
    constructor(
        httpClient: HttpClient,
        appId: string,
        indexId: string,
        token: string,
        transformer: Transformer,
    ) {
        super(appId, indexId, token);
        this.httpClient = httpClient;
        this.transformer = transformer;
    }

    /**
     * Get transformer
     *
     * @return {Transformer}
     */
    public getTransformer(): Transformer {
        return this.transformer;
    }

    /**
     * Generate item document by a simple object.
     *
     * @param object
     */
    public addObject(object) {
        const item = this
            .transformer
            .toItem(object);

        if (item instanceof Item) {
            this.addItem(item);
        }
    }

    /**
     * Delete item document by uuid.
     *
     * @param object
     */
    public deleteObject(object) {
        const itemUUID = this
            .transformer
            .toItemUUID(object);

        if (itemUUID instanceof ItemUUID) {
            this.deleteItem(itemUUID);
        }
    }

    /**
     * Flush update items
     *
     * @param itemsToUpdate
     *
     * @return {Promise<void>}
     */
    public async flushUpdateItems(itemsToUpdate: Item[]): Promise<void> {

        if (itemsToUpdate.length === 0) {
            return;
        }

        return this
            .httpClient
            .get(
                "/items",
                "post",
                this.getCredentials(),
                {},
                {
                    items: itemsToUpdate.map((item) => {
                        return item.toArray();
                    }),
                },
            )
            .then((response) => {
                HttpRepository.throwTransportableExceptionIfNeeded(response);
            });
    }

    /**
     * Flush delete items
     *
     * @param itemsToDelete
     *
     * @return {Promise<void>}
     */
    public async flushDeleteItems(itemsToDelete: ItemUUID[]): Promise<void> {

        if (itemsToDelete.length === 0) {
            return;
        }

        return this
            .httpClient
            .get(
                "/items",
                "delete",
                this.getCredentials(),
                {},
                {
                    items: itemsToDelete.map((itemUUID) => {
                        return itemUUID.toArray();
                    }),
                },
            )
            .then((response) => {
                HttpRepository.throwTransportableExceptionIfNeeded(response);
            });
    }

    /**
     * Query
     *
     * @param query
     *
     * @return {Promise<Result>}
     */
    public async query(query: Query): Promise<Result> {

        const that = this;

        return await this
            .httpClient
            .get(
                "/",
                "get",
                this.getCredentials(),
                {
                    query: JSON.stringify(query.toArray()),
                },
                {},
            )
            .then((response) => {
                HttpRepository.throwTransportableExceptionIfNeeded(response);

                const result = Result.createFromArray(response.getBody());

                return Result.create(
                    result.getQuery(),
                    result.getTotalItems(),
                    result.getTotalHits(),
                    result.getAggregations(),
                    result.getSuggests(),
                    that
                        .transformer
                        .fromItems(result.getItems()),
                );
            });
    }

    /**
     * Update items
     *
     * @param query
     * @param changes
     *
     * @return {Promise<void>}
     */
    public async updateItems(
        query: Query,
        changes: Changes,
    ): Promise<void> {
        return await this
            .httpClient
            .get(
                "/items",
                "put",
                this.getCredentials(),
                {},
                {
                    query: query.toArray(),
                    changes: changes.toArray(),
                },
            )
            .then((response) => {
                HttpRepository.throwTransportableExceptionIfNeeded(response);

                return;
            });
    }

    /**
     * Create index
     *
     * @param immutableConfig
     *
     * @return {Promise<void>}
     */
    public async createIndex(immutableConfig: ImmutableConfig): Promise<void> {

        return await this
            .httpClient
            .get(
                "/index",
                "post",
                this.getCredentials(),
                {},
                {
                    config: immutableConfig.toArray(),
                },
            )
            .then((response) => {
                HttpRepository.throwTransportableExceptionIfNeeded(response);

                return;
            });
    }

    /**
     * Delete index
     *
     * @return {Promise<void>}
     */
    public async deleteIndex(): Promise<void> {

        return await this
            .httpClient
            .get(
                "/index",
                "delete",
                this.getCredentials(),
                {},
                {},
            )
            .then((response) => {
                HttpRepository.throwTransportableExceptionIfNeeded(response);

                return;
            });
    }

    /**
     * Reset index
     *
     * @return {Promise<void>}
     */
    public async resetIndex(): Promise<void> {

        return await this
            .httpClient
            .get(
                "/index/reset",
                "post",
                this.getCredentials(),
                {},
                {},
            )
            .then((response) => {
                HttpRepository.throwTransportableExceptionIfNeeded(response);

                return;
            });
    }

    /**
     * Check index
     *
     * @return {Promise<boolean>}
     */
    public async checkIndex(): Promise<boolean> {

        return await this
            .httpClient
            .get(
                "/index",
                "head",
                this.getCredentials(),
                {},
                {},
            )
            .then((response) => {
                HttpRepository.throwTransportableExceptionIfNeeded(response);

                return response.getCode() === 200;
            });
    }

    /**
     * Configure index
     *
     * @param config
     *
     * @return {Promise<void>}
     */
    public async configureIndex(config: Config): Promise<void> {

        return await this
            .httpClient
            .get(
                "/index/config",
                "post",
                this.getCredentials(),
                {},
                {
                    config: config.toArray(),
                },
            )
            .then((response) => {
                HttpRepository.throwTransportableExceptionIfNeeded(response);

                return;
            });
    }

    /**
     * Get query values
     *
     * @returns any
     */
    private getCredentials(): any {
        return {
            app_id: this.appId,
            index: this.indexId,
            token: this.token,
        };
    }

    /**
     * throw error if needed
     *
     * @param response
     */
    public static throwTransportableExceptionIfNeeded(response: Response) {

        if (typeof response.getCode() == "undefined") {
            return;
        }

        switch (response.getCode()) {
            case ResourceNotAvailableError.getTransportableHTTPError():
                throw new ResourceNotAvailableError(response.getBody().message);
            case InvalidTokenError.getTransportableHTTPError():
                throw new InvalidTokenError(response.getBody().message);
            case InvalidFormatError.getTransportableHTTPError():
                throw new InvalidFormatError(response.getBody().message);
            case ResourceExistsError.getTransportableHTTPError():
                throw new ResourceExistsError(response.getBody().message);
            case ConnectionError.getTransportableHTTPError():
                throw new ConnectionError(response.getBody().message);
        }
    }
}
