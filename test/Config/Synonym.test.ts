import { expect } from 'chai';
import {Synonym} from "../../src/Config/Synonym";

describe('Config/', () => {
    describe('Synonym', () => {

        let words = ['a', 'b', 'c'];

        describe('.createByWords()', () => {
            let synonym = Synonym.createbyWords(words);
            it('should work properly', () => {
                expect(synonym.getWords()).to.be.deep.equal(words);
            });
        });

        describe('.expand()', () => {
            let synonym = Synonym.createbyWords(words);
            it('should work properly', () => {
                expect(synonym.expand()).to.be.deep.equal('a,b,c');
            });
        });

        describe('.createFromArray()', () => {
            let synonym = Synonym.createFromArray({'words': ['a', 'b', 'c']});
            it('should work properly', () => {
                expect(synonym.getWords()).to.be.deep.equal(words);
            });
        });

        describe('.createFromArray() empty', () => {
            let synonym = Synonym.createFromArray({});
            it('should work properly', () => {
                expect(synonym.getWords()).to.be.deep.equal([]);
            });
        });
    });
});
