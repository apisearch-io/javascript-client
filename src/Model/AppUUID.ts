import {InvalidFormatError} from "../Error/InvalidFormatError";

/**
 * AppUUID class
 */
export class AppUUID {

    private id: string;

    /**
     * Constructor
     *
     * @param id
     */
    constructor(id: string) {
        if (id.indexOf('_') >= 0) {
            throw InvalidFormatError.appUUIDFormatNotValid();
        }
        this.id = id;
    }

    /**
     * Create by id
     *
     * @param id
     *
     * @returns {ItemUUID}
     */
    public static createById(id: string): AppUUID {
        return new AppUUID(id);
    }

    /**
     * Return id
     *
     * @returns {string}
     */
    public getId(): string {
        return this.id;
    }

    /**
     * To array
     *
     * @returns {{id: *, type: *}}
     */
    public toArray(): {
        id: string,
    } {
        return {
            id: this.id,
        };
    }

    /**
     * Create from array
     *
     * @param array {{id:string, type:string}}
     *
     * @return {ItemUUID}
     */
    public static createFromArray(array: {id: string}): AppUUID {
        array = JSON.parse(JSON.stringify(array));
        return new AppUUID(
            array.id
        );
    }

    /**
     * Compose unique id
     *
     * @returns {string}
     */
    public composedUUID(): string {
        return this.id;
    }
}
