/**
 * filter constants
 */
export declare const TYPE_VALUE = 1;
export declare const TYPE_LITERAL = 4;
export declare const TYPE_ARRAY_ELEMENT_UPDATE = 8;
export declare const TYPE_ARRAY_ELEMENT_ADD = 16;
export declare const TYPE_ARRAY_ELEMENT_DELETE = 32;
export declare const TYPE_ARRAY_EXPECTS_ELEMENT = 24;
export declare const TYPE_ARRAY = 56;
/**
 * Changes Type cast
 * @param Changes
 */
export declare class Changes {
    /**
     * Changes
     *
     * @type {Array}
     */
    changes: any[];
    /**
     * Add new change
     *
     * @param field
     * @param value
     * @param type
     */
    addChange(field: string, value: string, type?: number): void;
    /**
     * Update element from list
     *
     * @param field
     * @param condition
     * @param value
     * @param type
     */
    updateElementFromList(field: string, condition: string, value: string, type: number): void;
    /**
     * Add element in list
     *
     * @param field
     * @param value
     * @param type
     */
    addElementInList(field: string, value: string, type: number): void;
    /**
     * Delete element from list
     *
     * @param field
     * @param condition
     */
    deleteElementFromList(field: string, condition: string): void;
    /**
     * Get changes
     *
     * @returns {[]}
     */
    getChanges(): any[];
    /**
     * Create
     *
     * @returns {Changes}
     */
    static create(): Changes;
    /**
     * To array
     *
     * @returns {[]}
     */
    toArray(): Object;
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Changes}
     */
    static createFromArray(array: any): Changes;
}
