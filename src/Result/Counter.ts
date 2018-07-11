import {Metadata} from "../Model/Metadata";

/**
 * Aggregation class
 */
export class Counter {

    public values: any;
    public used: boolean;
    public n: number;

    /**
     * Constructor
     *
     * @param values
     * @param used
     * @param n
     */
    constructor(
        values: any,
        used: boolean,
        n: number,
    ) {
        this.values = values;
        this.used = used;
        this.n = n;
    }

    /**
     * Get id
     *
     * @return {string|null}
     */
    public getId(): string {
        return typeof this.values.id == "string"
            ? this.values.id
            : null;
    }

    /**
     * Get name
     *
     * @return {string|null}
     */
    public getName(): string {
        return typeof this.values.name == "string"
            ? this.values.name
            : null;
    }

    /**
     * Get slug
     *
     * @return {string|null}
     */
    public getSlug(): string {
        return typeof this.values.slug == "string"
            ? this.values.slug
            : null;
    }

    /**
     * Get level
     *
     * @return {number}
     */
    public getLevel(): number {
        return typeof this.values.level == "number"
            ? this.values.level
            : 0;
    }

    /**
     * Get values
     *
     * @returns {{}}
     */
    public getValues(): any {
        return this.values;
    }

    /**
     * Is used
     *
     * @returns {boolean}
     */
    public isUsed(): boolean {
        return this.used;
    }

    /**
     * Get N
     *
     * @returns {number}
     */
    public getN(): number {
        return this.n;
    }

    /**
     * Create by active elements
     *
     * @param name
     * @param n
     * @param activeElements
     */
    public static createByActiveElements(
        name: string,
        n: number,
        activeElements: string[],
    ): Counter {
        const values = Metadata.fromMetadata(name);
        if (values == null) {
            return null;
        }

        let i = activeElements.length;
        let inActiveElements: boolean = false;
        while (i--) {
            if (activeElements[i] == values.id) {
                inActiveElements = true;
            }
        }

        return new Counter(
            values,
            inActiveElements,
            n,
        );
    }

    /**
     * To array
     *
     * @return {{}}
     */
    public toArray(): any {
        const values: any = {
            values: this.values,
            n: this.n,
        };

        if (this.used === true) {
            values.used = true;
        }

        return values;
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @return {Counter}
     */
    public static createFromArray(array: any): Counter {
        array = JSON.parse(JSON.stringify(array));

        return new Counter(
            array.values,
            (typeof array.used == "boolean")
                ? array.used
                : false,
            array.n,
        );
    }
}
