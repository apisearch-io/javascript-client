import ItemUUID from "../Query/ItemUUID";
import Coordinate from "../Query/Coordinate";
import CoordinateAndDistance from "../Geo/CoordinateAndDistance";
import Square from "../Geo/Square";
import Polygon from "../Geo/Polygon";

/**
 * SecureObjectFactory class.
 */
export default class SecureObjectFactory {
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