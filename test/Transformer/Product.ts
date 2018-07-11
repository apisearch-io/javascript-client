export class Product {
    public id;
    public sku;
    public name;

    /**
     *
     * @param id
     * @param sku
     * @param name
     */
    constructor(id, sku, name) {
        this.id = id;
        this.sku = sku;
        this.name = name;
    }
}