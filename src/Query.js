import {AT_LEAST_ONE} from './Filter';

/**
 * Query constants
 */
const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;
const INFINITE_SIZE = 1000;

class BaseQuery {
    constructor() {
        this.coordinate = null;
        this.universe_filters = [];
        this.filters = [];
        this.items_promoted = [];
        this.aggregations = [];
        this.page = null;
        this.from = null;
        this.size = null;
        this.suggesitons_enabled = false;
        this.aggregations_enabled = false;
        this.hightlights_enabled = false;
        this.filter_fields = [];
        this.user = null;
    }
}

/**
 * Query class
 */
export default class Query extends BaseQuery {
    constructor(props) {
        super(props);
    }

    /**
     * Initialize query creation
     * @param queryText
     * @param page
     * @param size
     * @returns {Query}
     */
    create(
        queryText,
        page = DEFAULT_PAGE,
        size = DEFAULT_SIZE
    ) {
        this.q = queryText;
        this.from = (page - 1) * size;
        this.page = page;
        this.size = size;

        return this;
    }

    filterUniverseBy(
        field,
        values,
        applicationType = AT_LEAST_ONE
    ) {

    }

    enableAggregations() {
        this.aggregations_enabled = true;
        return this;
    }

    disableAggregations() {
        this.aggregations_enabled = false;
        return this;
    }
}