import AbstractLocationRange from "./AbstractLocationRange";
import Coordinate from "../Query/Coordinate";
import TypeChecker from "../TypeChecker";

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
}