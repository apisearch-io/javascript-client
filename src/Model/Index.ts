import {InvalidFormatError} from "../Error/InvalidFormatError";
import {IndexUUID} from "./IndexUUID";
import {AppUUID} from "./AppUUID";

/**
 * Index class
 */
export class Index {

    private uuid: IndexUUID;
    private appUUID: AppUUID;
    private isOK: boolean;
    private docCount: number;
    private size: string;

    /**
     * Constructor
     *
     * @param uuid
     * @param appUUID
     * @param isOK
     * @param docCount
     * @param size
     */
    constructor(
        uuid: IndexUUID,
        appUUID: AppUUID,
        isOK=false,
        docCount=0,
        size='0kb'
    ) {
        this.uuid = uuid;
        this.appUUID = appUUID;
        this.isOK = isOK;
        this.docCount = docCount;
        this.size = size;
    }

    /**
     * Get uuid
     *
     * @return {IndexUUID}
     */
    public getUUID() : IndexUUID {
        return this.uuid;
    }

    /**
     * Get app id
     *
     * @return {AppUUID}
     */
    public getAppUUID() : AppUUID {
        return this.appUUID;
    }

    /**
     * Index is OK
     *
     * @return {boolean}
     */
    public isOk() : boolean {
        return this.isOK;
    }

    /**
     * Get doc count
     *
     * @return {number}
     */
    public getDocCount() : number {
        return this.docCount;
    }

    /**
     * get size
     *
     * @return {string}
     */
    public getSize() : string {
        return this.size;
    }

    /**
     * To array
     *
     * @returns {{id: string, attributes: {}}}
     */
    public toArray(): {
        uuid: any,
        app_id: any,
        is_ok: boolean,
        doc_count: number,
        size: string
    } {
        return {
            uuid: this.uuid.toArray(),
            app_id: this.appUUID.toArray(),
            is_ok: this.isOK,
            doc_count: this.docCount,
            size: this.size
        };
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @return User
     */
    public static createFromArray(array: {
        uuid: any,
        app_id: any,
        is_ok: boolean,
        doc_count: number,
        size: string
    }) {
        if (
            typeof array.uuid == "undefined" ||
            typeof array.app_id == "undefined"
        ) {
            throw InvalidFormatError.indexFormatNotValid();
        }

        return new Index(
            IndexUUID.createFromArray(array.uuid),
            AppUUID.createFromArray(array.app_id),
            (typeof array.is_ok == "undefined" ? false : array.is_ok),
            (typeof array.doc_count == "undefined" ? 0 : array.doc_count),
            (typeof array.size == "undefined" ? '0kb' : array.size)
        );
    }
}
