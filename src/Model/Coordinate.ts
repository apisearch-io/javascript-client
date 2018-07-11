import {InvalidFormatError} from "../Error/InvalidFormatError";

/**
 * Coordinate Type cast
 * @param coordinate
 */
export class Coordinate {

    private lat: number;
    private lon: number;

    /**
     * Constructor
     *
     * @param {number} lat
     * @param {number} lon
     */
    constructor(lat: number,
                lon: number) {
        this.lat = lat;
        this.lon = lon;
    }

    /**
     * Get latitude
     *
     * @return float
     */
    public getLatitude(): number {
        return this.lat;
    }

    /**
     * Get longitude
     *
     * @return float
     */
    public getLongitude(): number {
        return this.lon;
    }

    /**
     * To array
     *
     * @return {{lat: number, lon: number}}
     */
    public toArray(): {
        lat: number,
        lon: number,
    } {
        return {
            lat: this.lat,
            lon: this.lon,
        };
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @return Coordinate
     *
     * @throws InvalidFormatError
     */
    public static createFromArray(array: any) {

        if (
            typeof array.lat == "undefined" ||
            typeof array.lon == "undefined"
        ) {
            throw InvalidFormatError.coordinateFormatNotValid();
        }

        return new Coordinate(
            array.lat,
            array.lon,
        );
    }
}
