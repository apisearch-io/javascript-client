import AbstractLocationRange from "./AbstractLocationRange";
import Coordinate from "../Query/Coordinate";
import TypeChecker from "../TypeChecker";

class Polygon extends AbstractLocationRange {
    constructor(...coordinates) {
        super();

        this.coordinates = [...coordinates].map(coordinate => {
            TypeChecker.isObjectTypeOf(coordinate, Coordinate);

            return coordinate;
        });

        return this;
    }
}