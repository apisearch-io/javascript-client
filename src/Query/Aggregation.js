/**
 * Aggregation constants
 */
const AGGREGATION_SORT_BY_COUNT_ASC = ['_count', 'asc'];
const AGGREGATION_SORT_BY_COUNT_DESC = ['_count', 'desc'];
const AGGREGATION_SORT_BY_NAME_ASC = ['_term', 'asc'];
const AGGREGATION_SORT_BY_NAME_DESC = ['_term', 'desc'];
const AGGREGATION_NO_LIMIT = 0;

/**
 * Aggregation class
 */
class Aggregation {
    constructor(
        name,
        field,
        applicationType,
        filterType,
        subgroup,
        sort,
        limit
    ) {
        this.name = name;
        this.field = field;
        this.applicationType = applicationType;
        this.filterType = filterType;
        this.subgroup = subgroup;
        this.sort = sort || AGGREGATION_SORT_BY_COUNT_DESC;
        this.limit = limit || AGGREGATION_NO_LIMIT;
    }
}

module.exports = {
    AGGREGATION_SORT_BY_COUNT_ASC,
    AGGREGATION_SORT_BY_COUNT_DESC,
    AGGREGATION_SORT_BY_NAME_ASC,
    AGGREGATION_SORT_BY_NAME_DESC,
    AGGREGATION_NO_LIMIT
};
module.exports.Aggregation = Aggregation;
