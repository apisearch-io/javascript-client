import { IndexUUID } from "./IndexUUID";
import { AppUUID } from "./AppUUID";
/**
 * Index class
 */
export declare class Index {
    private uuid;
    private appUUID;
    private isOK;
    private docCount;
    private size;
    /**
     * Constructor
     *
     * @param uuid
     * @param appUUID
     * @param isOK
     * @param docCount
     * @param size
     */
    constructor(uuid: IndexUUID, appUUID: AppUUID, isOK?: boolean, docCount?: number, size?: string);
    /**
     * Get uuid
     *
     * @return {IndexUUID}
     */
    getUUID(): IndexUUID;
    /**
     * Get app id
     *
     * @return {AppUUID}
     */
    getAppUUID(): AppUUID;
    /**
     * Index is OK
     *
     * @return {boolean}
     */
    isOk(): boolean;
    /**
     * Get doc count
     *
     * @return {number}
     */
    getDocCount(): number;
    /**
     * get size
     *
     * @return {string}
     */
    getSize(): string;
    /**
     * To array
     *
     * @returns {{id: string, attributes: {}}}
     */
    toArray(): {
        uuid: any;
        app_id: any;
        is_ok: boolean;
        doc_count: number;
        size: string;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return User
     */
    static createFromArray(array: {
        uuid: any;
        app_id: any;
        is_ok: boolean;
        doc_count: number;
        size: string;
    }): Index;
}
