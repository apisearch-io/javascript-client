/**
 * Your code here
 */
import Query from "./Query";
import HttpRepository from "./Repository";

var apisearch = {
    repository: '',
    endpoint: '',
    secret: '',

    client: function(repository, endpoint, secret) {
        this.repository = repository;
        this.endpoint = endpoint;
        this.secret = secret;
    },
    query: function(queryText, page, size) {
        let query = new Query();
        return query.create(queryText, page, size);
    },
    search: function(query, callback) {
        let repository = new HttpRepository(
            this.endpoint,
            this.secret
        );

        return repository
            .query(query)
            .then(
                res => callback(res)
            )
        ;
    }
};
module.exports = apisearch;
