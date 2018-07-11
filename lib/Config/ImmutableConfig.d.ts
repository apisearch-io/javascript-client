import { Synonym } from "./Synonym";
/**
 * Result class
 */
export declare class ImmutableConfig {
    private language;
    private storeSearchableMetadata;
    private synonyms;
    /**
     * Constructor
     *
     * @param language
     * @param storeSearchableMetadata
     */
    constructor(language?: string, storeSearchableMetadata?: boolean);
    /**
     * Get language
     *
     * @return {string}
     */
    getLanguage(): string;
    /**
     * Should searchable metadata be stored
     *
     * @return {boolean}
     */
    shouldSearchableMetadataBeStored(): boolean;
    /**
     * Add synonym
     *
     * @param synonym
     */
    addSynonym(synonym: Synonym): void;
    /**
     * Get synonyms
     *
     * @return {Synonym[]}
     */
    getSynonyms(): Synonym[];
    /**
     * to array
     */
    toArray(): {
        language: string;
        store_searchable_metadata: boolean;
        synonyms: {
            words: string[];
        }[];
    };
    /**
     * Create from array
     */
    static createFromArray(array: any): ImmutableConfig;
}
