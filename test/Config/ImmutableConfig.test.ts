import { expect } from 'chai';
import Synonym from "../../src/Config/Synonym";
import ImmutableConfig from "../../src/Config/ImmutableConfig";

describe('Config/', () => {
    describe('ImmutableConfig', () => {

        describe('.create()', () => {
            let immutableConfig = new ImmutableConfig('es', true);
            it('should work properly', () => {
                expect(immutableConfig.getLanguage()).to.be.equal('es');
                expect(immutableConfig.shouldSearchableMetadataBeStored()).to.be.true;
            })
        });

        describe('.create() with null language', () => {
            let immutableConfig = new ImmutableConfig(null, true);
            it('should work properly', () => {
                expect(immutableConfig.getLanguage()).to.be.null;
                expect(immutableConfig.shouldSearchableMetadataBeStored()).to.be.true;
            })
        });

        describe('.create() with searchable metadata store false', () => {
            let immutableConfig = new ImmutableConfig('es', false);
            it('should work properly', () => {
                expect(immutableConfig.shouldSearchableMetadataBeStored()).to.be.false;
                immutableConfig = ImmutableConfig.createFromArray({
                    'store_searchable_metadata': false
                });
                expect(immutableConfig.shouldSearchableMetadataBeStored()).to.be.false;
            })
        });

        describe('.addSynonym()', () => {
            let immutableConfig = new ImmutableConfig(null, true);
            immutableConfig.addSynonym(Synonym.createbyWords(['a', 'b']));
            immutableConfig.addSynonym(Synonym.createbyWords(['b', 'c']));

            it('should work properly', () => {
                expect(immutableConfig.getSynonyms()).to.be.deep.equal([
                    Synonym.createbyWords(['a', 'b']),
                    Synonym.createbyWords(['b', 'c'])
                ]);
            })
        });

        describe('.testDefaultsValues()', () => {
            let immutableConfig = ImmutableConfig.createFromArray({});
            it('should work properly', () => {
                expect(immutableConfig.getLanguage()).to.be.null;
                expect(immutableConfig.shouldSearchableMetadataBeStored()).to.be.true;
                expect(immutableConfig.getSynonyms()).to.be.deep.equal([]);
            })
        });

        describe('http transport', () => {
            let immutableConfigAsArray = {
                'language': 'es',
                'store_searchable_metadata': false,
                'synonyms': [
                    {'words': ['a', 'b']},
                    {'words': ['b', 'c']},
                ]
            };

            it('should work properly', () => {
                expect(ImmutableConfig.createFromArray(immutableConfigAsArray).toArray()).to.be.deep.equal(immutableConfigAsArray);
            })
        });
    });
});
