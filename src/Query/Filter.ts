/**
 * filter constants
 */
export const FILTER_MUST_ALL = 4;
export const FILTER_MUST_ALL_WITH_LEVELS = 5;
export const FILTER_AT_LEAST_ONE = 8;
export const FILTER_EXCLUDE = 16;
export const FILTER_PROMOTE = 32;
export const FILTER_TYPE_FIELD = "field";
export const FILTER_TYPE_RANGE = "range";
export const FILTER_TYPE_DATE_RANGE = "date_range";
export const FILTER_TYPE_GEO = "geo";
export const FILTER_TYPE_QUERY = "query";

/**
 * Filter class
 */
export class Filter {

    private field: string;
    private values: any;
    private applicationType: number;
    private filterType: string;
    private filterTerms: string[];

    /**
     * Constructor
     *
     * @param field
     * @param values
     * @param applicationType
     * @param filterType
     * @param filterTerms
     */
    private constructor(field: string,
                        values: any,
                        applicationType: number,
                        filterType: string,
                        filterTerms: string[]) {
        this.field = field;
        this.values = values;
        this.applicationType = applicationType;
        this.filterType = filterType;
        this.filterTerms = filterTerms;
    }

    /**
     * Get field
     *
     * @returns {string}
     */
    public getField(): string {
        return this.field;
    }

    /**
     * Get values
     *
     * @returns {any}
     */
    public getValues(): any {
        return this.values;
    }

    /**
     * Has value
     *
     * @param value
     *
     * @returns {boolean}
     */
    public hasValue(value): boolean {
        return typeof this.values[value] == "undefined";
    }

    /**
     * getApplicationType
     *
     * @returns {number}
     */
    public getApplicationType(): number {
        return this.applicationType;
    }

    /**
     * Get filter type
     *
     * @return {string}
     */
    public getFilterType(): string {
        return this.filterType;
    }

    /**
     * Get filter type
     *
     * @return {{}}
     */
    public getFilterTerms(): string[] {
        return this.filterTerms;
    }

    /**
     * Create
     *
     * @param field
     * @param values
     * @param applicationType
     * @param filterType
     * @param filterTerms
     *
     * @return {Filter}
     */
    public static create(field: string,
                         values: any,
                         applicationType: number,
                         filterType: string,
                         filterTerms: string[] = []) {
        return new Filter(
            field,
            values,
            applicationType,
            filterType,
            filterTerms,
        );
    }

    /**
     * To array
     *
     * @returns {Array}
     */
    public toArray(): any {
        const filterAsArray: any = {};

        if (this.field != "uuid.type") {
            filterAsArray.field = this.field;
        }

        if (
            this.values.length > 0 ||
            Object.keys(this.values).length > 0
        ) {
            filterAsArray.values = this.values;
        }

        if (this.applicationType != FILTER_AT_LEAST_ONE) {
            filterAsArray.application_type = this.applicationType;
        }

        if (this.filterType != FILTER_TYPE_FIELD) {
            filterAsArray.filter_type = this.filterType;
        }

        if (this.filterTerms.length > 0) {
            filterAsArray.filter_terms = this.filterTerms;
        }

        return filterAsArray;
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Filter}
     */
    public static createFromArray(array): Filter {

        array = JSON.parse(JSON.stringify(array));
        if (typeof array.field == "undefined") {
            array.field = "uuid.type";
        }

        if (typeof array.values == "undefined") {
            array.values = [];
        }

        if (typeof array.application_type == "undefined") {
            array.application_type = FILTER_AT_LEAST_ONE;
        }

        if (typeof array.filter_type == "undefined") {
            array.filter_type = FILTER_TYPE_FIELD;
        }

        if (typeof array.filter_terms == "undefined") {
            array.filter_terms = [];
        }

        return Filter.create(
            array.field,
            array.values,
            array.application_type,
            array.filter_type,
            array.filter_terms,
        );
    }
}
