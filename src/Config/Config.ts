import {Synonym} from "./Synonym";

/**
 * Result class
 */
export class Config {

    private language: string;
    private storeSearchableMetadata: boolean;
    private synonyms: Synonym[] = [];

    /**
     * Constructor
     *
     * @param language
     * @param storeSearchableMetadata
     */
    constructor(
        language: string = null,
        storeSearchableMetadata: boolean = true,
    ) {
        this.language = language;
        this.storeSearchableMetadata = storeSearchableMetadata;
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
     * to array
     */
    public toArray() {
        return {
            language: this.language,
            store_searchable_metadata: this.storeSearchableMetadata,
            synonyms: this.synonyms.map((synonym) => synonym.toArray()),
        };
    }

    /**
     * Create from array
     */
    public static createFromArray(array: any): Config {
        const immutableConfig = new Config(
            array.language ? array.language : null,
            typeof array.store_searchable_metadata == "boolean"
                ? array.store_searchable_metadata
                : true,
        );

        if (
            array.synonyms instanceof Array &&
            array.synonyms.length > 0
        ) {
            immutableConfig.synonyms = array.synonyms.map((synonym) => Synonym.createFromArray(synonym));
        }

        return immutableConfig;
    }
}
