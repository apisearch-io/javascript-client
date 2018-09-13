/**
 * IndexUUID class
 */
export declare class IndexUUID {
    private id;
    /**
     * Constructor
     *
     * @param id
     */
    constructor(id: string);
    /**
     * Create by id
     *
     * @param id
     *
     * @returns {ItemUUID}
     */
    static createById(id: string): IndexUUID;
    /**
     * Return id
     *
     * @returns {string}
     */
    getId(): string;
    /**
     * To array
     *
     * @returns {{id: *, type: *}}
     */
    toArray(): {
        id: string;
    };
    /**
     * Create from array
     *
     * @param array {{id:string, type:string}}
     *
     * @return {ItemUUID}
     */
    static createFromArray(array: {
        id: string;
    }): IndexUUID;
    /**
     * Compose unique id
     *
     * @returns {string}
     */
    composedUUID(): string;
}
