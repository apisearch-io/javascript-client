import { Synonym } from "./Synonym";
export declare const DEFAULT_SHARDS = 1;
export declare const DEFAULT_REPLICAS = 0;
/**
 * Result class
 */
export declare class Config {
    private language;
    private storeSearchableMetadata;
    private synonyms;
    private shards;
    private replicas;
    /**
     * Constructor
     *
     * @param language
     * @param storeSearchableMetadata
     * @param shards
     * @param replicas
     */
    constructor(language?: string, storeSearchableMetadata?: boolean, shards?: number, replicas?: number);
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
     * Get shards
     *
     * @return {number}
     */
    getShards(): number;
    /**
     * Get replicas
     *
     * @return {number}
     */
    getReplicas(): number;
    /**
     * to array
     */
    toArray(): {
        language: string;
        store_searchable_metadata: boolean;
        synonyms: {
            words: string[];
        }[];
        shards: number;
        replicas: number;
    };
    /**
     * Create from array
     */
    static createFromArray(array: any): Config;
}
