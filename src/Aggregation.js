/**
 * Aggregation constants
 */
export const AGGREGATION_SORT_BY_COUNT_ASC = ['_count', 'asc'];
export const AGGREGATION_SORT_BY_COUNT_DESC = ['_count', 'desc'];
export const AGGREGATION_SORT_BY_NAME_ASC = ['_term', 'asc'];
export const AGGREGATION_SORT_BY_NAME_DESC = ['_term', 'desc'];
export const AGGREGATION_NO_LIMIT = 0;

/**
 * Aggregation class
 */
export default class Aggregation {
    constructor(
        name,
        field,
        applicationType,
        filterType,
        subgroup,
        sort = AGGREGATION_SORT_BY_COUNT_DESC,
        limit = AGGREGATION_NO_LIMIT
    ) {
        this.name = name;
        this.field = field;
        this.applicationType = applicationType;
        this.filterType = filterType;
        this.subgroup = subgroup;
        this.sort = sort;
        this.limit = limit;
    }
}