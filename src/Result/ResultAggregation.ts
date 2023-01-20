import {
    FILTER_AT_LEAST_ONE,
    FILTER_MUST_ALL, FILTER_MUST_ALL_WITH_LEVELS,
} from "../Query/Filter";
import {Counter} from "./Counter";

/**
 * ResultAggregation class
 */
export class ResultAggregation {

    private name: string;
    private counters: any = {};
    private applicationType: number;
    private totalElements: number;
    private activeElements: any;
    private highestActiveElement: number = 0;
    private metadata: any;

    /**
     * @param name
     * @param applicationType
     * @param totalElements
     * @param activeElements
     * @param metadata
     */
    constructor(
        name: string,
        applicationType: number,
        totalElements: number,
        activeElements: any[],
        metadata: any = {}
    ) {
        this.name = name;
        this.applicationType = applicationType;
        this.totalElements = totalElements;
        this.activeElements = {};
        this.metadata = metadata;
        for (const i in activeElements) {
            const activeElement = activeElements[i];
            this.activeElements[activeElement] = activeElement;
        }
    }

    /**
     * Add counter
     *
     * @param name
     * @param counter
     */
    public addCounter(
        name: string,
        counter: number,
    ) {
        if (counter == 0) {
            return;
        }

        const counterInstance = Counter.createByActiveElements(
            name,
            counter,
            Object.keys(this.activeElements),
        );

        if (!(counterInstance instanceof Counter)) {
            return;
        }

        if (
            (this.applicationType & FILTER_MUST_ALL_WITH_LEVELS) &&
            (this.applicationType & ~FILTER_MUST_ALL) &&
            counterInstance.isUsed()
        ) {
            this.activeElements[counterInstance.getId()] = counterInstance;
            this.highestActiveElement = Math.max(
                counterInstance.getLevel(),
                this.highestActiveElement,
            );

            return;
        }

        this.counters[counterInstance.getId()] = counterInstance;
    }

    /**
     * Get name
     *
     * @return {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Get counter
     *
     * @return {any}
     */
    public getCounters(): any {
        return this.counters;
    }

    /**
     *
     */
    public getMetadata(): any {
        return this.metadata;
    }

    /**
     * Return if the aggregation belongs to a filter.
     *
     * @return {boolean}
     */
    public isFilter(): boolean {
        return (this.applicationType & FILTER_MUST_ALL) > 0;
    }

    /**
     * Aggregation has levels.
     *
     * @return {boolean}
     */
    public hasLevels(): boolean {
        return (this.applicationType & FILTER_MUST_ALL_WITH_LEVELS) > 0;
    }

    /**
     * Get counter by name
     *
     * @param name
     *
     * @return {null}
     */
    public getCounter(name): Counter {
        return this.counters[name] instanceof Counter
            ? this.counters[name]
            : null;
    }

    /**
     * Get all elements
     *
     * @return {{}}
     */
    public getAllElements(): any {
        return {...this.activeElements, ...this.counters};
    }

    /**
     * Get total elements
     *
     * @return {number}
     */
    public getTotalElements(): number {
        return this.totalElements;
    }

    /**
     * Get active elements
     *
     * @return {any}
     */
    public getActiveElements(): any {
        if (Object.keys(this.activeElements).length === 0) {
            return {};
        }

        if (this.applicationType === FILTER_MUST_ALL_WITH_LEVELS) {
            let value: Counter = null;
            for (const i in this.activeElements) {
                const activeElement = this.activeElements[i];
                if (!(activeElement instanceof Counter)) {
                    continue;
                }

                if (value == null) {
                    value = activeElement;
                }

                value = value.getLevel() > activeElement.getLevel()
                    ? value
                    : activeElement;
            }

            return value instanceof Counter
                ? {0: value}
                : null;
        }

        return this.activeElements;
    }

    /**
     * Clean results by level and remove all levels higher than the lowest.
     */
    public cleanCountersByLevel() {
        for (const i in this.counters) {
            const counter = this.counters[i];
            if (counter.getLevel() !== this.highestActiveElement + 1) {
                delete this.counters[i];
            }
        }
    }

    /**
     * Is empty
     *
     * @returns {boolean}
     */
    public isEmpty(): boolean {

        return Object.keys(this.activeElements).length == 0 &&
            Object.keys(this.counters).length == 0;
    }

    /**
     * To array
     *
     * @return {any}
     */
    public toArray(): any {
        const array: any = {
            name: this.name,
            counters: [],
            active_elements: [],
            metadata: this.metadata
        };

        for (const i in this.counters) {
            array.counters.push(this.counters[i].toArray());
        }

        if (this.applicationType !== FILTER_AT_LEAST_ONE) {
            array.application_type = this.applicationType;
        }

        if (this.totalElements > 0) {
            array.total_elements = this.totalElements;
        }

        for (const i in this.activeElements) {
            const activeElement = this.activeElements[i];
            array.active_elements.push(
                activeElement instanceof Counter
                    ? activeElement.toArray()
                    : activeElement,
            );
        }

        if (this.highestActiveElement > 0) {
            array.highest_active_level = this.highestActiveElement;
        }

        if (array.counters.length === 0) {
            delete array.counters;
        }

        if (array.active_elements.length === 0) {
            delete array.active_elements;
        }

        if (Object.keys(array.metadata).length === 0) {
            delete array.metadata;
        }

        return array;
    }

    /**
     * Create from array
     *
     * @param array
     */
    public static createFromArray(array: any): ResultAggregation {
        const activeElements = [];
        let activeElementsAsArray = array.active_elements;
        activeElementsAsArray = typeof activeElementsAsArray === typeof []
            ? activeElementsAsArray
            : [];

        for (const i in activeElementsAsArray) {
            const activeElementAsArray = activeElementsAsArray[i];
            activeElements.push(
                typeof activeElementAsArray === typeof {}
                    ? Counter.createFromArray(activeElementAsArray)
                    : activeElementAsArray,
            );
        }

        const aggregation = new ResultAggregation(
            array.name,
            parseInt(array.application_type ? array.application_type : FILTER_AT_LEAST_ONE),
            parseInt(array.total_elements ? array.total_elements : 0),
            [],
        );
        aggregation.activeElements = activeElements;
        const countersAsArray = typeof array.counters === typeof []
            ? array.counters
            : [];

        for (const i in countersAsArray) {
            const counterAsArray = countersAsArray[i];
            if (typeof counterAsArray !== "function") {
                const counter = Counter.createFromArray(counterAsArray);
                aggregation.counters['_' + counter.getId()] = counter;
            }
        }

        aggregation.highestActiveElement = typeof array.highest_active_level === "number"
            ? array.highest_active_level
            : 0;

        aggregation.metadata = typeof array.metadata === typeof {}
            ? array.metadata
            : {};

        return aggregation;
    }
}
