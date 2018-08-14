import { LocationRange } from "../Geo/LocationRange";
import { Coordinate } from "../Model/Coordinate";
import { ItemUUID } from "../Model/ItemUUID";
import { User } from "../Model/User";
import { Aggregation } from "./Aggregation";
import { Filter } from "./Filter";
import { ScoreStrategy } from "./ScoreStrategy";
import { SortBy } from "./SortBy";
/**
 * Query constants
 */
export declare const QUERY_DEFAULT_FROM = 0;
export declare const QUERY_DEFAULT_PAGE = 1;
export declare const QUERY_DEFAULT_SIZE = 10;
export declare const QUERY_INFINITE_SIZE = 1000;
/**
 * Query class
 */
export declare class Query {
    private coordinate;
    private universeFilters;
    private filters;
    private itemsPromoted;
    private sortByInstance;
    private aggregations;
    private page;
    private from;
    private size;
    private resultsEnabled;
    private aggregationsEnabled;
    private suggestionsEnabled;
    private highlightsEnabled;
    private filterFields;
    private scoreStrategy;
    private fuzziness;
    private user;
    /**
     * Constructor
     *
     * @param queryText
     */
    private constructor();
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
    static createLocated(coordinate: Coordinate, queryText: string, page?: number, size?: number): Query;
    /**
     * Create
     *
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    static create(queryText: string, page?: number, size?: number): Query;
    /**
     * Create match all
     *
     * @return {Query}
     */
    static createMatchAll(): Query;
    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    static createByUUID(uuid: ItemUUID): Query;
    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    static createByUUIDs(...uuids: ItemUUID[]): Query;
    /**
     * Filter universe by types
     *
     * @param values
     *
     * @return {Query}
     */
    filterUniverseByTypes(values: any[]): Query;
    /**
     * Filter by types
     *
     * @param values
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    filterByTypes(values: any[], aggregate?: boolean, aggregationSort?: string[]): Query;
    /**
     * Filter universe by ids
     *
     * @param values
     *
     * @return {Query}
     */
    filterUniverseByIds(values: any[]): Query;
    /**
     * Filter by ids
     *
     * @param values
     *
     * @return {Query}
     */
    filterByIds(values: any[]): Query;
    /**
     * Filter universe by
     *
     * @param field
     * @param values
     * @param applicationType
     *
     * @return {Query}
     */
    filterUniverseBy(field: string, values: any[], applicationType?: number): Query;
    /**
     * Filter by
     *
     * @param filterName
     * @param field
     * @param values
     * @param applicationType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    filterBy(filterName: string, field: string, values: any[], applicationType?: number, aggregate?: boolean, aggregationSort?: string[]): Query;
    /**
     * Filter universe by range
     *
     * @param field
     * @param values
     * @param applicationType
     * @param rangeType
     *
     * @return {Query}
     */
    filterUniverseByRange(field: string, values: any[], applicationType?: number, rangeType?: string): Query;
    /**
     * Filter universe by date range
     *
     * @param field
     * @param values
     * @param applicationType
     *
     * @return {Query}
     */
    filterUniverseByDateRange(field: string, values: any[], applicationType?: number): Query;
    /**
     * Filter by range
     *
     * @param filterName
     * @param field
     * @param options
     * @param values
     * @param applicationType
     * @param rangeType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    filterByRange(filterName: string, field: string, options: string[], values: any[], applicationType?: number, rangeType?: string, aggregate?: boolean, aggregationSort?: string[]): Query;
    /**
     * Filter by date range
     *
     * @param filterName
     * @param field
     * @param options
     * @param values
     * @param applicationType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    filterByDateRange(filterName: string, field: string, options: string[], values: any[], applicationType?: number, aggregate?: boolean, aggregationSort?: string[]): Query;
    /**
     * Filter universe by location
     *
     * @param locationRange
     *
     * @return {Query}
     */
    filterUniverseByLocation(locationRange: LocationRange): Query;
    /**
     * Set filter fields
     *
     * @param filterFields
     *
     * @return {Query}
     */
    setFilterFields(filterFields: string[]): Query;
    /**
     * Get filter fields
     *
     * @return {string[]}
     */
    getFilterFields(): string[];
    /**
     * Sort by
     *
     * @param sortBy
     *
     * @return {Query}
     */
    sortBy(sortBy: SortBy): Query;
    /**
     * Aggregate by
     *
     * @param filterName
     * @param field
     * @param applicationType
     * @param aggregationSort
     * @param limit
     *
     * @return {Query}
     */
    aggregateBy(filterName: string, field: string, applicationType: number, aggregationSort?: string[], limit?: number): Query;
    /**
     * Aggregate by range
     *
     * @param filterName
     * @param field
     * @param options
     * @param applicationType
     * @param rangeType
     * @param aggregationSort
     * @param limit
     *
     * @return {Query}
     */
    aggregateByRange(filterName: string, field: string, options: string[], applicationType: number, rangeType?: string, aggregationSort?: string[], limit?: number): Query;
    /**
     * Aggregate by date range
     *
     * @param filterName
     * @param field
     * @param options
     * @param applicationType
     * @param aggregationSort
     * @param limit
     *
     * @return {Query}
     */
    aggregateByDateRange(filterName: string, field: string, options: string[], applicationType: number, aggregationSort?: string[], limit?: number): Query;
    /**
     * Get aggregations
     *
     * @return {{}}
     */
    getAggregations(): any;
    /**
     * Get aggregation by name
     *
     * @param aggregationName
     *
     * @return {Aggregation|null}
     */
    getAggregation(aggregationName: string): Aggregation;
    /**
     * Get query text
     *
     * @return {string}
     */
    getQueryText(): string;
    /**
     * Get universe filters
     *
     * @return {{}}
     */
    getUniverseFilters(): any;
    /**
     * Get universe filter by name
     *
     * @param filterName
     *
     * @return {Filter|null}
     */
    getUniverseFilter(filterName: string): Filter;
    /**
     * Get filters
     *
     * @return {{}}
     */
    getFilters(): any;
    /**
     * Get filter by name
     *
     * @param filterName
     *
     * @return {Filter|null}
     */
    getFilter(filterName: string): Filter;
    /**
     * Get filter by field
     *
     * @param fieldName
     *
     * @return {Filter|null}
     */
    getFilterByField(fieldName: string): Filter;
    /**
     * Get sort by
     *
     * @return {SortBy}
     */
    getSortBy(): SortBy;
    /**
     * Get from
     *
     * @return {number}
     */
    getFrom(): number;
    /**
     * Get size
     *
     * @return {number}
     */
    getSize(): number;
    /**
     * Get page
     *
     * @return {number}
     */
    getPage(): number;
    /**
     * Enable results
     *
     * @return {Query}
     */
    enableResults(): Query;
    /**
     * Disable results
     *
     * @return {Query}
     */
    disableResults(): Query;
    /**
     * Are results enabled
     *
     * @return {boolean}
     */
    areResultsEnabled(): boolean;
    /**
     * Enable aggregations
     *
     * @return {Query}
     */
    enableAggregations(): Query;
    /**
     * Disable aggregations
     *
     * @return {Query}
     */
    disableAggregations(): Query;
    /**
     * Are aggregations enabled
     *
     * @return {boolean}
     */
    areAggregationsEnabled(): boolean;
    /**
     * Enable suggestions
     *
     * @return {Query}
     */
    enableSuggestions(): Query;
    /**
     * Disable suggestions
     *
     * @return {Query}
     */
    disableSuggestions(): Query;
    /**
     * Are suggestions enabled
     *
     * @return {boolean}
     */
    areSuggestionsEnabled(): boolean;
    /**
     * Enable highlights
     *
     * @return {Query}
     */
    enableHighlights(): Query;
    /**
     * Disable highlights
     *
     * @return {Query}
     */
    disableHighlights(): Query;
    /**
     * Are highlights enabled
     *
     * @return {boolean}
     */
    areHighlightsEnabled(): boolean;
    /**
     * Promote uuid
     *
     * @param itemUUID
     *
     * @return {Query}
     */
    promoteUUID(itemUUID: ItemUUID): Query;
    /**
     * Promote UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    promoteUUIDs(...uuids: ItemUUID[]): Query;
    /**
     * Get promoted UUIDs
     *
     * @return {ItemUUID[]}
     */
    getItemsPromoted(): ItemUUID[];
    /**
     * Exclude id
     *
     * @param itemUUID
     *
     * @return {Query}
     */
    excludeUUID(itemUUID: ItemUUID): Query;
    /**
     * Exclude UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    excludeUUIDs(...uuids: ItemUUID[]): Query;
    /**
     * Get score strategy
     *
     * @return {ScoreStrategy}
     */
    getScoreStrategy(): ScoreStrategy;
    /**
     * Set score strategy
     *
     * @param scoreStrategy
     */
    setScoreStrategy(scoreStrategy: ScoreStrategy): Query;
    /**
     * Get fuzziness
     *
     * @return any
     */
    getFuzziness(): any;
    /**
     * Set fuzziness
     *
     * @param fuzziness
     *
     * @return {Query}
     */
    setFuzziness(fuzziness: any): Query;
    /**
     * Set auto fuzziness
     *
     * @return {Query}
     */
    setAutoFuzziness(): Query;
    /**
     * By user
     *
     * @param user
     *
     * @return {Query}
     */
    byUser(user: any): Query;
    /**
     * By anyone
     *
     * @return {null}
     */
    anonymously(): Query;
    /**
     * Get user
     *
     * @return {User}
     */
    getUser(): User;
    /**
     * To array
     *
     * @return {any}
     */
    toArray(): any;
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Query}
     */
    static createFromArray(array: any): Query;
}
