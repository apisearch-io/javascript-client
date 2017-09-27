/**
 * filter constants
 */
const FILTER_IT_DOESNT_MATTER = 0;
const FILTER_MUST_ALL = 4;
const FILTER_MUST_ALL_WITH_LEVELS = 5;
const FILTER_AT_LEAST_ONE = 8;
const FILTER_EXCLUDE = 16;
const FILTER_PROMOTE = 32;
const FILTER_TYPE_FIELD = 'field';
const FILTER_TYPE_RANGE = 'range';
const FILTER_TYPE_DATE_RANGE = 'date_range';
const FILTER_TYPE_GEO = 'geo';
const FILTER_TYPE_QUERY = 'query';

/**
 * Filter class
 */
class Filter {
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

module.exports = {
    FILTER_IT_DOESNT_MATTER,
    FILTER_MUST_ALL,
    FILTER_MUST_ALL_WITH_LEVELS,
    FILTER_AT_LEAST_ONE,
    FILTER_EXCLUDE,
    FILTER_PROMOTE,
    FILTER_TYPE_FIELD,
    FILTER_TYPE_RANGE,
    FILTER_TYPE_DATE_RANGE,
    FILTER_TYPE_GEO,
    FILTER_TYPE_QUERY
};
module.exports.Filter = Filter;
