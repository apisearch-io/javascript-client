import { expect } from 'chai';
import {Synonym} from "../../src/Config/Synonym";
import {
    Config, DEFAULT_SHARDS,
    DEFAULT_REPLICAS
} from "../../src/Config/Config";

describe('Config/', () => {
    describe('Config', () => {

        describe('.create()', () => {
            let config = new Config('es', true);
            it('should work properly', () => {
                expect(config.getLanguage()).to.be.equal('es');
                expect(config.shouldSearchableMetadataBeStored()).to.be.true;
            })
        });

        describe('.create() with null language', () => {
            let config = new Config(null, true);
            it('should work properly', () => {
                expect(config.getLanguage()).to.be.null;
                expect(config.shouldSearchableMetadataBeStored()).to.be.true;
            })
        });

        describe('.create() with searchable metadata store false', () => {
            let config = new Config('es', false);
            it('should work properly', () => {
                expect(config.shouldSearchableMetadataBeStored()).to.be.false;
                config = Config.createFromArray({
                    'store_searchable_metadata': false
                });
                expect(config.shouldSearchableMetadataBeStored()).to.be.false;
            })
        });

        describe('.addSynonym()', () => {
            let config = new Config(null, true);
            config.addSynonym(Synonym.createbyWords(['a', 'b']));
            config.addSynonym(Synonym.createbyWords(['b', 'c']));

            it('should work properly', () => {
                expect(config.getSynonyms()).to.be.deep.equal([
                    Synonym.createbyWords(['a', 'b']),
                    Synonym.createbyWords(['b', 'c'])
                ]);
            })
        });

        describe('.testDefaultsValues()', () => {
            let config = Config.createFromArray({});
            it('should work properly', () => {
                expect(config.getLanguage()).to.be.null;
                expect(config.shouldSearchableMetadataBeStored()).to.be.true;
                expect(config.getSynonyms()).to.be.deep.equal([]);
                expect(config.getShards()).to.be.equal(DEFAULT_SHARDS);
                expect(config.getReplicas()).to.be.equal(DEFAULT_REPLICAS);
            })
        });

        describe('http transport', () => {
            let configAsArray = {
                'language': 'es',
                'store_searchable_metadata': false,
                'synonyms': [
                    {'words': ['a', 'b']},
                    {'words': ['b', 'c']},
                ],
                'shards': 5,
                'replicas': 8
            };

            it('should work properly', () => {
                expect(Config.createFromArray(configAsArray).toArray()).to.be.deep.equal(configAsArray);
            })
        });
    });
});
