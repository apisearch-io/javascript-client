import {InvalidFormatError} from "../Error/InvalidFormatError";

/**
 * IndexUUID class
 */
export class IndexUUID {

    private id: string;

    /**
     * Constructor
     *
     * @param id
     */
    constructor(id: string) {
        if (id.indexOf('_') >= 0) {
            throw InvalidFormatError.indexUUIDFormatNotValid();
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
    public static createById(id: string): IndexUUID {
        return new IndexUUID(id);
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
    public static createFromArray(array: {id: string}): IndexUUID {
        array = JSON.parse(JSON.stringify(array));
        return new IndexUUID(
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
