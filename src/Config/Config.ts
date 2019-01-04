import {Synonym} from "./Synonym";

export const DEFAULT_SHARDS = 1;
export const DEFAULT_REPLICAS = 0;

/**
 * Result class
 */
export class Config {

    private language: string;
    private storeSearchableMetadata: boolean;
    private synonyms: Synonym[] = [];
    private shards: number;
    private replicas: number;

    /**
     * Constructor
     *
     * @param language
     * @param storeSearchableMetadata
     * @param shards
     * @param replicas
     */
    constructor(
        language: string = null,
        storeSearchableMetadata: boolean = true,
        shards: number = DEFAULT_SHARDS,
        replicas: number = DEFAULT_REPLICAS
    ) {
        this.language = language;
        this.storeSearchableMetadata = storeSearchableMetadata;
        this.shards = shards;
        this.replicas = replicas;
    }

    /**
     * Get language
     *
     * @return {string}
     */
    public getLanguage(): string {
        return this.language;
    }

    /**
     * Should searchable metadata be stored
     *
     * @return {boolean}
     */
    public shouldSearchableMetadataBeStored(): boolean {
        return this.storeSearchableMetadata;
    }

    /**
     * Add synonym
     *
     * @param synonym
     */
    public addSynonym(synonym: Synonym) {
        this.synonyms.push(synonym);
    }

    /**
     * Get synonyms
     *
     * @return {Synonym[]}
     */
    public getSynonyms(): Synonym[] {
        return this.synonyms;
    }

    /**
     * Get shards
     *
     * @return {number}
     */
    public getShards(): number {
        return this.shards;
    }

    /**
     * Get replicas
     *
     * @return {number}
     */
    public getReplicas(): number {
        return this.replicas;
    }

    /**
     * to array
     */
    public toArray() {
        return {
            language: this.language,
            store_searchable_metadata: this.storeSearchableMetadata,
            synonyms: this.synonyms.map((synonym) => synonym.toArray()),
            shards: this.shards,
            replicas: this.replicas
        };
    }

    /**
     * Create from array
     */
    public static createFromArray(array: any): Config {
        const config = new Config(
            array.language ? array.language : null,
            typeof array.store_searchable_metadata == "boolean"
                ? array.store_searchable_metadata
                : true,
        );

        if (
            array.synonyms instanceof Array &&
            array.synonyms.length > 0
        ) {
            config.synonyms = array.synonyms.map((synonym) => Synonym.createFromArray(synonym));
        }

        config.shards = typeof array.shards== "number"
            ? array.shards
            : DEFAULT_SHARDS;

        config.replicas = typeof array.replicas== "number"
            ? array.replicas
            : DEFAULT_REPLICAS;

        return config;
    }
}
