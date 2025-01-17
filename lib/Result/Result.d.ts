import { Item } from "../Model/Item";
import { ResultAggregation } from "./ResultAggregation";
import { ResultAggregations } from "./ResultAggregations";
/**
 * Result class
 */
export declare class Result {
    private queryUUID;
    private items;
    private autocomplete;
    private suggestions;
    private aggregations;
    private totalItems;
    private totalHits;
    private itemsGroupedByTypeCache;
    private subresults;
    private metadata;
    /**
     * Constructor
     *
     * @param queryUUID
     * @param totalItems
     * @param totalHits
     */
    constructor(queryUUID: string, totalItems: number, totalHits: number);
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
    static create(queryUUID: string, totalItems: number, totalHits: number, aggregations: ResultAggregations, suggestions: string[], items: Item[], autocomplete?: string | null, metadata?: any): Result;
    /**
     * Create multi results
     *
     * @param subresults
     *
     * @returns {Result}
     */
    static createMultiresults(subresults: Object): Result;
    /**
     * Add item
     *
     * @param item
     */
    addItem(item: Item): void;
    /**
     * Get items
     *
     * @return {Item[]}
     */
    getItems(): Item[];
    /**
     * @param items
     */
    withItems(items: Item[]): void;
    /**
     * Get items grouped by types
     *
     * @return {any[]}
     */
    getItemsGroupedByTypes(): any[];
    /**
     * Get items by type
     *
     * @param type
     *
     * @return {Array}
     */
    getItemsByType(type: string): Item[];
    /**
     * Get items by types
     *
     * @param types
     */
    getItemsByTypes(types: string[]): Item[];
    /**
     * Get first item
     *
     * @return {Item}
     */
    getFirstItem(): Item;
    /**
     * Set aggregations
     *
     * @param aggregations
     */
    setAggregations(aggregations: ResultAggregations): void;
    /**
     * Get aggregations
     *
     * @return {ResultAggregations}
     */
    getAggregations(): ResultAggregations;
    /**
     * Get aggregation
     *
     * @param name
     *
     * @return {null}
     */
    getAggregation(name: string): ResultAggregation;
    /**
     * Has no empty aggregation
     *
     * @param name
     *
     * @return {boolean}
     */
    hasNotEmptyAggregation(name: string): boolean;
    /**
     * Get suggestions
     *
     * @return {string[]}
     */
    getSuggestions(): string[];
    /**
     * Get autocomplete
     *
     * @return {string|null}
     */
    getAutocomplete(): string | null;
    /**
     * Get query uuid
     *
     * @return {string}
     */
    getQueryUUID(): string;
    /**
     * Get total elements
     *
     * @return {number}
     */
    getTotalItems(): number;
    /**
     * Get total hits
     *
     * @return {number}
     */
    getTotalHits(): number;
    /**
     * Get subresults
     *
     * @return Object
     */
    getSubresults(): Object;
    /**
     * @return any
     */
    getMetadata(): any;
    /**
     * @param name
     */
    getMetadataValue(name: string): any;
    /**
     * to array
     *
     * @return {{query: any, total_items: number, total_hits: number, items:any[], aggregations: any, suggestions: string[]}}
     */
    toArray(): any;
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Result}
     */
    static createFromArray(array: any): Result;
}
