import { expect } from 'chai';
import {Transformer} from "../../src/Transformer/Transformer";
import {ProductReadTransformer} from "./ProductReadTransformer";
import {ProductWriteTransformer} from "./ProductWriteTransformer";
import {Product} from "./Product";

describe('Transformer/', () => {
    describe('Transformer', () => {
        describe('basic test', () => {
            let transformer = new Transformer();
            transformer.addReadTransformer(new ProductReadTransformer());
            transformer.addWriteTransformer(new ProductWriteTransformer());

            it('Should work properly', () => {
                const product = new Product(
                    111,
                    9999,
                    'my-product'
                );
                const item = transformer.toItem(product);
                expect(item.get('sku')).to.be.equal(9999);
                expect(item.get('name')).to.be.equal('my-product');
                expect(item.getId()).to.be.equal(111);
                expect(transformer.toItems([product])[0]).to.be.deep.equal(item);
                const itemUUID = transformer.toItemUUID(product);
                expect(transformer.toItemUUIDs([product])[0]).to.be.deep.equal(itemUUID);
                expect(itemUUID.getId()).to.be.equal(111);
                expect(itemUUID.getType()).to.be.equal('product');
                const returnedProduct = transformer.fromItem(item);
                expect(returnedProduct.sku).to.be.equal(9999);
                expect(returnedProduct.name).to.be.equal('my-product');
                expect(returnedProduct.id).to.be.equal(111);
            });

        });
    });
});