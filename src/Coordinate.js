/**
 * Coordinate Type cast
 * @param coordinate
 */


export default class Coordinate {
    constructor(latitude, longitude) {
        if (
            typeof latitude === 'undefined' ||
            typeof latitude === 'undefined'
        ) {
            throw new Error(`Not valid coordinates object type given.`);
        }

        this.lat = latitude;
        this.lon = longitude;
    }
}