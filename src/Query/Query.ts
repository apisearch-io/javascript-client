import LocationRange from "../Geo/LocationRange";
import Coordinate from "../Model/Coordinate";
import ItemUUID from "../Model/ItemUUID";
import User from "../Model/User";
import Aggregation from "./Aggregation";
import Filter from "./Filter";

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

import InvalidFormatError from "../Error/InvalidFormatError";
import {FILTER_TYPE_QUERY} from "./Filter";
import ScoreStrategy from "./ScoreStrategy";
import SortBy from "./SortBy";

/**
 * Query constants
 */
export const QUERY_DEFAULT_FROM = 0;
export const QUERY_DEFAULT_PAGE = 1;
export const QUERY_DEFAULT_SIZE = 10;
export const QUERY_INFINITE_SIZE = 1000;

/**
 * Query class
 */
export default class Query {

    private coordinate: Coordinate;
    private universeFilters: any = {};
    private filters: any = {};
    private itemsPromoted: ItemUUID[] = [];
    private sortByInstance: SortBy;
    private aggregations: any;
    private page: number;
    private from: number;
    private size: number;
    private resultsEnabled: boolean;
    private aggregationsEnabled: boolean;
    private suggestionsEnabled: boolean;
    private highlightsEnabled: boolean;
    private filterFields: string[];
    private scoreStrategy: ScoreStrategy;
    private user: User;

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
     * Filter universe by types
     *
     * @param values
     *
     * @return {Query}
     */
    public filterUniverseByTypes(values: any[]): Query {
        const fieldPath = Filter.getFilterPathByField("type");
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
        const fieldPath = Filter.getFilterPathByField("type");
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
        const fieldPath = Filter.getFilterPathByField("id");
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
        const fieldPath = Filter.getFilterPathByField("id");
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
        const fieldPath = Filter.getFilterPathByField(field);
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
        const fieldPath = Filter.getFilterPathByField(field);
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
        const fieldPath = Filter.getFilterPathByField(field);
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
     * @param options
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
                  options: string[],
                  values: any[],
                  applicationType: number = FILTER_AT_LEAST_ONE,
                  rangeType: string = FILTER_TYPE_RANGE,
                  aggregate: boolean = true,
                  aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC): Query {
        const fieldPath = Filter.getFilterPathByField(field);
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
                options,
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
     * @param filterFields
     *
     * @return {Query}
     */
    public setFilterFields(filterFields: string[]): Query {
        this.filterFields = filterFields;

        return this;
    }

    /**
     * Get filter fields
     *
     * @return {string[]}
     */
    public getFilterFields(): string[] {
        return this.filterFields;
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
     *
     * @return {Query}
     */
    public aggregateBy(filterName: string,
                field: string,
                applicationType: number,
                aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC,
                limit: number = AGGREGATION_NO_LIMIT): Query {
        this.aggregations = {
            ...this.aggregations,
            [filterName]: Aggregation.create(
                filterName,
                Filter.getFilterPathByField(field),
                applicationType,
                FILTER_TYPE_FIELD,
                [],
                aggregationSort,
                limit,
            ),
        };

        return this;
    }

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
    public aggregateByRange(filterName: string,
                     field: string,
                     options: string[],
                     applicationType: number,
                     rangeType: string = FILTER_TYPE_RANGE,
                     aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC,
                     limit: number = AGGREGATION_NO_LIMIT): Query {
        if (options.length === 0) {
            return this;
        }

        this.aggregations = {
            ...this.aggregations,
            [filterName]: Aggregation.create(
                filterName,
                Filter.getFilterPathByField(field),
                applicationType,
                rangeType,
                options,
                aggregationSort,
                limit,
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
     *
     * @return {Query}
     */
    public aggregateByDateRange(filterName: string,
                         field: string,
                         options: string[],
                         applicationType: number,
                         aggregationSort: string[] = AGGREGATION_SORT_BY_COUNT_DESC,
                         limit: number = AGGREGATION_NO_LIMIT): Query {
        return this.aggregateByRange(
            filterName,
            field,
            options,
            applicationType,
            FILTER_TYPE_DATE_RANGE,
            aggregationSort,
            limit,
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
        const fieldPath = Filter.getFilterPathByField(fieldName);
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
     * Enable suggestions
     *
     * @return {Query}
     */
    public enableSuggestions(): Query {
        this.suggestionsEnabled = true;

        return this;
    }

    /**
     * Disable suggestions
     *
     * @return {Query}
     */
    public disableSuggestions(): Query {
        this.suggestionsEnabled = false;

        return this;
    }

    /**
     * Are suggestions enabled
     *
     * @return {boolean}
     */
    public areSuggestionsEnabled(): boolean {
        return this.suggestionsEnabled;
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
     * Get score strategy
     *
     * @return {ScoreStrategy}
     */
    public getScoreStrategy(): ScoreStrategy {
        return this.scoreStrategy;
    }

    /**
     * Set score strategy
     *
     * @param scoreStrategy
     */
    public setScoreStrategy(scoreStrategy: ScoreStrategy): Query {
        this.scoreStrategy = scoreStrategy;

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
     * To array
     *
     * @return {any}
     */
    public toArray(): any {
        const array: any = {};

        if (this.getQueryText() !== "") {
            array.q = this.getQueryText();
        }

        if (this.coordinate instanceof Coordinate) {
            array.coordinate = this.coordinate.toArray();
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
            array.filters = {};
            for (const i in this.filters) {
                const filter = this.filters[i];
                if (filter.getFilterType() !== FILTER_TYPE_QUERY) {
                    array.filters[i] = filter.toArray();
                }
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

        if (this.suggestionsEnabled === true) {
            array.suggestions_enabled = true;
        }

        if (this.highlightsEnabled === true) {
            array.highlights_enabled = true;
        }

        if (this.aggregationsEnabled === false) {
            array.aggregations_enabled = false;
        }

        /**
         * Filter fields
         */
        if (
            this.filterFields instanceof Array &&
            this.filterFields.length > 0
        ) {
            array.filter_fields = this.filterFields;
        }

        /**
         * Score strategy
         */
        if (this.scoreStrategy instanceof ScoreStrategy) {
            const scoreStrategyAsArray = this.scoreStrategy.toArray();
            if (Object.keys(scoreStrategyAsArray).length > 0) {
                array.score_strategy = scoreStrategyAsArray;
            }
        }

        /**
         * User
         */
        if (this.user instanceof User) {
            const userAsArray = this.user.toArray();
            if (Object.keys(userAsArray).length > 0) {
                array.user = userAsArray;
            }
        }

        /**
         * items promoted
         */
        if (this.itemsPromoted.length > 0) {
            array.items_promoted = [];
            for (const i in this.itemsPromoted) {
                array
                    .items_promoted
                    .push(this.itemsPromoted[i].toArray);
            }
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

        query.suggestionsEnabled = typeof array.suggestions_enabled === "boolean"
            ? array.suggestions_enabled
            : false;

        query.aggregationsEnabled = typeof array.aggregations_enabled === "boolean"
            ? array.aggregations_enabled
            : true;

        query.highlightsEnabled = typeof array.highlights_enabled === "boolean"
            ? array.highlights_enabled
            : false;

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
         * Filter fields
         */
        query.filterFields = array.filter_fields instanceof Array
            ? array.filter_fields
            : [];

        query.scoreStrategy = array.score_strategy instanceof Object
            ? ScoreStrategy.createFromArray(array.score_stategy)
            : null;

        query.user = array.user instanceof Object
            ? User.createFromArray(array.user)
            : null;

        return query;
    }
}
