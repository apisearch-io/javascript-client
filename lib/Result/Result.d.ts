import { Item } from "../Model/Item";
import { ResultAggregation } from "../Result/ResultAggregation";
import { Query } from "../Query/Query";
import { ResultAggregations } from "./ResultAggregations";
/**
 * Result class
 */
export declare class Result {
    private query;
    private items;
    private suggests;
    private aggregations;
    private totalItems;
    private totalHits;
    private itemsGroupedByTypeCache;
    /**
     * Constructor
     *
     * @param query
     * @param totalItems
     * @param totalHits
     */
    constructor(query: Query, totalItems: number, totalHits: number);
    /**
     * Create
     *
     * @param query
     * @param totalItems
     * @param totalHits
     * @param aggregations
     * @param suggests
     * @param items
     *
     * @returns {Result}
     */
    static create(query: Query, totalItems: number, totalHits: number, aggregations: ResultAggregations, suggests: string[], items: Item[]): Result;
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
     * Add suggest
     *
     * @param suggest
     */
    addSuggest(suggest: string): void;
    /**
     * Get suggests
     *
     * @return {string[]}
     */
    getSuggests(): string[];
    /**
     * Get query
     *
     * @return {Query}
     */
    getQuery(): Query;
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
     * to array
     *
     * @return {{query: any, total_items: number, total_hits: number, items:any[], aggregations: any, suggests: string[]}}
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
