/**
 * ItemUUID class
 */
class ItemUUID {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }

    composedUUID() {
        return `${this.type}~${this.id}`;
    }
}

module.exports.ItemUUID = ItemUUID;