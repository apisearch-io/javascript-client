import {IndexUUID} from "../../src/Model/IndexUUID";
import { expect } from 'chai';

describe('Model/', () => {
    describe('IndexUUID', () => {
        describe('()', () => {
            let indexUUID = IndexUUID.createById('1');

            it('Should work properly', () => {
                expect(indexUUID.getId()).to.be.equal('1');
                expect(indexUUID.composedUUID()).to.be.equal('1');
            });
        });
        describe('.createFromArray()', () => {
            describe('with good params', () => {
                let indexUUID = IndexUUID.createFromArray({'id': '1'});
                it('should work properly', () => {
                    expect(indexUUID.getId()).to.be.equal('1');
                });
            });
        });
        describe('().toArray()', () => {
            let indexUUIDAsArray = {'id': '1'};
            expect(IndexUUID.createFromArray(indexUUIDAsArray).toArray()).to.be.deep.equal(indexUUIDAsArray);
        });
        describe('error', () => {
            describe('with underslash', () => {
                let creation = function() {
                    IndexUUID.createFromArray({'id': 'a_b'});
                };
                it('should throw error', () => {
                    expect(creation).to.throw();
                });
            });
        });
    });
});
