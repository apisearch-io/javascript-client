import { LocationRange } from "../Geo/LocationRange";
import { Coordinate } from "../Model/Coordinate";
import { ItemUUID } from "../Model/ItemUUID";
import { User } from "../Model/User";
import { Aggregation } from "./Aggregation";
import { Filter } from "./Filter";
import { ScoreStrategies } from "./ScoreStrategies";
import { SortBy } from "./SortBy";
import { IndexUUID } from "../Model/IndexUUID";
/**
 * Query constants
 */
export declare const QUERY_DEFAULT_PAGE = 1;
export declare const QUERY_DEFAULT_SIZE = 10;
export declare const NO_MIN_SCORE = 0;
/**
 * Query class
 */
export declare class Query {
    private UUID;
    private coordinate;
    private fields;
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
    private numberOfSuggestions;
    private highlightsEnabled;
    private autocompleteEnabled;
    private searchableFields;
    private scoreStrategies;
    private fuzziness;
    private minScore;
    private user;
    private metadata;
    private subqueries;
    private indexUUID;
    private queryOperator;
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
     * Create by UUIDs
     *
     * @param queries
     *
     * @return {Query}
     */
    static createMultiquery(queries: Object): Query;
    /**
     * set fields
     *
     * @param fields
     *
     * @return {Query}
     */
    setFields(fields: string[]): Query;
    /**
     * get fields
     *
     * @return {string[]}
     */
    getFields(): string[];
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
     * @param ranges
     * @param values
     * @param applicationType
     * @param rangeType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    filterByRange(filterName: string, field: string, ranges: string[], values: any[], applicationType?: number, rangeType?: string, aggregate?: boolean, aggregationSort?: string[]): Query;
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
     * @param searchableFields
     *
     * @return {Query}
     */
    setSearchableFields(searchableFields: string[]): Query;
    /**
     * Get filter fields
     *
     * @return {string[]}
     */
    getSearchableFields(): string[];
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
     * @param promoted
     *
     * @return {Query}
     */
    aggregateBy(filterName: string, field: string, applicationType: number, aggregationSort?: string[], limit?: number, promoted?: string[]): Query;
    /**
     * Aggregate by range
     *
     * @param filterName
     * @param field
     * @param ranges
     * @param applicationType
     * @param rangeType
     * @param aggregationSort
     * @param limit
     * @param promoted
     *
     * @return {Query}
     */
    aggregateByRange(filterName: string, field: string, ranges: string[], applicationType: number, rangeType?: string, aggregationSort?: string[], limit?: number, promoted?: string[]): Query;
    /**
     * Aggregate by date range
     *
     * @param filterName
     * @param field
     * @param options
     * @param applicationType
     * @param aggregationSort
     * @param limit
     * @param promoted
     *
     * @return {Query}
     */
    aggregateByDateRange(filterName: string, field: string, options: string[], applicationType: number, aggregationSort?: string[], limit?: number, promoted?: string[]): Query;
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
     * Set number of suggestions
     *
     * @param numberOfSuggestions
     *
     * @return {Query}
     */
    setNumberOfSuggestions(numberOfSuggestions: number): Query;
    /**
     * Disable suggestions
     *
     * @return {Query}
     */
    disableSuggestions(): Query;
    /**
     * Get number of suggestions
     *
     * @return {number}
     */
    getNumberOfSuggestions(): number;
    /**
     * Enable autocomplete
     *
     * @return {Query}
     */
    enableAutocomplete(): Query;
    /**
     * Disable autocomplete
     *
     * @return {Query}
     */
    disableAutocomplete(): Query;
    /**
     * Are autocomplete enabled
     *
     * @return {boolean}
     */
    areAutocompleteEnabled(): boolean;
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
     * Get score strategies
     *
     * @return {ScoreStrategies}
     */
    getScoreStrategies(): ScoreStrategies;
    /**
     * Set score strategies
     *
     * @param scoreStrategies
     */
    setScoreStrategies(scoreStrategies: ScoreStrategies): Query;
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
     * Get min score
     *
     * @return any
     */
    getMinScore(): any;
    /**
     * Set min score
     *
     * @param minScore
     *
     * @return {Query}
     */
    setMinScore(minScore: number): Query;
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
     * set metadata value
     *
     * @param name
     * @param value
     *
     * @return {Query}
     */
    setMetadataValue(name: string, value: any): Query;
    /**
     * Get metadata
     *
     * @return any
     */
    getMetadata(): any;
    /**
     * Add subquery
     *
     * @param name
     * @param subquery
     *
     * @return {Query}
     */
    addSubquery(name: string, subquery: Query): Query;
    /**
     * Get subqueries
     *
     * @return {Object}
     */
    getSubqueries(): Object;
    /**
     * Identify it
     *
     * @param UUID
     *
     * @return {Query}
     */
    identifyWith(UUID: string): Query;
    /**
     * Get identification
     *
     * @return {string|null}
     */
    getUUID(): string | null;
    /**
     * Force Index UUID.
     *
     * @param indexUUID
     *
     * @return {Query}
     */
    forceIndexUUID(indexUUID: IndexUUID): Query;
    /**
     * Get IndexUUID
     *
     * @return {IndexUUID|null}
     */
    getIndexUUID(): IndexUUID;
    setQueryOperator(queryOperator: string): Query;
    getQueryOperator(): string | null;
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
