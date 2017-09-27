const AbstractLocationRange = require("./AbstractLocationRange").AbstractLocationRange;
const Coordinate = require("../Query/Coordinate").Coordinate;
const TypeChecker = require("../TypeChecker").TypeChecker;

class CoordinateAndDistance extends AbstractLocationRange {
    constructor(
        coordinate,
        distance
    ) {
        super();

        TypeChecker.isObjectTypeOf(coordinate, Coordinate);
        TypeChecker.isString(distance);

        this.coordinate = coordinate;
        this.distance = distance;

        return this;
    }

    toFilterObject() {
        return {
            type: this.constructor.name,
            data: {
                coordinate: this.coordinate,
                distance: this.distance
            }
        }
    }
}

module.exports.CoordinateAndDistance = CoordinateAndDistance;