import { ErrorWithMessage } from "./ErrorWithMessage";
/**
 * Class InvalidFormatError
 */
export declare class InvalidFormatError extends ErrorWithMessage {
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    static getTransportableHTTPError(): number;
    /**
     * Item representation not valid
     *
     * @return {InvalidFormatError}
     */
    static itemRepresentationNotValid(): InvalidFormatError;
    /**
     * Item UUID representation not valid
     *
     * @return {InvalidFormatError}
     */
    static itemUUIDRepresentationNotValid(): InvalidFormatError;
    /**
     * Create Composed UUID bad format.
     *
     * @return {InvalidFormatError}
     */
    static composedItemUUIDNotValid(): InvalidFormatError;
    /**
     * Create Query sorted by distance without coordinate.
     *
     * @return {InvalidFormatError}
     */
    static querySortedByDistanceWithoutCoordinate(): InvalidFormatError;
    /**
     * Query representation not valid
     *
     * @return {InvalidFormatError}
     */
    static queryFormatNotValid(): InvalidFormatError;
    /**
     * Coordinate representation not valid
     *
     * @return {InvalidFormatError}
     */
    static coordinateFormatNotValid(): InvalidFormatError;
    /**
     * Config representation not valid
     *
     * @return {InvalidFormatError}
     */
    static configFormatNotValid(): InvalidFormatError;
    /**
     * Token representation not valid
     *
     * @return {InvalidFormatError}
     */
    static tokenFormatNotValid(): InvalidFormatError;
    /**
     * Index format not valid.
     *
     * @return {InvalidFormatError}
     */
    static indexFormatNotValid(): InvalidFormatError;
    /**
     * IndexUUI format not valid.
     *
     * @return {InvalidFormatError}
     */
    static indexUUIDFormatNotValid(): InvalidFormatError;
    /**
     * App format not valid.
     *
     * @return {InvalidFormatError}
     */
    static appUUIDFormatNotValid(): InvalidFormatError;
    /**
     * Campaign representation not valid
     *
     * @return {InvalidFormatError}
     */
    static campaignFormatNotValid(): InvalidFormatError;
    /**
     * Changes representation not valid
     *
     * @return {InvalidFormatError}
     */
    static changesFormatNotValid(): InvalidFormatError;
    /**
     * Boost clause representation not valid
     *
     * @return {InvalidFormatError}
     */
    static boostClauseFormatNotValid(): InvalidFormatError;
    /**
     * token uuid representation not valid
     *
     * @return {InvalidFormatError}
     */
    static tokenUUIDFormatNotValid(): InvalidFormatError;
    /**
     * User representation not valid
     *
     * @return {InvalidFormatError}
     */
    static userFormatNotValid(): InvalidFormatError;
}
