/**
 * ItemUUID class
 */
export default class ItemUUID {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }

    composedUUID() {
        return `${this.type}~${this.id}`;
    }
}