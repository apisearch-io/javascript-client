/**
 * filter constants
 */
export const TYPE_VALUE = 1;
export const TYPE_LITERAL = 4;
export const TYPE_ARRAY_ELEMENT_UPDATE = 8;
export const TYPE_ARRAY_ELEMENT_ADD = 16;
export const TYPE_ARRAY_ELEMENT_DELETE = 32;
export const TYPE_ARRAY_EXPECTS_ELEMENT = 24;
export const TYPE_ARRAY = 56;

/**
 * Changes Type cast
 * @param Changes
 */
export class Changes {

    /**
     * Changes
     *
     * @type {Array}
     */
    public changes: any[] = [];

    /**
     * Add new change
     *
     * @param field
     * @param value
     * @param type
     */
    public addChange(field: string,
                     value: string,
                     type: number = TYPE_VALUE) {
        this.changes.push({
            field,
            type,
            value,
        });
    }

    /**
     * Update element from list
     *
     * @param field
     * @param condition
     * @param value
     * @param type
     */
    public updateElementFromList(field: string,
                                 condition: string,
                                 value: string,
                                 type: number) {
        this.changes.push({
            field,
            type: type | TYPE_ARRAY_ELEMENT_UPDATE,
            condition,
            value,
        });
    }

    /**
     * Add element in list
     *
     * @param field
     * @param value
     * @param type
     */
    public addElementInList(field: string,
                            value: string,
                            type: number) {
        this.changes.push({
            field,
            type: type | TYPE_ARRAY_ELEMENT_ADD,
            value,
        });
    }

    /**
     * Delete element from list
     *
     * @param field
     * @param condition
     */
    public deleteElementFromList(field: string,
                                 condition: string) {
        this.changes.push({
            field,
            type: TYPE_ARRAY_ELEMENT_DELETE,
            condition,
        });
    }

    /**
     * Get changes
     *
     * @returns {[]}
     */
    public getChanges(): any[] {
        return this.changes;
    }

    /**
     * Create
     *
     * @returns {Changes}
     */
    public static create(): Changes {
        return new Changes();
    }

    /**
     * To array
     *
     * @returns {[]}
     */
    public toArray(): Object {
        return JSON.parse(JSON.stringify(this.changes));
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Changes}
     */
    public static createFromArray(array: any): Changes {
        array = JSON.parse(JSON.stringify(array));
        const changes = Changes.create();
        changes.changes = array;

        return changes;
    }
}
