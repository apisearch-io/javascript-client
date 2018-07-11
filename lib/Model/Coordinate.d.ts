/**
 * Coordinate Type cast
 * @param coordinate
 */
export declare class Coordinate {
    private lat;
    private lon;
    /**
     * Constructor
     *
     * @param {number} lat
     * @param {number} lon
     */
    constructor(lat: number, lon: number);
    /**
     * Get latitude
     *
     * @return float
     */
    getLatitude(): number;
    /**
     * Get longitude
     *
     * @return float
     */
    getLongitude(): number;
    /**
     * To array
     *
     * @return {{lat: number, lon: number}}
     */
    toArray(): {
        lat: number;
        lon: number;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return Coordinate
     *
     * @throws InvalidFormatError
     */
    static createFromArray(array: any): Coordinate;
}
