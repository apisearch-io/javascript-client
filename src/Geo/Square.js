const AbstractLocationRange = require("./AbstractLocationRange").AbstractLocationRange;
const Coordinate = require("../Query/Coordinate").Coordinate;
const TypeChecker = require("../TypeChecker").TypeChecker;

class Square extends AbstractLocationRange {
    constructor(
        topLeftCoordinate,
        bottomRightCoordinate
    ) {
        TypeChecker.isObjectTypeOf(topLeftCoordinate, Coordinate);
        TypeChecker.isObjectTypeOf(bottomRightCoordinate, Coordinate);

        super();

        this.topLeftCoordinate = topLeftCoordinate;
        this.bottomRightCoordinate = bottomRightCoordinate;

        return this;
    }

    toFilterObject() {
        return {
            type: this.constructor.name,
            data: {
                0: this.topLeftCoordinate,
                1: this.bottomRightCoordinate
            }
        }
    }
}

module.exports.Square = Square;