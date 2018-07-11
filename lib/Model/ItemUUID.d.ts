/**
 * ItemUUID class
 */
export declare class ItemUUID {
    private id;
    private type;
    /**
     * Constructor
     *
     * @param id
     * @param type
     */
    constructor(id: string, type: string);
    /**
     * Create composed UUID
     *
     * @param composedUUID
     *
     * @returns {ItemUUID}
     */
    static createByComposedUUID(composedUUID: string): ItemUUID;
    /**
     * Return id
     *
     * @returns {string}
     */
    getId(): string;
    /**
     * Get type
     *
     * @returns {string}
     */
    getType(): string;
    /**
     * To array
     *
     * @returns {{id: *, type: *}}
     */
    toArray(): {
        id: string;
        type: string;
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
        type: string;
    }): ItemUUID;
    /**
     * Compose unique id
     *
     * @returns {string}
     */
    composedUUID(): string;
}
