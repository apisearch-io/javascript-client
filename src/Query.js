const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

/**
 * Query class
 */
export default class Query {
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
        this.page = page;
        this.size = size;

        return this;
    }
}