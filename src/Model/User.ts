import {InvalidFormatError} from "../Error/InvalidFormatError";

/**
 * User class
 */
export class User {

    private id: string;
    private attributes: {};

    /**
     * Construct
     *
     * @param id string
     * @param attributes Array
     */
    constructor(id: string,
                attributes: Object = {}) {
        this.id = id;
        this.attributes = attributes;
    }

    /**
     * Return the user id
     *
     * @return {string}
     */
    public getId(): string {
        return this.id;
    }

    /**
     * Return array
     *
     * @returns {{}}
     */
    public getAttributes(): {} {
        return this.attributes;
    }

    /**
     * To array
     *
     * @returns {{id: string, attributes: {}}}
     */
    public toArray(): {
        id: string,
        attributes?: {},
    } {
        const array: {
            id: string,
            attributes?: {},
        } = {
            id: this.id,
        };

        if (Object.keys(this.attributes).length > 0) {
            array.attributes = this.attributes;
        }

        return array;
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @return User
     */
    public static createFromArray(array: any) {
        if (
            array == null ||
            typeof array.id == "undefined" ||
            array.id == null
        ) {
            throw InvalidFormatError.userFormatNotValid();
        }

        const attributes = typeof array.attributes === typeof {}
            ? array.attributes
            : {};

        return new User(
            array.id,
            attributes,
        );
    }
}
