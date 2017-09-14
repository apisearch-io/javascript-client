/**
 * Query class
 */
class Query {
    constructor(queryText) {
        console.log(queryText)
    }

    static create(queryText) {
        return new this(queryText);
    }
}

export default Query;