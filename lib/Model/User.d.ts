/**
 * User class
 */
export declare class User {
    private id;
    private attributes;
    /**
     * Construct
     *
     * @param id string
     * @param attributes Array
     */
    constructor(id: string, attributes?: Object);
    /**
     * Return the user id
     *
     * @return {string}
     */
    getId(): string;
    /**
     * Return array
     *
     * @returns {{}}
     */
    getAttributes(): {};
    /**
     * To array
     *
     * @returns {{id: string, attributes: {}}}
     */
    toArray(): {
        id: string;
        attributes?: {};
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return User
     */
    static createFromArray(array: any): User;
}
