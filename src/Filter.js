/**
 * filter constants
 */
export const MUST_ALL = 4;
export const MUST_ALL_WITH_LEVELS = 5;
export const AT_LEAST_ONE = 8;
export const EXCLUDE = 16;
export const PROMOTE = 32;
export const TYPE_FIELD = 'field';
export const TYPE_RANGE = 'range';
export const TYPE_DATE_RANGE = 'date_range';
export const TYPE_GEO = 'geo';
export const TYPE_QUERY = 'query';

/**
 * Filter class
 */
export default class Filter {
    constructor(
        field,
        values,
        application_type,
        filter_type,
        filter_terms
    ) {
        this.field = field;
        this.values = filter_type !== TYPE_GEO
            ? Object.keys(values)
            : values;
        this.application_type = application_type;
        this.filter_type = filter_type;
        this.filter_terms = filter_terms;
    }

    create(
        field,
        values,
        applation_type,
        filter_type,
        filter_terms = []
    ) {
        this.field = field;
        this.values = values;
        this.applation_type = applation_type;
        this.filter_type = filter_type;
        this.filter_terms = filter_terms;

        return this;
    }
}