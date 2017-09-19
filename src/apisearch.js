/**
 * Apisearch entry point
 */
import HttpRepository from "./Repository";
import ItemUUID from "./ItemUUID";
import Query, {
    QUERY_DEFAULT_PAGE,
    QUERY_DEFAULT_SIZE,
    QUERY_INFINITE_SIZE
} from "./Query";
import Filter, {
    FILTER_AT_LEAST_ONE,
    FILTER_TYPE_FIELD
} from "./Filter";

const cache = {};

const client = function(repository, endpoint, secret) {
    this.repository = repository;
    this.endpoint = endpoint;
    this.secret = secret;
};

const search = function(query, callback) {
    let repository = new HttpRepository(
        this.endpoint,
        this.secret
    );

    return repository
        .query(query)
        .then(
            response => callback(response)
        )
    ;
};

const createUUID = function(id, type) {
    return new ItemUUID(
        id,
        type
    );
};

const query =  {
    create(
        q,
        page = QUERY_DEFAULT_PAGE,
        size = QUERY_DEFAULT_SIZE
    ) {
        return new Query({
            q,
            from: (page - 1) * size,
            page,
            size
        });
    },
    createMatchAll() {
        return new Query({
            q: '',
            page: QUERY_DEFAULT_PAGE,
            size: QUERY_INFINITE_SIZE
        });
    },
    createLocated(
        coordinate,
        queryText,
        page = QUERY_DEFAULT_PAGE,
        size = QUERY_DEFAULT_SIZE
    ) {
        return new Query({
            coordinate,
            page,
            size,
            q: queryText
        });
    },
    createByUUID(uuid) {
        return this.createByUUIDs([uuid]);
    },
    createByUUIDs(uuids) {
        let ids = uuids.map(uuid => uuid.composedUUID());
        let query = new Query({
            q: '',
            page: QUERY_DEFAULT_PAGE,
            size: QUERY_INFINITE_SIZE
        });

        query
            .disableAggregations()
            .disableSuggestions();

        query.filters = {
            ...query.filters,
            ['_id']: new Filter(
                '_id',
                ids.filter(
                    (item, pos) => ids.indexOf(item) === pos
                ),
                FILTER_AT_LEAST_ONE,
                FILTER_TYPE_FIELD
            )
        };

        return query;
    }
};

module.exports = {
    cache,
    client,
    search,
    createUUID,
    query
};