/**
 * Result class
 */
export declare class Synonym {
    private words;
    /**
     * Constructor
     *
     * @param words
     */
    constructor(words: string[]);
    /**
     * get words
     *
     * @return {string[]}
     */
    getWords(): string[];
    /**
     * Create by words
     *
     * @param words
     *
     * @return {Synonym}
     */
    static createbyWords(words: string[]): Synonym;
    /**
     * To array
     *
     * @return {{words: string[]}}
     */
    toArray(): {
        words: string[];
    };
    /**
     * create from array
     *
     * @param array
     *
     * @returns {Synonym}
     */
    static createFromArray(array: any): Synonym;
    /**
     * Expand
     *
     * @returns {string}
     */
    expand(): string;
}
