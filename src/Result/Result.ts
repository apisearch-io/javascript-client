import {Item} from "../Model/Item";
import {ResultAggregation} from "./ResultAggregation";
import {ResultAggregations} from "./ResultAggregations";
/**
 * Result class
 */
export class Result {

    private queryUUID: string;
    private items: Item[] = [];
    private autocomplete: string|null = null;
    private suggestions: string[] = [];
    private aggregations: ResultAggregations;
    private totalItems: number;
    private totalHits: number;
    private itemsGroupedByTypeCache: any;
    private subresults: any = {};
    private metadata: any = {};

    /**
     * Constructor
     *
     * @param queryUUID
     * @param totalItems
     * @param totalHits
     */
    constructor(
        queryUUID: string,
        totalItems: number,
        totalHits: number,
    ) {
        this.queryUUID = queryUUID;
        this.totalItems = totalItems;
        this.totalHits = totalHits;
    }

    /**
     * @param queryUUID
     * @param totalItems
     * @param totalHits
     * @param aggregations
     * @param suggestions
     * @param items
     * @param autocomplete
     * @param metadata
     */
    public static create(
        queryUUID: string,
        totalItems: number,
        totalHits: number,
        aggregations: ResultAggregations,
        suggestions: string[],
        items: Item[],
        autocomplete: string|null = null,
        metadata: any = {},
    ): Result {
        const result = new Result(
            queryUUID,
            totalItems,
            totalHits,
        );

        result.aggregations = aggregations;
        result.suggestions = suggestions;
        result.items = items;
        result.autocomplete = autocomplete;
        result.metadata = metadata;

        return result;
    }

    /**
     * Create multi results
     *
     * @param subresults
     *
     * @returns {Result}
     */
    public static createMultiresults(subresults: Object): Result {
        const result = new Result('', 0, 0);
        result.subresults = subresults;

        return result;
    }

    /**
     * Add item
     *
     * @param item
     */
    public addItem(item: Item) {
        this.items.push(item);
    }

    /**
     * Get items
     *
     * @return {Item[]}
     */
    public getItems(): Item[] {
        return this.items;
    }

    /**
     * @param items
     */
    public withItems(items: Item[]) {
        this.items = items;
    }

    /**
     * Get items grouped by types
     *
     * @return {any[]}
     */
    public getItemsGroupedByTypes(): any[] {
        if (
            this.itemsGroupedByTypeCache instanceof Object &&
            Object.keys(this.itemsGroupedByTypeCache).length > 0
        ) {
            return this.itemsGroupedByTypeCache;
        }

        const itemsGroupedByTypes: any = {};
        for (const i in this.items) {
            const item = this.items[i];
            if (!(itemsGroupedByTypes[item.getType()] instanceof Array)) {
                itemsGroupedByTypes[item.getType()] = [];
            }

            itemsGroupedByTypes[item.getType()].push(item);
        }

        this.itemsGroupedByTypeCache = itemsGroupedByTypes;

        return itemsGroupedByTypes;
    }

    /**
     * Get items by type
     *
     * @param type
     *
     * @return {Array}
     */
    public getItemsByType(type: string): Item[] {
        const itemsGroupedByTypes = this.getItemsGroupedByTypes();
        return itemsGroupedByTypes[type] == null
            ? []
            : itemsGroupedByTypes[type];
    }

    /**
     * Get items by types
     *
     * @param types
     */
    public getItemsByTypes(types: string[]): Item[] {
        return this.items.filter((item) => types.indexOf(item.getType()) >= 0);
    }

    /**
     * Get first item
     *
     * @return {Item}
     */
    public getFirstItem() {
        return this.items.length > 0
            ? this.items[0]
            : null;
    }

    /**
     * Set aggregations
     *
     * @param aggregations
     */
    public setAggregations(aggregations: ResultAggregations) {
        this.aggregations = aggregations;
    }

    /**
     * Get aggregations
     *
     * @return {ResultAggregations}
     */
    public getAggregations(): ResultAggregations {
        return this.aggregations instanceof ResultAggregations
            ? this.aggregations
            : null;
    }

    /**
     * Get aggregation
     *
     * @param name
     *
     * @return {null}
     */
    public getAggregation(name: string): ResultAggregation {

        return this.aggregations == null
            ? null
            : this.aggregations.getAggregation(name);
    }

    /**
     * Has no empty aggregation
     *
     * @param name
     *
     * @return {boolean}
     */
    public hasNotEmptyAggregation(name: string): boolean {

        return this.aggregations == null
            ? false
            : this.aggregations.hasNotEmptyAggregation(name);
    }

    /**
     * Get suggestions
     *
     * @return {string[]}
     */
    public getSuggestions(): string[] {
        return this.suggestions;
    }

    /**
     * Get autocomplete
     *
     * @return {string|null}
     */
    public getAutocomplete(): string|null {
        return this.autocomplete;
    }

    /**
     * Get query uuid
     *
     * @return {string}
     */
    public getQueryUUID(): string {
        return this.queryUUID;
    }

    /**
     * Get total elements
     *
     * @return {number}
     */
    public getTotalItems(): number {
        return this.totalItems;
    }

    /**
     * Get total hits
     *
     * @return {number}
     */
    public getTotalHits(): number {
        return this.totalHits;
    }

    /**
     * Get subresults
     *
     * @return Object
     */
    public getSubresults(): Object {
        return this.subresults;
    }

    /**
     * @return any
     */
    public getMetadata(): any
    {
        return this.metadata;
    }

    /**
     * @param name
     */
    public getMetadataValue(name: string): any
    {
        return this.metadata[name] ?? null;
    }

    /**
     * to array
     *
     * @return {{query: any, total_items: number, total_hits: number, items:any[], aggregations: any, suggestions: string[]}}
     */
    public toArray(): any {
        const array: any = {
            query_uuid: this.queryUUID,
            total_items: this.totalItems,
            total_hits: this.totalHits,
            items: this.items.map((item) => item.toArray()),
            aggregations: this.aggregations == null
                ? null
                : this.aggregations.toArray(),
            suggests: this.suggestions,
            autocomplete: this.autocomplete === null
                ? undefined
                : this.autocomplete,
            metadata: this.metadata,
        };

        if (
            this.subresults instanceof Object &&
            Object.keys(this.subresults).length
        ) {
            array.subresults = {};
            for (const i in this.subresults) {
                const subresult = this.subresults[i];
                array.subresults[i] = subresult.toArray();
            }
        }

        return array;
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @return {Result}
     */
    public static createFromArray(array: any): Result {
        const result: any = Result.create(
            array.query_uuid
                ? array.query_uuid
                : '',
            array.total_items
                ? array.total_items
                : 0,
            array.total_hits
                ? array.total_hits
                : 0,
            array.aggregations instanceof Object
                ? ResultAggregations.createFromArray(array.aggregations)
                : null,
            array.suggests
                ? array.suggests
                : [],
            array.items instanceof Array
                ? array.items.map((itemAsArray) => Item.createFromArray(itemAsArray))
                : [],
            array.autocomplete === undefined
                ? null
                : array.autocomplete,
            array.metadata === undefined
                ? {}
                : array.metadata,
        );

        /**
         * Subqueries
         */
        const subresultsAsArray = typeof array.subresults === typeof {}
            ? array.subresults
            : {};

        for (const i in subresultsAsArray) {
            result.subresults[i] = Result.createFromArray(subresultsAsArray[i]);
        }

        return result;
    }
}
