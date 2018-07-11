import {ItemUUID} from "../../src/Model/ItemUUID";
import { expect } from 'chai';

describe('Model/', () => {
    describe('ItemUUID', () => {
        describe('()', () => {
            let itemUUID = new ItemUUID('1', 'product');

            it('Should work properly', () => {
                expect(itemUUID.getId()).to.be.equal('1');
                expect(itemUUID.getType()).to.be.equal('product');
            });
        });
        describe('.createByComposedUUID()', () => {
            describe('with good params', () => {
                let itemUUID = ItemUUID.createByComposedUUID('1~product');
                it('should work properly', () => {
                    expect(itemUUID.getId()).to.be.equal('1');
                    expect(itemUUID.getType()).to.be.equal('product');
                });
            });

            describe('with bad params', () => {
                expect(function() {ItemUUID.createByComposedUUID('')}).to.throw();
                expect(function() {ItemUUID.createByComposedUUID('1')}).to.throw();
                expect(function() {ItemUUID.createByComposedUUID('product')}).to.throw();
                expect(function() {ItemUUID.createByComposedUUID('1~product~xxx')}).to.throw();
            });
        });
        describe('.createFromArray()', () => {
            describe('with good params', () => {
                let itemUUID = ItemUUID.createFromArray({'id': '1', 'type': 'product'});
                it('should work properly', () => {
                    expect(itemUUID.getId()).to.be.equal('1');
                    expect(itemUUID.getType()).to.be.equal('product');
                });
            });
        });
        describe('().toArray()', () => {
            let itemUUIDAsArray = {'id': '1', 'type': 'product'};
            expect(ItemUUID.createFromArray(itemUUIDAsArray).toArray()).to.be.deep.equal(itemUUIDAsArray);
        });

    });
});
