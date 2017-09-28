import AbstractLocationRange from "./AbstractLocationRange";
import Coordinate from "../Query/Coordinate";
import TypeChecker from "../TypeChecker";

export default class CoordinateAndDistance extends AbstractLocationRange {
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