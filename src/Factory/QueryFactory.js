import Query, {
    QUERY_DEFAULT_PAGE,
    QUERY_DEFAULT_SIZE,
    QUERY_INFINITE_SIZE
} from "../Query/Query";

import Filter, {
    FILTER_AT_LEAST_ONE,
    FILTER_TYPE_FIELD
} from "../Query/Filter";


/**
 * QueryFactory class
 */
export default class QueryFactory {
    static create(
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
    }

    static createMatchAll() {
        return new Query({
            q: '',
            page: QUERY_DEFAULT_PAGE,
            size: QUERY_INFINITE_SIZE
        });
    }

    static createLocated(
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
    }

    static createByUUID(uuid) {
        return this.createByUUIDs(uuid);
    }

    static createByUUIDs(...uuids) {
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
}