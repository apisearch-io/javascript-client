import AbstractLocationRange from "./AbstractLocationRange";
import Coordinate from "../Query/Coordinate";
import TypeChecker from "../TypeChecker";

export default class Polygon extends AbstractLocationRange {
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