import {Item, Coordinate} from "..";
import {Filter} from "./Filter";

/**
 export * Sort by constants
 */
export const SORT_BY_TYPE_FIELD = 'field';
export const SORT_BY_TYPE_NESTED = 'nested';
export const SORT_BY_TYPE_SCORE = 'score';
export const SORT_BY_TYPE_DISTANCE = 'distance';
export const SORT_BY_TYPE_FUNCTION = 'function';
export const SORT_BY_TYPE_RANDOM = 'random';
export const SORT_BY_ASC = "asc";
export const SORT_BY_DESC = "desc";
export const SORT_BY_MODE_AVG = "avg";
export const SORT_BY_MODE_SUM = "sum";
export const SORT_BY_MODE_MIN = "min";
export const SORT_BY_MODE_MAX = "max";
export const SORT_BY_MODE_MEDIAN = "median";

export const SORT_BY_SCORE = {
    type: SORT_BY_TYPE_SCORE,
};
export const SORT_BY_RANDOM = {
    type: SORT_BY_TYPE_RANDOM,
};
export const SORT_BY_AL_TUN_TUN = SORT_BY_RANDOM;
export const SORT_BY_ID_ASC = {
    field: "uuid.id",
    order: SORT_BY_ASC
};
export const SORT_BY_ID_DESC = {
    field: "uuid.id",
    order: SORT_BY_DESC
};
export const SORT_BY_TYPE_ASC = {
    field: "uuid.type",
    order: SORT_BY_ASC
};
export const SORT_BY_TYPE_DESC = {
    field: "uuid.type",
    order: SORT_BY_DESC
};
export const SORT_BY_LOCATION_KM_ASC = {
    type: SORT_BY_TYPE_DISTANCE,
    unit: "km"
};
export const SORT_BY_LOCATION_MI_ASC = {
    type: SORT_BY_TYPE_DISTANCE,
    unit: "mi"
};

/**
 * ScoreStrategy
 */
export class SortBy {

    private sortsBy: any[] = [];

    /**
     * Create
     *
     * @return {SortBy}
     */
    public static create(): SortBy {
        return new SortBy;
    }

    /**
     * Sort By fields values
     *
     * @param shortSortByElements
     *
     * @return {SortBy}
     */
    public static byFieldsValues(shortSortByElements: any) {
        const sortBy = SortBy.create();
        for (const key in shortSortByElements) {
            sortBy.byFieldValue(key, shortSortByElements[key]);
        }

        return sortBy;
    }

    /**
     * All
     *
     * @return {Array}
     */
    public all(): any {
        return this.sortsBy.length > 0
            ? this.sortsBy
            : [SORT_BY_SCORE];
    }

    /**
     * Sort by value
     *
     * @param value
     *
     * @return {SortBy}
     */
    public byValue(value: any): SortBy {
        if (
            SORT_BY_SCORE != value &&
            SORT_BY_RANDOM != value
        ) {
            if (typeof value.type == "undefined") {
                value.type = SORT_BY_TYPE_FIELD;
            }
        }

        if (SORT_BY_SCORE != value) {
            this.sortsBy.push(value);
        }

        return this;
    }

    /**
     * Sort by field value
     *
     * @param field
     * @param order
     *
     * @return {SortBy}
     */
    public byFieldValue(field: string,
                        order: string): SortBy {
        this.sortsBy.push({
            type: SORT_BY_TYPE_FIELD,
            field: Item.getPathByField(field),
            order: order
        });

        return this;
    }

    /**
     * Sort by nested field
     *
     * @param field
     * @param order
     * @param mode
     *
     * @return {SortBy}
     */
    public byNestedField(field: string,
                         order: string,
                         mode: string = SORT_BY_MODE_AVG): SortBy {
        this.sortsBy.push({
            type: SORT_BY_TYPE_NESTED,
            mode: mode,
            field: 'indexed_metadata.' + field,
            order: order
        });

        return this;
    }

    /**
     * Sort by nested field and filter
     *
     * @param field
     * @param order
     * @param filter
     * @param mode
     *
     * @return {SortBy}
     */
    public byNestedFieldAndFilter(field: string,
                                  order: string,
                                  filter: Filter,
                                  mode: string = SORT_BY_MODE_AVG): SortBy {
        const fieldPath = Item.getPathByField(filter.getField());
        const filterAsArray = filter.toArray();
        filterAsArray.field = fieldPath;
        filter = Filter.createFromArray(filterAsArray);
        this.sortsBy.push({
            type: SORT_BY_TYPE_NESTED,
            mode: mode,
            filter: filter,
            field: 'indexed_metadata.' + field,
            order: order
        });

        return this;
    }

    /**
     * Sort by function
     *
     * @param func
     * @param order
     *
     * @return {SortBy}
     */
    public byFunction(func: string,
                        order: string): SortBy {
        this.sortsBy.push({
            type: SORT_BY_TYPE_FUNCTION,
            "function": func,
            order: order
        });

        return this;
    }

    /**
     * Is sorted by geo distance
     *
     * @return {boolean}
     */
    public isSortedByGeoDistance(): boolean {
        for (const i in this.sortsBy) {
            if (this.sortsBy[i].type === SORT_BY_TYPE_DISTANCE) {
                return true;
            }
        }

        return false;
    }

    /**
     * Set coordinate
     *
     * @param coordinate
     *
     * @return {SortBy}
     */
    public setCoordinate(coordinate: Coordinate): SortBy {
        for (const i in this.sortsBy) {
            if (this.sortsBy[i].type === SORT_BY_TYPE_DISTANCE) {
                this.sortsBy[i].coordinate = coordinate;
            }
        }

        return this;
    }

    /**
     * Has random sort
     *
     * @return {boolean}
     */
    public hasRandomSort(): boolean {
        for (const i in this.sortsBy) {
            if (this.sortsBy[i].type === SORT_BY_TYPE_RANDOM) {
                return true;
            }
        }

        return false;
    }

    /**
     * get first sort value as string
     *
     * @return {string}
     */
    public getFirstSortAsString() : string {
        if (this.sortsBy[0] === undefined) {
            return 'score';
        }

        const firstSortBy = this.sortsBy[0];
        if (firstSortBy.type === SORT_BY_TYPE_RANDOM) {
            return 'random';
        }

        if (firstSortBy.type === SORT_BY_TYPE_DISTANCE) {
            return firstSortBy.type + ':' + firstSortBy.unit;
        }

        if (firstSortBy.type === SORT_BY_TYPE_SCORE) {
            return 'score';
        }

        const field = firstSortBy.field;
        const order = firstSortBy.order;
        const fieldParts = field.split('.');

        return fieldParts[1] + ':' + order;
    }

    /**
     * To array
     *
     * @return {[]}
     */
    public toArray(): any {
        const copySortBy = this.copy();
        const sortsByAsArray = copySortBy.sortsBy;

        for (const i in sortsByAsArray) {
            if (
                typeof sortsByAsArray[i].filter === typeof {} &&
                sortsByAsArray[i].filter != null
            ) {
                sortsByAsArray[i].filter = sortsByAsArray[i].filter.toArray();
            }

            if (
                sortsByAsArray[i].coordinate !== null &&
                sortsByAsArray[i].coordinate instanceof Coordinate
            ) {
                sortsByAsArray[i].coordinate = sortsByAsArray[i].coordinate.toArray();
            }
        }

        return sortsByAsArray;
    }

    /**
     * Create from array
     *
     * @param array
     *
     * @returns {SortBy}
     */
    public static createFromArray(array: any): SortBy {
        const innerArray = JSON.parse(JSON.stringify(array));
        const sortBy = SortBy.create();
        for (const i in innerArray) {
            const element = innerArray[i];

            if (typeof element.type == "undefined") {
                element.type = SORT_BY_TYPE_FIELD;
            }

            if (
                typeof element.filter === typeof {} &&
                element.filter != null
            ) {
                element.filter = Filter.createFromArray(element.filter);
            }

            if (
                element.coordinate != null &&
                typeof element.coordinate === typeof {}
            ) {
                element.coordinate = Coordinate.createFromArray(element.coordinate);
            }

            sortBy.sortsBy.push(element);
        }

        return sortBy;
    }

    /**
     * Make a copy of this
     *
     * @returns {SortBy}
     */
    public copy(): SortBy {
        const newSortBy = SortBy.create();
        for (const i in this.sortsBy) {
            const sortBy = this.sortsBy[i];
            if (typeof sortBy !== "function") {
                const sortByAsArray = JSON.parse(JSON.stringify(sortBy));

                if (
                    typeof sortBy.filter === typeof {} &&
                    sortBy.filter != null
                ) {
                    sortByAsArray.filter = Filter.createFromArray(sortBy.filter.toArray());
                }

                if (
                    sortBy.coordinate != null &&
                    typeof sortBy.coordinate == typeof {}
                ) {
                    sortByAsArray.coordinate = Coordinate.createFromArray(sortBy.coordinate.toArray());
                }

                newSortBy.sortsBy.push(sortByAsArray);
            }
        }

        return newSortBy;
    }
}
