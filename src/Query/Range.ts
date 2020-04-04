/**
 * Aggregation constants
 */
export const RANGE_MINUS_INFINITE = null;
export const RANGE_INFINITE = null;
export const RANGE_SEPARATOR = "..";

/**
 * Filter class
 */
export class Range {

    /**
     * Strong to array
     *
     * @param string
     *
     * @returns {[number, number]}
     */
    public static stringToArray(string: string): [number, number] {
        const parts = string.split(RANGE_SEPARATOR);
        const from = parts[0];
        const to = parts[1];
        let finalFrom: number = RANGE_MINUS_INFINITE;
        let finalTo: number = RANGE_INFINITE;

        if (from != "") {
            finalFrom = parseInt(from);
        }

        if (to != "") {
            finalTo = parseInt(to);
        }

        return [finalFrom, finalTo];

    }

    /**
     * Array to string
     *
     * @param values
     *
     * @return {string}
     */
    public static arrayToString(values: [number, number]): string {
        const finalValues: [string, string] = ["", ""];
        if (values[0] != RANGE_MINUS_INFINITE) {
            finalValues[0] = String(values[0]);
        }

        if (values[1] != RANGE_INFINITE) {
            finalValues[1] = String(values[1]);
        }

        return finalValues.join(RANGE_SEPARATOR);
    }

    /**
     * Create ranges
     *
     * @param from
     * @param to
     * @param incremental
     */
    public static createRanges(from: number,
                               to: number,
                               incremental: number): string[] {
        const ranges = [];
        let nextTo;
        while (from < to) {
            nextTo = from + incremental;
            ranges.push(from + RANGE_SEPARATOR + nextTo);
            from = nextTo;
        }

        return ranges;
    }
}
