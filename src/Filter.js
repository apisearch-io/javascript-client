/**
 * filter constants
 */
export const FILTER_MUST_ALL = 4;
export const FILTER_MUST_ALL_WITH_LEVELS = 5;
export const FILTER_AT_LEAST_ONE = 8;
export const FILTER_EXCLUDE = 16;
export const FILTER_PROMOTE = 32;
export const FILTER_TYPE_FIELD = 'field';
export const FILTER_TYPE_RANGE = 'range';
export const FILTER_TYPE_DATE_RANGE = 'date_range';
export const FILTER_TYPE_GEO = 'geo';
export const FILTER_TYPE_QUERY = 'query';

/**
 * Filter class
 */
export default class Filter {
    constructor(
        field,
        values,
        applicationType,
        filterType,
        filterTerms = []
    ) {
        this.field = field;
        this.values = values;
        this.application_type = applicationType;
        this.filter_type = filterType;
        this.filter_terms = filterTerms;

        return this;
    }

    static getFilterPathByField(field) {
        return (['id', 'type'].indexOf(field) > -1)
            ? `uuid.${field}`
            : `indexed_metadata.${field}`
        ;
    }
}