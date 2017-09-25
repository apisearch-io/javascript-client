import ItemUUID from "./Query/ItemUUID";
import Coordinate from "./Query/Coordinate";
import HttpRepository from "./Repository/HttpRepository";
import CoordinateAndDistance from "./Geo/CoordinateAndDistance";
import Square from "./Geo/Square";
import Polygon from "./Geo/Polygon";

import Query, {
    QUERY_DEFAULT_PAGE,
    QUERY_DEFAULT_SIZE,
    QUERY_INFINITE_SIZE
} from "./Query/Query";

import Filter, {
    FILTER_AT_LEAST_ONE,
    FILTER_TYPE_FIELD
} from "./Query/Filter";
import AbstractLocationRange from "./Geo/AbstractLocationRange";

/**
 * Entry point for the Apisearch client
 *
 * @param apiKey
 * @param endpoint
 *
 * @returns {Apisearch}
 */
module.exports = function(apiKey, endpoint) {
    if (typeof apiKey === 'undefined') {
       throw new TypeError(`ApiKey parameter must be defined.`)
    }

    return new Apisearch(
        'apisearch-app-id',
        apiKey,
        endpoint
    );
};

/**
 * Apisearch class
 */
class Apisearch {
    constructor(appId, apiKey, endpoint) {
        this.appId = appId;
        this.apiKey = apiKey;
        this.endpoint = endpoint || 'http://127.0.0.1:9002/app.php';

        this.cache = {};
        this.query = QueryFactory;
    }

    search(query, callback) {
        let repository = new HttpRepository(
            this.endpoint,
            this.apiKey
        );

        return repository
            .query(query)
            .then(
                response => callback(response, null)
            )
            .catch(
                error => callback(null, error)
            )
        ;
    }

    createUUID(id, type) {
        return new ItemUUID(
            id,
            type
        );
    };

    createCoordinate(lat, lon) {
        return new Coordinate(
            lat,
            lon
        )
    }

    createCoordinateAndDistance(
        coordinate,
        distance
    ) {
        return new CoordinateAndDistance(
            coordinate,
            distance
        )
    }

    createSquare(
        topLeftCoordinate,
        bottomRightCoordinate
    ) {
        return new Square(
            topLeftCoordinate,
            bottomRightCoordinate
        )
    }

    createPolygon(...coordinates) {
        return new Polygon(...coordinates);
    }
}

/**
 * QueryFactory class
 */
class QueryFactory {
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