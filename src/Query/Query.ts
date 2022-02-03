import {LocationRange} from "../Geo/LocationRange";
import {Coordinate} from "../Model/Coordinate";
import {ItemUUID} from "../Model/ItemUUID";
import {Item} from "../Model/Item";
import {User} from "../Model/User";
import {Aggregation} from "./Aggregation";
import {Filter} from "./Filter";

import {
    FILTER_AT_LEAST_ONE,
    FILTER_EXCLUDE,
    FILTER_TYPE_DATE_RANGE,
    FILTER_TYPE_FIELD,
    FILTER_TYPE_GEO,
    FILTER_TYPE_RANGE,
} from "./Filter";

import {
    AGGREGATION_NO_LIMIT,
    AGGREGATION_SORT_BY_COUNT_DESC,
} from "./Aggregation";

import {InvalidFormatError} from "../Error/InvalidFormatError";
import {FILTER_TYPE_QUERY} from "./Filter";
import {ScoreStrategies} from "./ScoreStrategies";
import {SortBy} from "./SortBy";
import {IndexUUID} from "../Model/IndexUUID";

/**
 * Query constants
 */
export const QUERY_DEFAULT_PAGE = 1;
export const QUERY_DEFAULT_SIZE = 10;
export const NO_MIN_SCORE = 0.0;

/**
 * Query class
 */
export class Query {

    private UUID: string|null = null;
    private coordinate: Coordinate;
    private fields: string[] = [];
    private universeFilters: any = {};
    private filters: any = {};
    private itemsPromoted: ItemUUID[] = [];
    private sortByInstance: SortBy;
    private aggregations: any = {};
    private page: number;
    private from: number;
    private size: number;
    private resultsEnabled: boolean = true;
    private aggregationsEnabled: boolean = true;
    private numberOfSuggestions: number = 0;
    private highlightsEnabled: boolean = false;
    private autocompleteEnabled: boolean = false;
    private searchableFields: string[] = [];
    private scoreStrategies: ScoreStrategies;
    private fuzziness: any = null;
    private minScore: number = NO_MIN_SCORE;
    private user: User;
    private metadata: any = {};
    private subqueries: any = {};
    private indexUUID: IndexUUID;
    private queryOperator: string|null = null;

    /**
     * Constructor
     *
     * @param queryText
     */
    private constructor(queryText: string) {
        this.sortByInstance = SortBy.create();
        this.filters._query = Filter.create(
            "",
            [queryText],
            0,
            FILTER_TYPE_QUERY,
        );
    }

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
    public static createLocated(coordinate: Coordinate,
                                queryText: string,
                                page: number = QUERY_DEFAULT_PAGE,
                                size: number = QUERY_DEFAULT_SIZE): Query {
        const query = Query.create(
            queryText,
            page,
            size,
        );

        query.coordinate = coordinate;

        return query;
    }

    /**
     * Create
     *
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    public static create(queryText: string,
                         page: number = QUERY_DEFAULT_PAGE,
                         size: number = QUERY_DEFAULT_SIZE): Query {
        page = Math.max(1, page);
        const query = new Query(queryText);
        query.from = (page - 1) * size;
        query.size = size;
        query.page = page;

        return query;
    }

    /**
     * Create match all
     *
     * @return {Query}
     */
    public static createMatchAll(): Query {
        return Query.create(
            "",
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE,
        );
    }

    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    public static createByUUID(uuid: ItemUUID): Query {
        return Query.createByUUIDs(uuid);
    }

    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    public static createByUUIDs(...uuids: ItemUUID[]): Query {
        const ids: string[] = [];
        for (const i in uuids) {
            ids.push(uuids[i].composedUUID());
        }

        const query = Query.create("", QUERY_DEFAULT_PAGE, ids.length)
            .disableAggregations()
            .disableSuggestions();

        query.filters._id = Filter.create(
            "_id",
            ids,
            FILTER_AT_LEAST_ONE,
            FILTER_TYPE_FIELD,
        );

        return query;
    }

    /**
     * Create by UUIDs
     *
     * @param queries
     *
     * @return {Query}
     */
    public static createMultiquery(queries: Object): Query {
        const query = Query.createMatchAll();
        query.subqueries = queries;

        return query;
    }

    /**
     * set fields
     *
     * @param fields
     *
     * @return {Query}
     */
    public setFields(fields: string[]) : Query {
        this.fields = fields;

        return this;
    }

    /**
     * get fields
     *
     * @return {string[]}
     */
    public getFields() : string[] {
        return this.fields;
    }

    /**
     * Filter universe by types
     *
     * @param values
     *
     * @return {Query}
     */
    public filterUniverseByTypes(values: any[]): Query {
        const fieldPath = Item.getPathByField("type");
        if (values.length > 0) {
            this.universeFilters = {
                ...this.universeFilters,
                ["type"]: Filter.create(
                    fieldPath,
                    values,
                    FILTER_AT_LEAST_ONE,
                    FILTER_TYPE_FIELD,
                ),
            };
        } else {
            delete this.universeFilters.type;
        }

        return this;
    }

    /**
     * Filter by types
     *
     * @param values
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    public filterByTypes(values: any[],
                         aggregate: boolean = true,
                         aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC): Query {
        const fieldPath = Item.getPathByField("type");
        if (values.length > 0) {
            this.filters = {
                ...this.filters,
                ["type"]: Filter.create(
                    fieldPath,
                    values,
                    FILTER_AT_LEAST_ONE,
                    FILTER_TYPE_FIELD,
                ),
            };
        } else {
            delete this.filters.type;
        }

        if (aggregate) {
            this.aggregations = {
                ...this.aggregations,
                ["type"]: Aggregation.create(
                    "type",
                    fieldPath,
                    FILTER_AT_LEAST_ONE,
                    FILTER_TYPE_FIELD,
                    [],
                    aggregationSort,
                ),
            };
        }

        return this;
    }

    /**
     * Filter universe by ids
     *
     * @param values
     *
     * @return {Query}
     */
    public filterUniverseByIds(values: any[]): Query {
        const fieldPath = Item.getPathByField("id");
        if (values.length > 0) {
            this.universeFilters = {
                ...this.universeFilters,
                ["id"]: Filter.create(
                    fieldPath,
                    values,
                    FILTER_AT_LEAST_ONE,
                    FILTER_TYPE_FIELD,
                ),
            };
        } else {
            delete this.universeFilters.id;
        }

        return this;
    }

    /**
     * Filter by ids
     *
     * @param values
     *
     * @return {Query}
     */
    public filterByIds(values: any[]): Query {
        const fieldPath = Item.getPathByField("id");
        if (values.length > 0) {
            this.filters = {
                ...this.filters,
                ["id"]: Filter.create(
                    fieldPath,
                    values,
                    FILTER_AT_LEAST_ONE,
                    FILTER_TYPE_FIELD,
                ),
            };
        } else {
            delete this.filters.id;
        }

        return this;
    }

    /**
     * Filter universe by
     *
     * @param field
     * @param values
     * @param applicationType
     *
     * @return {Query}
     */
    public filterUniverseBy(field: string,
                            values: any[],
                            applicationType: number = FILTER_AT_LEAST_ONE): Query {
        const fieldPath = Item.getPathByField(field);
        if (values.length > 0) {
            this.universeFilters = {
                ...this.universeFilters,
                [field]: Filter.create(
                    fieldPath,
                    values,
                    applicationType,
                    FILTER_TYPE_FIELD,
                ),
            };
        } else {
            delete this.universeFilters[field];
        }

        return this;
    }

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
    public filterBy(filterName: string,
                    field: string,
                    values: any[],
                    applicationType: number = FILTER_AT_LEAST_ONE,
                    aggregate: boolean = true,
                    aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC): Query {
        const fieldPath = Item.getPathByField(field);
        if (values.length > 0) {
            this.filters = {
                ...this.filters,
                [filterName]: Filter.create(
                    fieldPath,
                    values,
                    applicationType,
                    FILTER_TYPE_FIELD,
                ),
            };
        } else {
            delete this.filters[filterName];
        }

        if (aggregate) {
            this.aggregateBy(
                filterName,
                field,
                applicationType,
                aggregationSort,
            );
        }

        return this;
    }

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
    public filterUniverseByRange(field: string,
                                 values: any[],
                                 applicationType: number = FILTER_AT_LEAST_ONE,
                                 rangeType: string = FILTER_TYPE_RANGE): Query {
        const fieldPath = Item.getPathByField(field);
        if (values.length > 0) {
            this.universeFilters = {
                ...this.universeFilters,
                [field]: Filter.create(
                    fieldPath,
                    values,
                    applicationType,
                    rangeType,
                ),
            };
        } else {
            delete this.universeFilters[field];
        }

        return this;
    }

    /**
     * Filter universe by date range
     *
     * @param field
     * @param values
     * @param applicationType
     *
     * @return {Query}
     */
    public filterUniverseByDateRange(field: string,
                                     values: any[],
                                     applicationType: number = FILTER_AT_LEAST_ONE): Query {
        return this.filterUniverseByRange(
            field,
            values,
            applicationType,
            FILTER_TYPE_DATE_RANGE,
        );
    }

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
    public filterByRange(filterName: string,
                         field: string,
                         ranges: string[],
                         values: any[],
                         applicationType: number = FILTER_AT_LEAST_ONE,
                         rangeType: string = FILTER_TYPE_RANGE,
                         aggregate: boolean = true,
                         aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC): Query {
        const fieldPath = Item.getPathByField(field);
        if (values.length !== 0) {
            this.filters = {
                ...this.filters,
                [filterName]: Filter.create(
                    fieldPath,
                    values,
                    applicationType,
                    rangeType,
                ),
            };
        } else {
            delete this.filters[filterName];
        }

        if (aggregate) {
            this.aggregateByRange(
                filterName,
                fieldPath,
                ranges,
                applicationType,
                rangeType,
                aggregationSort,
            );
        }

        return this;
    }

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
    public filterByDateRange(filterName: string,
                             field: string,
                             options: string[],
                             values: any[],
                             applicationType: number = FILTER_AT_LEAST_ONE,
                             aggregate: boolean = true,
                             aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC): Query {
        return this.filterByRange(
            filterName,
            field,
            options,
            values,
            applicationType,
            FILTER_TYPE_DATE_RANGE,
            aggregate,
            aggregationSort,
        );
    }

    /**
     * Filter universe by location
     *
     * @param locationRange
     *
     * @return {Query}
     */
    public filterUniverseByLocation(locationRange: LocationRange): Query {
        this.universeFilters = {
            ...this.universeFilters,
            ["coordinate"]: Filter.create(
                "coordinate",
                locationRange.toArray(),
                FILTER_AT_LEAST_ONE,
                FILTER_TYPE_GEO,
            ),
        };

        return this;
    }

    /**
     * Set filter fields
     *
     * @param searchableFields
     *
     * @return {Query}
     */
    public setSearchableFields(searchableFields: string[]): Query {
        this.searchableFields = searchableFields;

        return this;
    }

    /**
     * Get filter fields
     *
     * @return {string[]}
     */
    public getSearchableFields(): string[] {
        return this.searchableFields;
    }

    /**
     * Sort by
     *
     * @param sortBy
     *
     * @return {Query}
     */
    public sortBy(sortBy: SortBy): Query {

        if (sortBy.isSortedByGeoDistance()) {
            if (!(this.coordinate instanceof Coordinate)) {
                throw InvalidFormatError.querySortedByDistanceWithoutCoordinate();
            }

            sortBy.setCoordinate(this.coordinate);
        }

        this.sortByInstance = sortBy;

        return this;
    }

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
    public aggregateBy(filterName: string,
                       field: string,
                       applicationType: number,
                       aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC,
                       limit: number = AGGREGATION_NO_LIMIT,
                       promoted: string[] = [],
    ): Query {
        this.aggregations = {
            ...this.aggregations,
            [filterName]: Aggregation.create(
                filterName,
                Item.getPathByField(field),
                applicationType,
                FILTER_TYPE_FIELD,
                [],
                aggregationSort,
                limit,
                promoted,
            ),
        };

        return this;
    }

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
    public aggregateByRange(filterName: string,
                            field: string,
                            ranges: string[],
                            applicationType: number,
                            rangeType: string = FILTER_TYPE_RANGE,
                            aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC,
                            limit: number = AGGREGATION_NO_LIMIT,
                            promoted: string[] = [],
    ): Query {
        if (ranges.length === 0) {
            return this;
        }

        this.aggregations = {
            ...this.aggregations,
            [filterName]: Aggregation.create(
                filterName,
                Item.getPathByField(field),
                applicationType,
                rangeType,
                ranges,
                aggregationSort,
                limit,
                promoted,
            ),
        };

        return this;
    }

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
    public aggregateByDateRange(filterName: string,
                                field: string,
                                options: string[],
                                applicationType: number,
                                aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC,
                                limit: number = AGGREGATION_NO_LIMIT,
                                promoted: string[] = []): Query {
        return this.aggregateByRange(
            filterName,
            field,
            options,
            applicationType,
            FILTER_TYPE_DATE_RANGE,
            aggregationSort,
            limit,
            promoted
        );
    }

    /**
     * Get aggregations
     *
     * @return {{}}
     */
    public getAggregations(): any {
        return this.aggregations;
    }

    /**
     * Get aggregation by name
     *
     * @param aggregationName
     *
     * @return {Aggregation|null}
     */
    public getAggregation(aggregationName: string): Aggregation {
        return this.aggregations[aggregationName] instanceof Aggregation
            ? this.aggregations[aggregationName]
            : null;
    }

    /**
     * Get query text
     *
     * @return {string}
     */
    public getQueryText(): string {
        const filter = this.filters._query;
        return filter instanceof Filter
            ? filter.getValues()[0]
            : "";
    }

    /**
     * Get universe filters
     *
     * @return {{}}
     */
    public getUniverseFilters(): any {
        return this.universeFilters;
    }

    /**
     * Get universe filter by name
     *
     * @param filterName
     *
     * @return {Filter|null}
     */
    public getUniverseFilter(filterName: string): Filter {
        return this.universeFilters[filterName] instanceof Filter
            ? this.universeFilters[filterName]
            : null;
    }

    /**
     * Get filters
     *
     * @return {{}}
     */
    public getFilters(): any {
        return this.filters;
    }

    /**
     * Get filter by name
     *
     * @param filterName
     *
     * @return {Filter|null}
     */
    public getFilter(filterName: string): Filter {
        return this.filters[filterName] instanceof Filter
            ? this.filters[filterName]
            : null;
    }

    /**
     * Get filter by field
     *
     * @param fieldName
     *
     * @return {Filter|null}
     */
    public getFilterByField(fieldName: string): Filter {
        const fieldPath = Item.getPathByField(fieldName);
        for (const i in this.filters) {
            if (this.filters[i].getField() == fieldPath) {
                return this.filters[i];
            }
        }

        return null;
    }

    /**
     * Get sort by
     *
     * @return {SortBy}
     */
    public getSortBy(): SortBy {
        return this.sortByInstance;
    }

    /**
     * Get from
     *
     * @return {number}
     */
    public getFrom(): number {
        return this.from;
    }

    /**
     * Get size
     *
     * @return {number}
     */
    public getSize(): number {
        return this.size;
    }

    /**
     * Get page
     *
     * @return {number}
     */
    public getPage(): number {
        return this.page;
    }

    /**
     * Enable results
     *
     * @return {Query}
     */
    public enableResults(): Query {
        this.resultsEnabled = true;

        return this;
    }

    /**
     * Disable results
     *
     * @return {Query}
     */
    public disableResults(): Query {
        this.resultsEnabled = false;

        return this;
    }

    /**
     * Are results enabled
     *
     * @return {boolean}
     */
    public areResultsEnabled(): boolean {
        return this.resultsEnabled;
    }

    /**
     * Enable aggregations
     *
     * @return {Query}
     */
    public enableAggregations(): Query {
        this.aggregationsEnabled = true;

        return this;
    }

    /**
     * Disable aggregations
     *
     * @return {Query}
     */
    public disableAggregations(): Query {
        this.aggregationsEnabled = false;

        return this;
    }

    /**
     * Are aggregations enabled
     *
     * @return {boolean}
     */
    public areAggregationsEnabled(): boolean {
        return this.aggregationsEnabled;
    }

    /**
     * Set number of suggestions
     *
     * @param numberOfSuggestions
     *
     * @return {Query}
     */
    public setNumberOfSuggestions(numberOfSuggestions: number): Query {
        this.numberOfSuggestions = numberOfSuggestions;

        return this;
    }

    /**
     * Disable suggestions
     *
     * @return {Query}
     */
    public disableSuggestions(): Query {
        this.numberOfSuggestions = 0;

        return this;
    }

    /**
     * Get number of suggestions
     *
     * @return {number}
     */
    public getNumberOfSuggestions(): number {
        return this.numberOfSuggestions;
    }

    /**
     * Enable autocomplete
     *
     * @return {Query}
     */
    public enableAutocomplete(): Query {
        this.autocompleteEnabled = true;

        return this;
    }

    /**
     * Disable autocomplete
     *
     * @return {Query}
     */
    public disableAutocomplete(): Query {
        this.autocompleteEnabled = false;

        return this;
    }

    /**
     * Are autocomplete enabled
     *
     * @return {boolean}
     */
    public areAutocompleteEnabled(): boolean {
        return this.autocompleteEnabled;
    }

    /**
     * Enable highlights
     *
     * @return {Query}
     */
    public enableHighlights(): Query {
        this.highlightsEnabled = true;

        return this;
    }

    /**
     * Disable highlights
     *
     * @return {Query}
     */
    public disableHighlights(): Query {
        this.highlightsEnabled = false;

        return this;
    }

    /**
     * Are highlights enabled
     *
     * @return {boolean}
     */
    public areHighlightsEnabled(): boolean {
        return this.highlightsEnabled;
    }

    /**
     * Promote uuid
     *
     * @param itemUUID
     *
     * @return {Query}
     */
    public promoteUUID(itemUUID: ItemUUID): Query {
        this
            .itemsPromoted
            .push(itemUUID);

        return this;
    }

    /**
     * Promote UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    public promoteUUIDs(...uuids: ItemUUID[]): Query {
        this.itemsPromoted = uuids;

        return this;
    }

    /**
     * Get promoted UUIDs
     *
     * @return {ItemUUID[]}
     */
    public getItemsPromoted(): ItemUUID[] {
        return this.itemsPromoted;
    }

    /**
     * Exclude id
     *
     * @param itemUUID
     *
     * @return {Query}
     */
    public excludeUUID(itemUUID: ItemUUID): Query {
        this.excludeUUIDs(itemUUID);

        return this;
    }

    /**
     * Exclude UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    public excludeUUIDs(...uuids: ItemUUID[]): Query {
        this.filters = {
            ...this.filters,
            ["excluded_ids"]: Filter.create(
                "_id",
                uuids.map((uuid) => uuid.composedUUID()),
                FILTER_EXCLUDE,
                FILTER_TYPE_FIELD,
            ),
        };

        return this;
    }

    /**
     * Get score strategies
     *
     * @return {ScoreStrategies}
     */
    public getScoreStrategies(): ScoreStrategies {
        return this.scoreStrategies;
    }

    /**
     * Set score strategies
     *
     * @param scoreStrategies
     */
    public setScoreStrategies(scoreStrategies: ScoreStrategies): Query {
        this.scoreStrategies = scoreStrategies;

        return this;
    }

    /**
     * Get fuzziness
     *
     * @return any
     */
    public getFuzziness():any {
        return this.fuzziness;
    }

    /**
     * Set fuzziness
     *
     * @param fuzziness
     *
     * @return {Query}
     */
    public setFuzziness(fuzziness) : Query {
        this.fuzziness = fuzziness;

        return this;
    }

    /**
     * Set auto fuzziness
     *
     * @return {Query}
     */
    public setAutoFuzziness() : Query {
        this.fuzziness = 'AUTO';

        return this;
    }

    /**
     * Get min score
     *
     * @return any
     */
    public getMinScore():any {
        return this.minScore;
    }

    /**
     * Set min score
     *
     * @param minScore
     *
     * @return {Query}
     */
    public setMinScore(minScore: number) : Query {
        this.minScore = minScore;

        return this;
    }

    /**
     * By user
     *
     * @param user
     *
     * @return {Query}
     */
    public byUser(user): Query {
        this.user = user;

        return this;
    }

    /**
     * By anyone
     *
     * @return {null}
     */
    public anonymously(): Query {
        this.user = null;

        return null;
    }

    /**
     * Get user
     *
     * @return {User}
     */
    public getUser(): User {
        return this.user;
    }

    /**
     * set metadata value
     *
     * @param name
     * @param value
     *
     * @return {Query}
     */
    public setMetadataValue(
        name: string,
        value
    ) : Query {
        this.metadata[name] = value;

        return this;
    }

    /**
     * Get metadata
     *
     * @return any
     */
    public getMetadata() : any {
        return this.metadata;
    }

    /**
     * Add subquery
     *
     * @param name
     * @param subquery
     *
     * @return {Query}
     */
    public addSubquery(
        name: string,
        subquery: Query
    ) : Query
    {
        this.subqueries[name] = subquery;

        return this;
    }

    /**
     * Get subqueries
     *
     * @return {Object}
     */
    public getSubqueries() : Object
    {
        return this.subqueries;
    }

    /**
     * Identify it
     *
     * @param UUID
     *
     * @return {Query}
     */
    public identifyWith(UUID: string) : Query
    {
        this.UUID = UUID;

        return this;
    }

    /**
     * Get identification
     *
     * @return {string|null}
     */
    public getUUID() : string|null
    {
        return this.UUID;
    }


    /**
     * Force Index UUID.
     *
     * @param indexUUID
     *
     * @return {Query}
     */
    public forceIndexUUID(indexUUID: IndexUUID) : Query
    {
        this.indexUUID = indexUUID;

        return this;
    }

    /**
     * Get IndexUUID
     *
     * @return {IndexUUID|null}
     */
    public getIndexUUID() : IndexUUID
    {
        return this.indexUUID;
    }

    public setQueryOperator(queryOperator: string) : Query
    {
        this.queryOperator = queryOperator;

        return this;
    }

    public getQueryOperator() : string|null
    {
        return this.queryOperator;
    }

    /**
     * To array
     *
     * @return {any}
     */
    public toArray(): any {
        const array: any = {};

        if (this.UUID !== null) {
            array.UUID = this.UUID;
        }

        if (this.getQueryText() !== "") {
            array.q = this.getQueryText();
        }

        if (this.coordinate instanceof Coordinate) {
            array.coordinate = this.coordinate.toArray();
        }

        /**
         * Fields
         */
        if (
            this.fields instanceof Array &&
            this.fields.length > 0
        ) {
            array.fields = this.fields;
        }

        /**
         * Universe Filters
         */
        if (Object.keys(this.universeFilters).length) {
            array.universe_filters = {};
            for (const i in this.universeFilters) {
                const universeFilter = this.universeFilters[i];
                array.universe_filters[i] = universeFilter.toArray();
            }
        }

        /**
         * Filters
         */
        if (
            this.filters instanceof Object &&
            Object.keys(this.filters).length
        ) {
            const filters = {};
            for (const i in this.filters) {
                const filter = this.filters[i];
                if (filter.getFilterType() !== FILTER_TYPE_QUERY) {
                    filters[i] = filter.toArray();
                }
            }

            if (Object.keys(filters).length > 0) {
                array.filters = filters;
            }
        }

        /**
         * Aggregations
         */
        if (
            this.aggregations instanceof Object &&
            Object.keys(this.aggregations).length
        ) {
            array.aggregations = {};
            for (const i in this.aggregations) {
                const aggregation = this.aggregations[i];
                array.aggregations[i] = aggregation.toArray();
            }
        }

        /**
         * Sort
         */
        const sort = this.sortByInstance.toArray();
        if (Object.keys(sort).length) {
            array.sort = sort;
        }

        /**
         * Page
         */
        const page = this.page;
        if (page !== QUERY_DEFAULT_PAGE) {
            array.page = page;
        }

        /**
         * Size
         */
        const size = this.size;
        if (size !== QUERY_DEFAULT_SIZE) {
            array.size = size;
        }

        /**
         * Booleans
         */
        if (this.resultsEnabled === false) {
            array.results_enabled = false;
        }

        if (this.autocompleteEnabled === true) {
            array.autocomplete_enabled = true;
        }

        if (this.numberOfSuggestions !== 0) {
            array.number_of_suggestions = this.numberOfSuggestions;
        }

        if (this.highlightsEnabled === true) {
            array.highlight_enabled = true;
        }

        if (this.aggregationsEnabled === false) {
            array.aggregations_enabled = false;
        }

        /**
         * Filter fields
         */
        if (
            this.searchableFields instanceof Array &&
            this.searchableFields.length > 0
        ) {
            array.searchable_fields = this.searchableFields;
        }

        /**
         * Score strategies
         */
        if (this.scoreStrategies instanceof ScoreStrategies) {
            const scoreStrategiesAsArray = this.scoreStrategies.toArray();
            if (Object.keys(scoreStrategiesAsArray).length > 0) {
                array.score_strategies = scoreStrategiesAsArray;
            }
        }

        if (this.fuzziness !== null) {
            array.fuzziness = this.fuzziness;
        }

        /**
         * Min score
         */
        const minScore = this.minScore;
        if (minScore !== NO_MIN_SCORE) {
            array.min_score = minScore;
        }

        /**
         * User
         */
        if (this.user instanceof User) {
            array.user = this.user.toArray();
        }

        if (Object.keys(this.metadata).length > 0) {
            array.metadata = this.metadata;
        }

        if (
            this.subqueries instanceof Object &&
            Object.keys(this.subqueries).length
        ) {
            array.subqueries = {};
            for (const i in this.subqueries) {
                const subquery = this.subqueries[i];
                array.subqueries[i] = subquery.toArray();
            }
        }

        if (this.indexUUID instanceof IndexUUID) {
            array.index_uuid = this.indexUUID.toArray();
        }

        /**
         * items promoted
         */
        if (this.itemsPromoted.length > 0) {
            array.items_promoted = [];
            for (const i in this.itemsPromoted) {
                array
                    .items_promoted
                    .push(this.itemsPromoted[i].toArray());
            }
        }

        if (this.queryOperator !== "or" && this.queryOperator !== null) {
            array.query_operator = this.queryOperator;
        }

        return array;
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Query}
     */
    public static createFromArray(array: any): Query {
        const query = array.coordinate instanceof Object
            ? Query.createLocated(
                Coordinate.createFromArray(array.coordinate),
                array.q ? array.q : "",
                array.page ? array.page : QUERY_DEFAULT_PAGE,
                array.size ? array.size : QUERY_DEFAULT_SIZE,
            )
            : Query.create(
                array.q ? array.q : "",
                array.page ? array.page : QUERY_DEFAULT_PAGE,
                array.size ? array.size : QUERY_DEFAULT_SIZE,
            );

        query.UUID = typeof array.UUID === typeof ""
            ? array.UUID
            : undefined;

        /**
         * Fields
         */
        query.fields = array.fields instanceof Array
            ? array.fields
            : [];

        /**
         * Aggregations
         */
        const aggregationsAsArray = typeof array.aggregations === typeof {}
            ? array.aggregations
            : {};

        for (const i in aggregationsAsArray) {
            query.aggregations[i] = Aggregation.createFromArray(aggregationsAsArray[i]);
        }

        /**
         * Sort
         */
        const sortAsArray = typeof array.sort === typeof {}
            ? array.sort
            : {};

        if (Object.keys(sortAsArray).length > 0) {
            query.sortByInstance = SortBy.createFromArray(sortAsArray);
        }

        /**
         * Filters
         */
        const filtersAsArray = typeof array.filters === typeof {}
            ? array.filters
            : {};

        for (const i in filtersAsArray) {
            query.filters[i] = Filter.createFromArray(filtersAsArray[i]);
        }

        /**
         * Universe Filters
         */
        const universeFiltersAsArray = typeof array.universe_filters === typeof {}
            ? array.universe_filters
            : {};

        for (const i in universeFiltersAsArray) {
            query.universeFilters[i] = Filter.createFromArray(universeFiltersAsArray[i]);
        }

        /**
         * Booleans
         */
        query.resultsEnabled = typeof array.results_enabled === "boolean"
            ? array.results_enabled
            : true;

        query.numberOfSuggestions = typeof array.number_of_suggestions === "number"
            ? array.number_of_suggestions
            : 0;

        query.autocompleteEnabled = typeof array.autocomplete_enabled === "boolean"
            ? array.autocomplete_enabled
            : false;

        query.aggregationsEnabled = typeof array.aggregations_enabled === "boolean"
            ? array.aggregations_enabled
            : true;

        query.highlightsEnabled = typeof array.highlight_enabled === "boolean"
            ? array.highlight_enabled
            : false;

        query.fuzziness = array.fuzziness ? array.fuzziness : null;
        query.minScore = array.min_score ? array.min_score : NO_MIN_SCORE;

        /**
         * Items promoted
         */
        const itemsPromotedAsArray = typeof array.items_promoted === typeof {}
            ? array.items_promoted
            : {};

        for (const i in itemsPromotedAsArray) {
            query
                .itemsPromoted
                .push(ItemUUID.createFromArray(itemsPromotedAsArray[i]));
        }

        /**
         * Subqueries
         */
        const subqueriesAsArray = typeof array.subqueries === typeof {}
            ? array.subqueries
            : {};

        for (const i in subqueriesAsArray) {
            query.subqueries[i] = Query.createFromArray(subqueriesAsArray[i]);
        }

        /**
         * Filter fields
         */
        query.metadata = typeof array.metadata === typeof {}
            ? array.metadata
            : {};

        query.searchableFields = array.searchable_fields instanceof Array
            ? array.searchable_fields
            : [];

        query.scoreStrategies = array.score_strategies instanceof Object
            ? ScoreStrategies.createFromArray(array.score_strategies)
            : undefined;

        query.user = array.user instanceof Object
            ? User.createFromArray(array.user)
            : undefined;

        query.indexUUID = array.index_uuid instanceof Object
            ? IndexUUID.createFromArray(array.index_uuid)
            : undefined;

        query.queryOperator = typeof array.query_operator === "string"
            ? array.query_operator
            : "or";

        return query;
    }
}
