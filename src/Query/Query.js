import ItemUUID from "./ItemUUID";
import Coordinate from "./Coordinate";
import TypeChecker from "../TypeChecker";
import User from "./User";
import Aggregation from "./Aggregation";
import Filter from './Filter';
import AbstractLocationRange from "../Geo/AbstractLocationRange";

import {SORT_BY_SCORE} from "./SortBy";

import {
    FILTER_AT_LEAST_ONE,
    FILTER_EXCLUDE,
    FILTER_TYPE_DATE_RANGE,
    FILTER_TYPE_FIELD,
    FILTER_TYPE_GEO,
    FILTER_TYPE_RANGE
} from "./Filter";
import {
    AGGREGATION_NO_LIMIT,
    AGGREGATION_SORT_BY_COUNT_DESC
} from "./Aggregation";

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

    setQueryText(text) {
        this.q = text;

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
        TypeChecker.isArray(values);
        TypeChecker.isArray(aggregationSort);

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

    filterByTypes(
        values,
        aggregate = true,
        aggregationSort = AGGREGATION_SORT_BY_COUNT_DESC
    ) {
        TypeChecker.isArray(values);

        let fieldPath = Filter.getFilterPathByField('type');
        if (values.length !== 0) {
            this.filters = {
                ...this.filters,
                ['type']: new Filter(
                    fieldPath,
                    values,
                    FILTER_AT_LEAST_ONE,
                    FILTER_TYPE_FIELD
                )
            }
        } else {
            delete this.filters['type']
        }

        if (aggregate) {
            this.aggregations = {
                ...this.aggregations,
                ['type']: new Aggregation(
                    'type',
                    fieldPath,
                    FILTER_AT_LEAST_ONE,
                    FILTER_TYPE_FIELD,
                    [],
                    aggregationSort
                )
            }
        }

        return this;
    }

    filterByIds(values) {
        TypeChecker.isArray(values);

        let fieldPath = Filter.getFilterPathByField('id');
        if (values.length !== 0) {
            this.filters = {
                ...this.filters,
                ['id']: new Filter(
                    fieldPath,
                    values,
                    FILTER_AT_LEAST_ONE,
                    FILTER_TYPE_FIELD
                )
            }
        } else {
            delete this.filters['id']
        }

        return this;
    }

    filterByRange(
        filterName,
        field,
        options,
        values,
        applicationType = FILTER_AT_LEAST_ONE,
        rangeType = FILTER_TYPE_RANGE,
        aggregate = true,
        aggregationSort = AGGREGATION_SORT_BY_COUNT_DESC
    ) {
        TypeChecker.isArray(options);
        TypeChecker.isArray(values);

        let fieldPath = Filter.getFilterPathByField(field);
        if (values.length !== 0) {
            this.filters = {
                ...this.filters,
                [filterName]: new Filter(
                    fieldPath,
                    values,
                    applicationType,
                    rangeType
                )
            }
        } else {
            delete this.filters[filterName]
        }

        if (aggregate) {
            this.aggregateByRange(
                filterName,
                fieldPath,
                options,
                applicationType,
                rangeType,
                aggregationSort
            )
        }

        return this;
    }

    filterByDateRange(
        filterName,
        field,
        options,
        values,
        applicationType = FILTER_AT_LEAST_ONE,
        aggregate = true,
        aggregationSort = AGGREGATION_SORT_BY_COUNT_DESC
    ) {
        return this.filterByRange(
            filterName,
            field,
            options,
            values,
            applicationType,
            FILTER_TYPE_DATE_RANGE,
            aggregate,
            aggregationSort
        );
    }

    filterUniverseBy(
        field,
        values,
        applicationType = FILTER_AT_LEAST_ONE
    ) {
        TypeChecker.isArray(values);

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

    filterUniverseByTypes(values) {
        TypeChecker.isArray(values);

        let fieldPath = Filter.getFilterPathByField('type');
        if (values.length !== 0) {
            this.universe_filters = {
                ...this.universe_filters,
                ['type']: new Filter(
                    fieldPath,
                    values,
                    FILTER_AT_LEAST_ONE,
                    FILTER_TYPE_FIELD
                )
            }
        } else {
            delete this.universe_filters['type']
        }

        return this;
    }

    filterUniverseByIds(values) {
        TypeChecker.isArray(values);

        let fieldPath = Filter.getFilterPathByField('id');
        if (values.length !== 0) {
            this.universe_filters = {
                ...this.universe_filters,
                ['id']: new Filter(
                    fieldPath,
                    values,
                    FILTER_AT_LEAST_ONE,
                    FILTER_TYPE_FIELD
                )
            }
        } else {
            delete this.universe_filters['id']
        }

        return this;
    }

    filterUniverseByRange(
        field,
        values,
        applicationType = FILTER_AT_LEAST_ONE,
        rangeType = FILTER_TYPE_RANGE
    ) {
        TypeChecker.isArray(values);

        let fieldPath = Filter.getFilterPathByField(field);
        if (values.length !== 0) {
            this.universe_filters = {
                ...this.universe_filters,
                [field]: new Filter(
                    fieldPath,
                    values,
                    applicationType,
                    rangeType
                )
            }
        } else {
            delete this.universe_filters[field]
        }

        return this;
    }

    filterUniverseByDateRange(
        field,
        values,
        applicationType = FILTER_AT_LEAST_ONE
    ) {
        return this.filterUniverseByRange(
            field,
            values,
            applicationType,
            FILTER_TYPE_DATE_RANGE
        );
    }

    filterUniverseByLocation(locationRange) {
        TypeChecker.isObjectTypeOf(locationRange, AbstractLocationRange);

        this.universe_filters = {
            ...this.universe_filters,
            ['coordinate']: new Filter(
                'coordinate',
                locationRange.toFilterObject(),
                FILTER_AT_LEAST_ONE,
                FILTER_TYPE_GEO
            )
        };

        return this;
    }

    setFilterFields(fields) {
        TypeChecker.isArray(fields);

        if (fields.length === 0) {
            this.filter_fields = [...fields];

            return this;
        }

        fields.map(field => {
            this.filter_fields = [
                ...this.filter_fields,
                field
            ]
        });

        return this;
    }

    sortBy(sort) {
        TypeChecker.isDefined(sort);

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

    aggregateBy(
        filterName,
        field,
        applicationType,
        aggregationSort = AGGREGATION_SORT_BY_COUNT_DESC,
        limit = AGGREGATION_NO_LIMIT
    ) {
        TypeChecker.isDefined(applicationType);
        TypeChecker.isInteger(applicationType);

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

    aggregateByRange(
        filterName,
        field,
        options,
        applicationType,
        rangeType = FILTER_TYPE_RANGE,
        aggregationSort = AGGREGATION_SORT_BY_COUNT_DESC,
        limit = AGGREGATION_NO_LIMIT
    ) {
        TypeChecker.isArray(options);

        if (options.length === 0) {
            return this;
        }

        this.aggregations = {
            ...this.aggregations,
            [filterName]: new Aggregation(
                filterName,
                Filter.getFilterPathByField(field),
                applicationType,
                rangeType,
                aggregationSort,
                limit
            )
        };

        return this;
    }

    aggregateByDateRange(
        filterName,
        field,
        options,
        applicationType,
        aggregationSort = AGGREGATION_SORT_BY_COUNT_DESC,
        limit = AGGREGATION_NO_LIMIT
    ) {
        TypeChecker.isArray(options);

        if (options.length === 0) {
            return this;
        }

        this.aggregations = {
            ...this.aggregations,
            [filterName]: new Aggregation(
                filterName,
                Filter.getFilterPathByField(field),
                applicationType,
                FILTER_TYPE_DATE_RANGE,
                aggregationSort,
                limit
            )
        };

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

    promoteUUIDs(...uuids) {
        uuids.forEach(uuid => this.promoteUUID(uuid));

        return this;
    }

    excludeUUID(itemUUID) {
        TypeChecker.isObjectTypeOf(itemUUID, ItemUUID);
        this.excludeUUIDs(itemUUID);

        return this;
    }

    excludeUUIDs(...uuids) {
        this.filters = {
            ...this.filters,
            ['excluded_ids']: new Filter(
                '_id',
                uuids.map(uuid => uuid.composedUUID()),
                FILTER_EXCLUDE,
                FILTER_TYPE_FIELD
            )
        };

        return this;
    }

    byUser(user) {
        TypeChecker.isObjectTypeOf(user, User);
        this.user = user;

        return this;
    }

    anonymously() {
        this.user = null;

        return null;
    }
}