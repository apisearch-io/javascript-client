import {ErrorWithMessage} from "./ErrorWithMessage";

/**
 * Class InvalidFormatError
 */
export class InvalidFormatError extends ErrorWithMessage {

    /**
     * Get transportable http error
     *
     * @return {number}
     */
    public static getTransportableHTTPError() {
        return 400;
    }

    /**
     * Item representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static itemRepresentationNotValid() {
        return new InvalidFormatError("Item representation not valid. Expecting Item array serialized but found malformed data");
    }

    /**
     * Item UUID representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static itemUUIDRepresentationNotValid() {
        return new InvalidFormatError("Item UUID representation not valid. Expecting UUID array serialized but found malformed data");
    }

    /**
     * Create Composed UUID bad format.
     *
     * @return {InvalidFormatError}
     */
    public static composedItemUUIDNotValid() {
        return new InvalidFormatError("A composed UUID should always follow this format: {id}~{type}.");
    }

    /**
     * Create Query sorted by distance without coordinate.
     *
     * @return {InvalidFormatError}
     */
    public static querySortedByDistanceWithoutCoordinate() {
        return new InvalidFormatError("In order to be able to sort by coordinates, you need to create a Query by using Query::createLocated() instead of Query::create()");
    }

    /**
     * Query representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static queryFormatNotValid() {
        return new InvalidFormatError("Query Format not valid. Expecting a Query serialized but found malformed data");
    }

    /**
     * Coordinate representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static coordinateFormatNotValid() {
        return new InvalidFormatError("A Coordinate should always contain a lat (Latitude) and a lon (Longitude)");
    }

    /**
     * Config representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static configFormatNotValid() {
        return new InvalidFormatError("Config Format not valid. Expecting a Config serialized but found malformed data");
    }

    /**
     * Token representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static tokenFormatNotValid() {
        return new InvalidFormatError("Token Format not valid. Expecting a Token serialized but found malformed data");
    }

    /**
     * Index format not valid.
     *
     * @return {InvalidFormatError}
     */
    public static indexFormatNotValid() {
        return new InvalidFormatError('Index Format not valid. Expecting an Index serialized but found malformed data');
    }

    /**
     * IndexUUI format not valid.
     *
     * @return {InvalidFormatError}
     */
    public static indexUUIDFormatNotValid() {
        return new InvalidFormatError('IndexUUID Format not valid. Expecting an IndexUUID serialized but found malformed data');
    }

    /**
     * App format not valid.
     *
     * @return {InvalidFormatError}
     */
    public static appUUIDFormatNotValid() {
        return new InvalidFormatError('AppUUID Format not valid. Expecting an AppUUID serialized but found malformed data');
    }

    /**
     * Campaign representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static campaignFormatNotValid() {
        return new InvalidFormatError("Campaign Format not valid. Expecting a Campaign serialized but found malformed data");
    }

    /**
     * Changes representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static changesFormatNotValid() {
        return new InvalidFormatError("Changes Format not valid. Expecting a Changes serialized but found malformed data");
    }

    /**
     * Boost clause representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static boostClauseFormatNotValid() {
        return new InvalidFormatError("Boost clause Format not valid. Expecting a Boost clause serialized but found malformed data");
    }

    /**
     * token uuid representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static tokenUUIDFormatNotValid() {
        return new InvalidFormatError("Token UUID Format not valid. Expecting a TokenUUID serialized but found malformed data");
    }

    /**
     * User representation not valid
     *
     * @return {InvalidFormatError}
     */
    public static userFormatNotValid() {
        return new InvalidFormatError("User Format not valid. Expecting a User serialized but found malformed data");
    }
}
