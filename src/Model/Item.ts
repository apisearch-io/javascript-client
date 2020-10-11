import {InvalidFormatError} from "../Error/InvalidFormatError";
import {Coordinate} from "./Coordinate";
import {ItemUUID} from "./ItemUUID";
import {AppUUID} from "./AppUUID";
import {IndexUUID} from "./IndexUUID";

/**
 * Item class
 */
export class Item {

    private uuid: ItemUUID;
    private coordinate: Coordinate;
    private distance: number;
    private metadata: any = {};
    private indexedMetadata: any = {};
    private searchableMetadata: any = {};
    private exactMatchingMetadata: string[] = [];
    private suggest: string[] = [];
    private highlights: any = {};
    private promoted: boolean = false;
    private score: number;
    private appUUID: AppUUID;
    private indexUUID: IndexUUID;

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
    private constructor(uuid: ItemUUID,
                        coordinate: Coordinate,
                        metadata: any,
                        indexedMetadata: any,
                        searchableMetadata: any,
                        exactMatchingMetadata: string[],
                        suggest: string[]) {
        this.uuid = uuid;
        this.coordinate = coordinate;
        this.metadata = metadata;
        this.indexedMetadata = indexedMetadata;
        this.searchableMetadata = searchableMetadata;
        this.exactMatchingMetadata = exactMatchingMetadata;
        this.suggest = suggest;
    }

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
    public static create(uuid: ItemUUID,
                         metadata: any = {},
                         indexedMetadata: any = {},
                         searchableMetadata: any = {},
                         exactMatchingMetadata: string[] = [],
                         suggest: string[] = []) {
        return new Item(
            uuid,
            null,
            metadata,
            indexedMetadata,
            searchableMetadata,
            exactMatchingMetadata,
            suggest,
        );
    }

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
    public static createLocated(uuid: ItemUUID,
                                coordinate: Coordinate,
                                metadata: any = {},
                                indexedMetadata: any = {},
                                searchableMetadata: any = {},
                                exactMatchingMetadata: string[] = [],
                                suggest: string[] = []) {
        return new Item(
            uuid,
            coordinate,
            metadata,
            indexedMetadata,
            searchableMetadata,
            exactMatchingMetadata,
            suggest,
        );
    }

    /**
     * Get uuid
     *
     * @returns ItemUUID
     */
    public getUUID(): ItemUUID {
        return this.uuid;
    }

    /**
     * Get id
     *
     * @returns string
     */
    public getId(): string {
        return this.uuid.getId();
    }

    /**
     * Get type
     *
     * @returns string
     */
    public getType(): string {
        return this.uuid.getType();
    }

    /**
     * Get coordinate
     *
     * @returns Coordinate|null
     */
    public getCoordinate(): Coordinate {
        return this.coordinate;
    }

    /**
     * Get distance
     *
     * @returns int
     */
    public getDistance(): number {
        return this.distance;
    }

    /**
     * Get metadata
     *
     * @returns Array
     */
    public getMetadata(): any {
        return this.metadata;
    }

    /**
     * Set metadata
     *
     * @param metadata
     */
    public setMetadata(metadata: any) {
        this.metadata = metadata;
    }

    /**
     * Add metadata
     *
     * @param key
     * @param value
     */
    public addMetadata(key: string,
                       value: any) {
        this.metadata[key] = value;
    }

    /**
     * Get indexed metadata
     *
     * @returns Array
     */
    public getIndexedMetadata(): any {
        return this.indexedMetadata;
    }

    /**
     * Set indexed metadata
     *
     * @param indexedMetadata
     */
    public setIndexedMetadata(indexedMetadata: any) {
        this.indexedMetadata = indexedMetadata;
    }

    /**
     * Add indexed metadata
     *
     * @param key
     * @param value
     */
    public addIndexedMetadata(key: string,
                              value: any) {
        this.indexedMetadata[key] = value;
    }

    /**
     * Get searchable metadata
     *
     * @returns Array
     */
    public getSearchableMetadata(): any {
        return this.searchableMetadata;
    }

    /**
     * Set searchable metadata
     *
     * @param searchableMetadata
     */
    public setSearchableMetadata(searchableMetadata: any) {
        this.searchableMetadata = searchableMetadata;
    }

    /**
     * Add searchable metadata
     *
     * @param key
     * @param value
     */
    public addSearchableMetadata(key: string,
                                 value: any) {
        this.searchableMetadata[key] = value;
    }

    /**
     * Get exactMatching metadata
     *
     * @returns Array
     */
    public getExactMatchingMetadata(): string[] {
        return this.exactMatchingMetadata;
    }

    /**
     * Set exactMatching metadata
     *
     * @param exactMatchingMetadata
     */
    public setExactMatchingMetadata(exactMatchingMetadata: string[]) {
        this.exactMatchingMetadata = exactMatchingMetadata;
    }

    /**
     * Add exactMatching metadata
     *
     * @param value
     */
    public addExactMatchingMetadata(value: string) {
        this.exactMatchingMetadata.push(value);
    }

    /**
     * Get all metadata
     *
     * @returns {{}}
     */
    public getAllMetadata(): any {
        return {...this.metadata, ...this.indexedMetadata};
    }

    /**
     * Get
     *
     * @param key
     *
     * @returns mixed|null
     */
    public get(key: string): any {
        const allMetadata = this.getAllMetadata();
        return (typeof allMetadata[key] != "undefined")
            ? allMetadata[key]
            : null;
    }

    /**
     * Get suggest
     *
     * @returns Array
     */
    public getSuggest(): string[] {
        return this.suggest;
    }

    /**
     * Get highlights
     *
     * @returns Array
     */
    public getHighlights(): any {
        return this.highlights;
    }

    /**
     * Get highlight
     *
     * @param key
     *
     * @return string|null
     */
    public getHighlight(key: string) {
        return (typeof this.highlights[key] != "undefined")
            ? this.highlights[key]
            : null;
    }

    /**
     * Is promoted
     *
     * @returns boolean
     */
    public isPromoted(): boolean {
        return this.promoted;
    }

    /**
     * Set score
     *
     * @param score
     *
     * @return {Item}
     */
    public setScore(score: number) : Item {
        this.score = score;

        return this;
    }

    /**
     * Get score
     *
     * @return {number}
     */
    public getScore() : number {
        return this.score;
    }

    /**
     * Set appUUID
     *
     * @return {AppUUID}
     */
     public getAppUUID() : AppUUID {
        return this.appUUID;
     }

    /**
     * Set indexUUID
     *
     * @return {IndexUUID}
     */
     public getIndexUUID() : IndexUUID {
        return this.indexUUID;
     }

    /**
     * To array
     */
    public toArray(): {
        uuid: {},
        coordinate?: {},
        metadata?: {},
        indexed_metadata?: {},
        searchable_metadata?: {},
        exact_matching_data?: string[],
        suggest?: string[],
        highlights?: {},
        is_promoted?: boolean,
        distance?: number,
        score?: number,
        app_uuid?: {},
        index_uuid?: {}
    } {
        const itemAsArray: {
            uuid: {},
            coordinate?: {},
            metadata?: {},
            indexed_metadata?: {},
            searchable_metadata?: {},
            exact_matching_metadata?: string[],
            suggest?: string[],
            highlights?: {},
            is_promoted?: boolean,
            distance?: number,
            score?: number,
            app_uuid?: {},
            index_uuid?: {}
        } = {
            uuid: this.uuid.toArray(),
        };

        if (this.coordinate instanceof Coordinate) {
            itemAsArray.coordinate = this.coordinate.toArray();
        }

        if (Object.keys(this.metadata).length > 0) {
            itemAsArray.metadata = this.metadata;
        }

        if (Object.keys(this.indexedMetadata).length > 0) {
            itemAsArray.indexed_metadata = this.indexedMetadata;
        }

        if (Object.keys(this.searchableMetadata).length > 0) {
            itemAsArray.searchable_metadata = this.searchableMetadata;
        }

        if (this.exactMatchingMetadata.length > 0) {
            itemAsArray.exact_matching_metadata = this.exactMatchingMetadata;
        }

        if (this.suggest.length > 0) {
            itemAsArray.suggest = this.suggest;
        }

        if (Object.keys(this.highlights).length > 0) {
            itemAsArray.highlights = this.highlights;
        }

        if (this.isPromoted()) {
            itemAsArray.is_promoted = true;
        }

        if (typeof this.distance != "undefined") {
            itemAsArray.distance = this.distance;
        }

        if (typeof this.score != "undefined") {
            itemAsArray.score = this.score;
        }

        if (typeof this.appUUID != "undefined") {
            itemAsArray.app_uuid = this.appUUID.toArray();
        }

        if (typeof this.indexUUID != "undefined") {
            itemAsArray.index_uuid = this.indexUUID.toArray();
        }

        return itemAsArray;
    }

    /**
     * Create from array
     *
     * @param array
     */
    public static createFromArray(array: any): Item {
        array = JSON.parse(JSON.stringify(array));
        if (typeof array.uuid != "object") {
            throw InvalidFormatError.itemUUIDRepresentationNotValid();
        }

        if (
            typeof array.coordinate != "undefined" &&
            typeof array.coordinate != "object"
        ) {
            throw InvalidFormatError.coordinateFormatNotValid();
        }

        const item = (
            typeof array.coordinate == "object" &&
            array.coordinate != null
        )
            ? Item.createLocated(
                ItemUUID.createFromArray(array.uuid),
                Coordinate.createFromArray(array.coordinate),
                ((typeof array.metadata == "undefined") ? {} : array.metadata),
                ((typeof array.indexed_metadata == "undefined") ? {} : array.indexed_metadata),
                ((typeof array.searchable_metadata == "undefined") ? {} : array.searchable_metadata),
                ((typeof array.exact_matching_metadata == "undefined") ? [] : array.exact_matching_metadata),
                ((typeof array.suggest == "undefined") ? [] : array.suggest),
            )
            : Item.create(
                ItemUUID.createFromArray(array.uuid),
                ((typeof array.metadata == "undefined") ? {} : array.metadata),
                ((typeof array.indexed_metadata == "undefined") ? {} : array.indexed_metadata),
                ((typeof array.searchable_metadata == "undefined") ? {} : array.searchable_metadata),
                ((typeof array.exact_matching_metadata == "undefined") ? [] : array.exact_matching_metadata),
                ((typeof array.suggest == "undefined") ? [] : array.suggest),
            );

        if (
            typeof array.distance != "undefined" &&
            array.distance != null
        ) {
            item.distance = array.distance;
        }

        if (
            typeof array.highlights == "object" &&
            array.highlights != null
        ) {
            item.highlights = array.highlights;
        }

        if (
            typeof array.is_promoted != "undefined" &&
            array.is_promoted != null
        ) {
            item.promoted = array.is_promoted;
        }

        if (
            typeof array.score != "undefined" &&
            array.score != null
        ) {
            item.score = array.score;
        }

        if (
            typeof array.app_uuid != "undefined" &&
            array.app_uuid != null
        ) {
            item.appUUID = AppUUID.createFromArray(array.app_uuid);
        }

        if (
            typeof array.index_uuid != "undefined" &&
            array.index_uuid != null
        ) {
            item.indexUUID = IndexUUID.createFromArray(array.index_uuid);
        }

        return item;
    }

    /**
     * Compose uuid
     *
     * @returns string
     */
    public composeUUID(): string {
        return this.uuid.composedUUID();
    }

    /**
     * Get path by field.
     *
     * @param field
     *
     * @returns {string}
     */
    public static getPathByField(field: string): string {
        return (["id", "type"].indexOf(field) > -1)
            ? `uuid.${field}`
            : `indexed_metadata.${field}`
            ;
    }
}
