const AbstractLocationRange = require("./AbstractLocationRange").AbstractLocationRange;
const Coordinate = require("../Query/Coordinate").Coordinate;
const TypeChecker = require("../TypeChecker").TypeChecker;

class Polygon extends AbstractLocationRange {
    constructor(...coordinates) {
        super();

        if (coordinates.length < 3) {
            throw new Error(`A polygon needs more than two coordinates.`);
        }

        this.coordinates = coordinates.map(coordinate => {
            TypeChecker.isObjectTypeOf(coordinate, Coordinate);

            return coordinate;
        });

        return this;
    }

    toFilterObject() {
        return {
            type: this.constructor.name,
            data: this.coordinates
        }
    }
}

module.exports.Polygon = Polygon;