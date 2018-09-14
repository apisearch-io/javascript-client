import {AppUUID} from "../../src/Model/AppUUID";
import { expect } from 'chai';

describe('Model/', () => {
    describe('AppUUID', () => {
        describe('()', () => {
            let appUUID = AppUUID.createById('1');

            it('Should work properly', () => {
                expect(appUUID.getId()).to.be.equal('1');
                expect(appUUID.composedUUID()).to.be.equal('1');
            });
        });
        describe('.createFromArray()', () => {
            describe('with good params', () => {
                let appUUID = AppUUID.createFromArray({'id': '1'});
                it('should work properly', () => {
                    expect(appUUID.getId()).to.be.equal('1');
                });
            });
        });
        describe('().toArray()', () => {
            let appUUIDAsArray = {'id': '1'};
            expect(AppUUID.createFromArray(appUUIDAsArray).toArray()).to.be.deep.equal(appUUIDAsArray);
        });
        describe('error', () => {
            describe('with underslash', () => {
                let creation = function() {
                    AppUUID.createFromArray({'id': 'a_b'});
                };
                it('should throw error', () => {
                    expect(creation).to.throw();
                });
            });
        });
    });
});
