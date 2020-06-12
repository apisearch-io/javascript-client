import { Coordinate } from "./Coordinate";
import { ItemUUID } from "./ItemUUID";
import { AppUUID } from "./AppUUID";
import { IndexUUID } from "./IndexUUID";
/**
 * Item class
 */
export declare class Item {
    private uuid;
    private coordinate;
    private distance;
    private metadata;
    private indexedMetadata;
    private searchableMetadata;
    private exactMatchingMetadata;
    private suggest;
    private highlights;
    private promoted;
    private score;
    private appUUID;
    private indexUUID;
    /**
     * Constructor
     *
     * @param uuid
     * @param coordinate
     * @param metadata
     * @param indexedMetadata
     * @param searchableMetadata
     * @param exactMatchingMetadata
     * @param suggest
     */
    private constructor();
    /**
     * Create new Item
     *
     * @param uuid
     * @param metadata
     * @param indexedMetadata
     * @param searchableMetadata
     * @param exactMatchingMetadata
     * @param suggest
     * @returns {Item}
     */
    static create(uuid: ItemUUID, metadata?: any, indexedMetadata?: any, searchableMetadata?: any, exactMatchingMetadata?: string[], suggest?: string[]): Item;
    /**
     * Create new located Item
     *
     * @param uuid
     * @param coordinate
     * @param metadata
     * @param indexedMetadata
     * @param searchableMetadata
     * @param exactMatchingMetadata
     * @param suggest
     * @returns {Item}
     */
    static createLocated(uuid: ItemUUID, coordinate: Coordinate, metadata?: any, indexedMetadata?: any, searchableMetadata?: any, exactMatchingMetadata?: string[], suggest?: string[]): Item;
    /**
     * Get uuid
     *
     * @returns ItemUUID
     */
    getUUID(): ItemUUID;
    /**
     * Get id
     *
     * @returns string
     */
    getId(): string;
    /**
     * Get type
     *
     * @returns string
     */
    getType(): string;
    /**
     * Get coordinate
     *
     * @returns Coordinate|null
     */
    getCoordinate(): Coordinate;
    /**
     * Get distance
     *
     * @returns int
     */
    getDistance(): number;
    /**
     * Get metadata
     *
     * @returns Array
     */
    getMetadata(): any;
    /**
     * Set metadata
     *
     * @param metadata
     */
    setMetadata(metadata: any): void;
    /**
     * Add metadata
     *
     * @param key
     * @param value
     */
    addMetadata(key: string, value: any): void;
    /**
     * Get indexed metadata
     *
     * @returns Array
     */
    getIndexedMetadata(): any;
    /**
     * Set indexed metadata
     *
     * @param indexedMetadata
     */
    setIndexedMetadata(indexedMetadata: any): void;
    /**
     * Add indexed metadata
     *
     * @param key
     * @param value
     */
    addIndexedMetadata(key: string, value: any): void;
    /**
     * Get searchable metadata
     *
     * @returns Array
     */
    getSearchableMetadata(): any;
    /**
     * Set searchable metadata
     *
     * @param searchableMetadata
     */
    setSearchableMetadata(searchableMetadata: any): void;
    /**
     * Add searchable metadata
     *
     * @param key
     * @param value
     */
    addSearchableMetadata(key: string, value: any): void;
    /**
     * Get exactMatching metadata
     *
     * @returns Array
     */
    getExactMatchingMetadata(): string[];
    /**
     * Set exactMatching metadata
     *
     * @param exactMatchingMetadata
     */
    setExactMatchingMetadata(exactMatchingMetadata: string[]): void;
    /**
     * Add exactMatching metadata
     *
     * @param value
     */
    addExactMatchingMetadata(value: string): void;
    /**
     * Get all metadata
     *
     * @returns {{}}
     */
    getAllMetadata(): any;
    /**
     * Get
     *
     * @param key
     *
     * @returns mixed|null
     */
    get(key: string): any;
    /**
     * Get suggest
     *
     * @returns Array
     */
    getSuggest(): string[];
    /**
     * Get highlights
     *
     * @returns Array
     */
    getHighlights(): any;
    /**
     * Get highlight
     *
     * @param key
     *
     * @return string|null
     */
    getHighlight(key: string): any;
    /**
     * Is promoted
     *
     * @returns boolean
     */
    isPromoted(): boolean;
    /**
     * Set score
     *
     * @param score
     *
     * @return {Item}
     */
    setScore(score: number): Item;
    /**
     * Get score
     *
     * @return {number}
     */
    getScore(): number;
    /**
     * Set appUUID
     *
     * @return {AppUUID}
     */
    getAppUUID(): AppUUID;
    /**
     * Set indexUUID
     *
     * @return {IndexUUID}
     */
    getIndexUUID(): IndexUUID;
    /**
     * To array
     */
    toArray(): {
        uuid: {};
        coordinate?: {};
        metadata?: {};
        indexed_metadata?: {};
        searchable_metadata?: {};
        exact_matching_data?: string[];
        suggest?: string[];
        highlights?: {};
        is_promoted?: boolean;
        distance?: number;
        score?: number;
        app_uuid?: {};
        index_uuid?: {};
    };
    /**
     * Create from array
     *
     * @param array
     */
    static createFromArray(array: any): Item;
    /**
     * Compose uuid
     *
     * @returns string
     */
    composeUUID(): string;
    /**
     * Get path by field.
     *
     * @param field
     *
     * @returns {string}
     */
    static getPathByField(field: string): string;
}
