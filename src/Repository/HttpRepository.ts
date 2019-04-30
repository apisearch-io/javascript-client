import {Config} from "../Config/Config";
import {ConnectionError} from "../Error/ConnectionError";
import {InvalidFormatError} from "../Error/InvalidFormatError";
import {InvalidTokenError} from "../Error/InvalidTokenError";
import {ResourceExistsError} from "../Error/ResourceExistsError";
import {ResourceNotAvailableError} from "../Error/ResourceNotAvailableError";
import {UnknownError} from "../Error/UnknownError";
import {HttpClient} from "../Http/HttpClient";
import {Response} from "../Http/Response";
import {Changes} from "../Model/Changes";
import {Index} from "../Model/Index";
import {IndexUUID} from "../Model/IndexUUID";
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
     *
     * @returns {void}
     */
    public addObject(object): void {
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
     *
     * @returns {void}
     */
    public deleteObject(object): void {
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
     * @param {Item[]} itemsToUpdate
     *
     * @return {Promise<void>}
     */
    public async flushUpdateItems(itemsToUpdate: Item[]): Promise<void> {

        if (itemsToUpdate.length === 0) {
            return;
        }

        try {
            await this.httpClient.get(
                "/" + this.appId + "/indices/" + this.indexId + "/items",
                "put",
                this.getCredentials(),
                {},
                itemsToUpdate.map((item) => {
                    return item.toArray();
                }),
            );
        } catch (response) {
            throw this.createErrorFromResponse(response);
        }
    }

    /**
     * Flush delete items
     *
     * @param {ItemUUID[]} itemsToDelete
     *
     * @return {Promise<void>}
     */
    public async flushDeleteItems(itemsToDelete: ItemUUID[]): Promise<void> {

        if (itemsToDelete.length === 0) {
            return;
        }

        try {
            await this.httpClient.get(
                "/" + this.appId + "/indices/" + this.indexId + "/items",
                "delete",
                this.getCredentials(),
                {},
                itemsToDelete.map((itemUUID) => {
                    return itemUUID.toArray();
                }),
            );
        } catch (response) {
            throw this.createErrorFromResponse(response);
        }
    }

    /**
     * Query
     *
     * @param {Query} query
     *
     * @return {Promise<Result>}
     */
    public async query(query: Query): Promise<Result> {
        let response: Response;
        try {
            response = await this.httpClient.get(
                "/" + this.appId + "/indices/" + this.indexId,
                "get",
                this.getCredentials(),
                {
                    query: JSON.stringify(query.toArray()),
                },
                {},
            );
        } catch (response) {
            throw this.createErrorFromResponse(response);
        }
        const result = Result.createFromArray(response.getBody());

        return this.applyTransformersToResult(result);
    }

    /**
     * Update items
     *
     * @param {Query} query
     * @param {Changes} changes
     *
     * @return {Promise<void>}
     */
    public async updateItems(
        query: Query,
        changes: Changes,
    ): Promise<void> {
        try {
            await this.httpClient.get(
                "/" + this.appId + "/indices/" + this.indexId + "/items/update-by-query",
                "post",
                this.getCredentials(),
                {},
                {
                    changes: changes.toArray(),
                    query: query.toArray(),
                },
            );
        } catch (response) {
            throw this.createErrorFromResponse(response);
        }
    }

    /**
     * Create index
     *
     * @param {IndexUUID} indexUUID
     * @param {Config} config
     *
     * @return {Promise<void>}
     */
    public async createIndex(
        indexUUID: IndexUUID,
        config: Config,
    ): Promise<void> {
        try {
            await this.httpClient.get(
                "/" + this.appId + "/indices/" + indexUUID.composedUUID(),
                "put",
                this.getCredentials(),
                {},
                config.toArray(),
            );
        } catch (response) {
            throw this.createErrorFromResponse(response);
        }
    }

    /**
     * Delete index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<void>}
     */
    public async deleteIndex(indexUUID: IndexUUID): Promise<void> {
        try {
            await this.httpClient.get(
                "/" + this.appId + "/indices/" + this.indexId,
                "delete",
                this.getCredentials(),
                {},
                {},
            );
        } catch (response) {
            throw this.createErrorFromResponse(response);
        }
    }

    /**
     * Reset index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<void>}
     */
    public async resetIndex(indexUUID: IndexUUID): Promise<void> {
        try {
            await this.httpClient.get(
                "/" + this.appId + "/indices/" + this.indexId + "/reset",
                "post",
                this.getCredentials(),
                {},
                {},
            );
        } catch (response) {
            throw this.createErrorFromResponse(response);
        }
    }

    /**
     * Check index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<boolean>}
     */
    public async checkIndex(indexUUID: IndexUUID): Promise<boolean> {
        let response: Response;
        try {
            response = await this.httpClient.get(
                "/" + this.appId + "/indices/" + this.indexId,
                "head",
                this.getCredentials(),
                {},
                {},
            );
        } catch (response) {
            throw this.createErrorFromResponse(response);
        }

        return response.getCode() === 200;
    }

    /**
     * Check index
     *
     * @return {Promise<Index[]>}
     */
    public async getIndices(): Promise<Index[]> {
        let response: Response;
        try {
            response = await this.httpClient.get(
                "/" + this.appId + "/indices/",
                "get",
                this.getCredentials(),
                {},
                {},
            );
        } catch (response) {
            throw this.createErrorFromResponse(response);
        }
        const result: Index[] = [];
        for (const indexAsArray of response.getBody()) {
            result.push(Index.createFromArray(indexAsArray));
        }

        return result;
    }

    /**
     * Configure index
     *
     * @param {IndexUUID} indexUUID
     * @param {Config} config
     *
     * @return {Promise<void>}
     */
    public async configureIndex(
        indexUUID: IndexUUID,
        config: Config,
    ): Promise<void> {
        try {
            await this.httpClient.get(
                "/" + this.appId + "/indices/" + this.indexId + "/configure",
                "post",
                this.getCredentials(),
                {},
                config.toArray(),
            );
        } catch (response) {
            throw this.createErrorFromResponse(response);
        }
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
     * Apply transformers to results
     *
     * @param {Result} result
     *
     * @return {Result}
     */
    private applyTransformersToResult(result: Result): Result {
        const subresults = result.getSubresults();

        if (Object.keys(subresults).length > 0) {
            Object.keys(subresults).map(function(key) {
                subresults[key] = this.applyTransformersToResult(subresults[key]);
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
                .fromItems(result.getItems()),
        );
    }

    /**
     * Create exception to match an error response
     *
     * @param any response
     */
    private createErrorFromResponse(response: any) {

        let error;
        if (response instanceof Response) {
            switch (response.getCode()) {
                case ResourceNotAvailableError.getTransportableHTTPError():
                    error = new ResourceNotAvailableError(response.getBody().message);
                    break;
                case InvalidTokenError.getTransportableHTTPError():
                    error = new InvalidTokenError(response.getBody().message);
                    break;
                case InvalidFormatError.getTransportableHTTPError():
                    error = new InvalidFormatError(response.getBody().message);
                    break;
                case ResourceExistsError.getTransportableHTTPError():
                    error = new ResourceExistsError(response.getBody().message);
                    break;
                case ConnectionError.getTransportableHTTPError():
                    error = new ConnectionError(response.getBody().message);
                    break;
            }
        }

        return undefined === error
            ? UnknownError.createUnknownError()
            : error;
    }
}
