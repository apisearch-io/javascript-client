/**
 * AppUUID class
 */
export declare class AppUUID {
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
    static createById(id: string): AppUUID;
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
    }): AppUUID;
    /**
     * Compose unique id
     *
     * @returns {string}
     */
    composedUUID(): string;
}
