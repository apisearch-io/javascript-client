import AbstractLocationRange from "./AbstractLocationRange";
import Coordinate from "../Query/Coordinate";
import TypeChecker from "../TypeChecker";

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
}