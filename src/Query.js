import Aggregation from "./Aggregation";
import Filter, {
    FILTER_AT_LEAST_ONE,
    FILTER_EXCLUDE,
    FILTER_IT_DOESNT_MATTER,
    FILTER_TYPE_FIELD
} from "./Filter";
import {
    AGGREGATION_NO_LIMIT,
    AGGREGATION_SORT_BY_COUNT_DESC
} from "./Aggregation";
import ItemUUID from "./ItemUUID";
import Coordinate from "./Coordinate";
import {SORT_BY_SCORE} from "./SortBy";

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
    constructor(params) {
        this.q = params.q;
        this.universe_filters = params.universe_filters || [];
        this.filters = params.filters || [];
        this.items_promoted = params.items_promoted || [];
        this.aggregations = params.aggregations || [];
        this.page = params.aggregations || QUERY_DEFAULT_PAGE;
        this.size = params.size || QUERY_DEFAULT_SIZE;
        this.from = params.from || QUERY_DEFAULT_FROM;
        this.aggregations_enabled = params.aggregations_enabled || true;
        this.suggestions_enabled = params.suggestions_enabled || false;
        this.highlight_enabled = params.highlight_enabled || false;
        this.filter_fields = params.filter_fields || [];
        this.user = params.user || null;
        this.coordinate = (typeof params.coordinate !== 'undefined')
            ? new Coordinate(
                params.coordinate.lat,
                params.coordinate.lon
            ) : null
        ;
        this.sortBy(SORT_BY_SCORE);

        return this;
    }

    filterBy(
        filterName,
        field,
        values,
        applicationType = FILTER_AT_LEAST_ONE,
        aggregate = true,
        aggregationSort = AGGREGATION_SORT_BY_COUNT_DESC
    ) {
        if (typeof values !== 'object') {
            throw new Error(`values must be type of "array", "${typeof values}" given.`);
        }
        if (typeof aggregationSort !== 'object') {
            throw new Error(`values must be type of "array", "${typeof aggregationSort}" given.`);
        }

        let fieldPath = Filter.getFilterPathByField(field);
        if (values.length !== 0) {
            this.filters = {
                ...this.filters,
                [filterName]: new Filter(
                    fieldPath,
                    values,
                    applicationType,
                    FILTER_TYPE_FIELD
                )
            }
        } else {
            delete this.filters[field]
        }

        if (aggregate) {
            this.aggregateBy(
                filterName,
                field,
                applicationType,
                aggregationSort
            )
        }

        return this;
    }

    filterUniverseBy(
        field,
        values,
        applicationType = FILTER_AT_LEAST_ONE
    ) {
        if (typeof values !== 'object') {
            throw new Error(`values must be type of "array", "${typeof values}" given.`);
        }

        let fieldPath = Filter.getFilterPathByField(field);
        if (values.length !== 0) {
            this.universe_filters = {
                ...this.universe_filters,
                [field]: new Filter(
                    fieldPath,
                    values,
                    applicationType,
                    FILTER_TYPE_FIELD
                )
            }
        } else {
            delete this.universe_filters[field]
        }

        return this;
    }

    aggregateBy(
        filterName,
        field,
        applicationType,
        aggregationSort = AGGREGATION_SORT_BY_COUNT_DESC,
        limit = AGGREGATION_NO_LIMIT
    ) {
        this.aggregations = {
            ...this.aggregations,
            [filterName]: new Aggregation(
                filterName,
                Filter.getFilterPathByField(field),
                applicationType,
                FILTER_TYPE_FIELD,
                [],
                aggregationSort,
                limit
            )
        };

        return this;
    }

    sortBy(sort) {
        if (typeof sort === 'undefined') {
            throw new Error(`sortBy() parameter cannot be undefined.`);
        }
        if (typeof sort['_geo_distance'] !== 'undefined') {
            if (this.coordinate instanceof Coordinate === false) {
                throw new Error(`
                    In order to be able to sort by coordinates, you need to 
                    create a Query by using apisearch.query.createLocated(...) 
                    instead of apisearch.query.create(...)
                `);
            }
            this.sort = {
                ['_geo_distance']: {
                    ['coordinate']: this.coordinate,
                    ['order']: sort._geo_distance.order,
                    ['unit']: sort._geo_distance.unit
                }
            };
        } else {
            Object.keys(sort).map(field => {
                let direction = sort[field].order;
                this.sort = {
                    [field]: {
                        ['order']: direction
                    }
                };
            });
        }

        return this;
    }

    enableAggregations() {
        this.aggregations_enabled = true;
        return this;
    }

    disableAggregations() {
        this.aggregations_enabled = false;
        return this;
    }

    enableSuggestions() {
        this.suggestions_enabled = true;
        return this;
    }

    disableSuggestions() {
        this.suggestions_enabled = false;
        return this;
    }

    enableHighlights() {
        this.highlight_enabled = true;
        return this;
    }

    disableHighlights() {
        this.highlight_enabled = false;
        return this;
    }

    promoteUUID(itemUUID) {
        if (itemUUID instanceof ItemUUID === false) {
            throw new Error(`Excluded item must be type "ItemUUID", "${itemUUID.constructor.name}" given.`);
        }
        this.items_promoted = [
            ...this.items_promoted,
            itemUUID
        ];

        return this;
    }

    promoteUUIDs(uuids) {
        [...uuids].forEach(uuid => this.promoteUUID(uuid));

        return this;
    }

    excludeUUID(itemUUID) {
        if (itemUUID instanceof ItemUUID === false) {
            throw new Error(`Excluded item must be type "ItemUUID", "${itemUUID.constructor.name}" given.`);
        }
        this.excludeUUIDs([itemUUID]);

        return this;
    }

    excludeUUIDs(uuids) {
        this.filters = {
            ...this.filters,
            ['excluded_ids']: new Filter(
                '_id',
                [...uuids].map(uuid => uuid.composedUUID()),
                FILTER_EXCLUDE,
                FILTER_TYPE_FIELD
            )
        };

        return this;
    }
}