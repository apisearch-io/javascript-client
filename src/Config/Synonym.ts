/**
 * Result class
 */
export class Synonym {

    private words: string[];

    /**
     * Constructor
     *
     * @param words
     */
    constructor(words: string[]) {
        this.words = words;
    }

    /**
     * get words
     *
     * @return {string[]}
     */
    public getWords(): string[] {
        return this.words;
    }

    /**
     * Create by words
     *
     * @param words
     *
     * @return {Synonym}
     */
    public static createbyWords(words: string[]) {
        return new Synonym(words);
    }

    /**
     * To array
     *
     * @return {{words: string[]}}
     */
    public toArray(): {words: string[]} {
        return {
            words: this.words,
        };
    }

    /**
     * create from array
     *
     * @param array
     *
     * @returns {Synonym}
     */
    public static createFromArray(array: any): Synonym {

        return new Synonym(
            array.words instanceof Object
                ? array.words
                : [],
        );
    }

    /**
     * Expand
     *
     * @returns {string}
     */
    public expand(): string {
        return this.words.join(",");
    }
}
