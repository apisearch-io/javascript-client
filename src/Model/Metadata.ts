/**
 * User class
 */
export class Metadata {

    /**
     * To metadata
     *
     * @param array:{}
     *
     * @returns {string}
     */
    public static toMetadata(array: {}): string {
        array = JSON.parse(JSON.stringify(array));
        const parts = [];
        for (const key in array) {
            parts.push(key + "##" + array[key]);
        }

        return parts.join("~~");
    }

    /**
     * From metadata
     *
     * @param metadata
     *
     * @return {{}}
     */
    public static fromMetadata(metadata: string): any {

        let values: any = {};
        const splittedParts = metadata.split("~~");
        let iterator = 0;
        let size = 0;
        let lastElement = null;

        for (const key in splittedParts) {
            const part = splittedParts[key];
            const parts = part.split("##");
            if (parts.length > 1) {
                lastElement = parts[1];
                values[parts[0]] = lastElement;
            } else {
                lastElement = part;
                values[iterator++] = lastElement;
            }
            size++;
        }

        if (size == 1) {
            values = {
                id: lastElement,
                name: lastElement,
            };
        }

        if (typeof values.id == "undefined") {
            return null;
        }

        return values;
    }
}
