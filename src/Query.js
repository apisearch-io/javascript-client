import Aggregation from "./Aggregation";
import Filter, {FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD} from "./Filter";
import {AGGREGATION_NO_LIMIT, AGGREGATION_SORT_BY_COUNT_DESC} from "./Aggregation";
import {checkCoordinateTypes} from "./Coordinate";

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
        this.user = params.user;
        this.coordinate = checkCoordinateTypes(params.coordinate);
        this.coordinate = params.coordinate;

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
}