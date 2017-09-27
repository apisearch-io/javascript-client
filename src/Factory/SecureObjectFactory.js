const ItemUUID = require("../Query/ItemUUID").ItemUUID;
const Coordinate = require("../Query/Coordinate").Coordinate;
const CoordinateAndDistance = require("../Geo/CoordinateAndDistance").CoordinateAndDistance;
const Square = require("../Geo/Square").Square;
const Polygon = require("../Geo/Polygon").Polygon;

/**
 * SecureObjectFactory class.
 */
class SecureObjectFactory {
    static uuid(id, type) {
        return new ItemUUID(
            id,
            type
        );
    };

    static coordinate(lat, lon) {
        return new Coordinate(
            lat,
            lon
        )
    }

    static coordinateAndDistance(
        coordinate,
        distance
    ) {
        return new CoordinateAndDistance(
            coordinate,
            distance
        )
    }

    static square(
        topLeftCoordinate,
        bottomRightCoordinate
    ) {
        return new Square(
            topLeftCoordinate,
            bottomRightCoordinate
        )
    }

    static polygon(...coordinates) {
        return new Polygon(...coordinates);
    }
}

module.exports.SecureObjectFactory = SecureObjectFactory;