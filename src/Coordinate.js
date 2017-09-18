/**
 * Coordinate Type cast
 * @param coordinate
 */
export const checkCoordinateTypes = (coordinate) => {
    if (typeof coordinate === 'undefined') {
        return coordinate;
    }
    if (typeof coordinate !== 'object') {
        throw new Error(`Coordinates must be typo of object, "${typeof coordinate}" given.`);
    }
    if (
        typeof coordinate.lat !== 'undefined' &&
        typeof coordinate.lon !== 'undefined'
    ) {
        return coordinate;
    }

    throw new Error('Not valid coordinates object type given.');
};