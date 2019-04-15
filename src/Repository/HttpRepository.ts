import {Config} from "../Config/Config";
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
import {IndexUUID} from "../Model/IndexUUID";
import {Index} from "../Model/Index";
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
                "/" + this.appId + "/indices/" + this.indexId + "/items",
                "put",
                this.getCredentials(),
                {},
                itemsToUpdate.map((item) => {
                    return item.toArray();
                }),
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
                "/" + this.appId + "/indices/" + this.indexId + "/items",
                "delete",
                this.getCredentials(),
                {},
                itemsToDelete.map((itemUUID) => {
                    return itemUUID.toArray();
                }),
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

        return await this
            .httpClient
            .get(
                "/" + this.appId + "/indices/" + this.indexId,
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

                return this.applyTransformersToResult(result);
            });
    }

    /**
     * Apply transformers to results
     *
     * @param result
     *
     * @return {Result}
     */
    private applyTransformersToResult(result: Result): Result {
        const subresults = result.getSubresults();

        if (Object.keys(subresults).length > 0) {
            Object.keys(subresults).map(function(key) {
                subresults[key] = this.applyTransformersToResult(subresults[key])
            }.bind(this));

            return Result.createMultiresults(subresults);
        }

        return Result.create(
            result.getQueryUUID(),
            result.getTotalItems(),
            result.getTotalHits(),
            result.getAggregations(),
            result.getSuggests(),
            this
                .transformer
                .fromItems(result.getItems())
        );
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
                "/" + this.appId + "/indices/" + this.indexId + "/items/update-by-query",
                "post",
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
     * @param indexUUID
     * @param config
     *
     * @return {Promise<void>}
     */
    public async createIndex(
        indexUUID: IndexUUID,
        config: Config
    ): Promise<void> {

        return await this
            .httpClient
            .get(
                "/" + this.appId + "/indices",
                "put",
                this.getCredentials(),
                {},
                {
                    index: indexUUID.toArray(),
                    config: config.toArray(),
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
     * @param indexUUID
     *
     * @return {Promise<void>}
     */
    public async deleteIndex(indexUUID: IndexUUID): Promise<void> {

        return await this
            .httpClient
            .get(
                "/" + this.appId + "/indices/" + this.indexId,
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
     * @param indexUUID
     *
     * @return {Promise<void>}
     */
    public async resetIndex(indexUUID: IndexUUID): Promise<void> {

        return await this
            .httpClient
            .get(
                "/" + this.appId + "/indices/" + this.indexId + '/reset',
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
     * @param indexUUID
     *
     * @return {Promise<boolean>}
     */
    public async checkIndex(indexUUID: IndexUUID): Promise<boolean> {

        return await this
            .httpClient
            .get(
                "/" + this.appId + "/indices/" + this.indexId + '/reset',
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
     * Check index
     *
     * @return {Promise<Index[]>}
     */
    public async getIndices(): Promise<Index[]> {

        return await this
            .httpClient
            .get(
                "/" + this.appId + "/indices/",
                "get",
                this.getCredentials(),
                {},
                {},
            )
            .then((response) => {
                HttpRepository.throwTransportableExceptionIfNeeded(response);

                let result = [];
                for (var indexAsArray of response.getBody()) {
                    result.push(Index.createFromArray(indexAsArray));
                }

                return result;
            });
    }

    /**
     * Configure index
     *
     * @param indexUUID
     * @param config
     *
     * @return {Promise<void>}
     */
    public async configureIndex(
        indexUUID: IndexUUID,
        config: Config
    ): Promise<void> {

        return await this
            .httpClient
            .get(
                "/" + this.appId + "/indices/" + this.indexId + '/configure',
                "post",
                this.getCredentials(),
                {},
                config.toArray(),
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
