import { expect } from 'chai';
import {Transformer} from "../../src/Transformer/Transformer";
import {ProductReadTransformer} from "../Transformer/ProductReadTransformer";
import {ProductWriteTransformer} from "../Transformer/ProductWriteTransformer";
import {Product} from "../Transformer/Product";
import {HttpRepository} from "../../src/Repository/HttpRepository";
import {TestClient} from "../../src/Http/TestClient";
import {ItemUUID} from "../../src/Model/ItemUUID";
import {Item} from "../../src/Model/Item";
import {Query} from "../../src/Query/Query";
import {Changes} from "../../src/Model/Changes";
import {ImmutableConfig} from "../../src/Config/ImmutableConfig";
import {Config} from "../../src/Config/Config";

describe('Repository/', () => {
    describe('HttpRepository', () => {

        let transformer = new Transformer();
        transformer.addReadTransformer(new ProductReadTransformer());
        transformer.addWriteTransformer(new ProductWriteTransformer());

        it('Should add items and objects', async () => {
            let client = new TestClient();
            let repository = new HttpRepository(
                client,
                'aaa',
                'bbb',
                'xxx',
                transformer
            );

            repository.addItem(Item.create(ItemUUID.createByComposedUUID('1~product')));
            repository.addItems([
                Item.create(ItemUUID.createByComposedUUID('2~product')),
                Item.create(ItemUUID.createByComposedUUID('3~product'))
            ]);
            repository.addObject(new Product('4', 'lalala', 'prod4'));
            repository.addObject(new Product('5', 'lalala', 'prod5'));
            await repository
                .flush()
                .then(_ => {
                    expect(client.calls.length).to.be.equal(1);
                    for (let i in client.calls[0].data.items) {
                        expect(client.calls[0].data.items[i].uuid.type).to.be.equal('product');
                    }
                });
        });

        it('Should delete items and objects', async () => {
            let client = new TestClient();
            let repository = new HttpRepository(
                client,
                'aaa',
                'bbb',
                'xxx',
                transformer
            );

            repository.deleteItem(ItemUUID.createByComposedUUID('1~product'));
            repository.deleteItems([
                ItemUUID.createByComposedUUID('2~product'),
                ItemUUID.createByComposedUUID('3~product')
            ]);
            repository.deleteObject(new Product('4', 'lalala', 'prod4'));
            repository.deleteObject(new Product('5', 'lalala', 'prod5'));
            await repository
                .flush()
                .then(_ => {
                    expect(client.calls.length).to.be.equal(1);
                    for (let i in client.calls[0].data.items) {
                        expect(client.calls[0].data.items[i].type).to.be.equal('product');
                    }
                });
        });

        it('Should flush with blocks', async () => {
            let client = new TestClient();
            let repository = new HttpRepository(
                client,
                'aaa',
                'bbb',
                'xxx',
                transformer
            );

            repository.addItems([
                Item.create(ItemUUID.createByComposedUUID('1~product')),
                Item.create(ItemUUID.createByComposedUUID('2~product')),
                Item.create(ItemUUID.createByComposedUUID('3~product')),
                Item.create(ItemUUID.createByComposedUUID('4~product')),
                Item.create(ItemUUID.createByComposedUUID('5~product')),
                Item.create(ItemUUID.createByComposedUUID('6~product')),
            ]);

            await repository
                .flush(2)
                .then(_ => {
                     expect(client.calls.length).to.be.equal(3);
                });
        });

        it('Should flush with non pair blocks', async () => {
            let client = new TestClient();
            let repository = new HttpRepository(
                client,
                'aaa',
                'bbb',
                'xxx',
                transformer
            );

            repository.addItems([
                Item.create(ItemUUID.createByComposedUUID('1~product')),
                Item.create(ItemUUID.createByComposedUUID('2~product')),
                Item.create(ItemUUID.createByComposedUUID('3~product')),
                Item.create(ItemUUID.createByComposedUUID('4~product')),
                Item.create(ItemUUID.createByComposedUUID('5~product')),
            ]);

            await repository
                .flush(2, true)
                .then(_ => {
                     expect(client.calls.length).to.be.equal(3);
                });
        });

        it('All other calls', async () => {
            let client = new TestClient();
            let repository = new HttpRepository(
                client,
                'aaa',
                'bbb',
                'xxx',
                transformer
            );

            await repository.query(Query.createMatchAll());
            await repository.updateItems(Query.createMatchAll(), Changes.create());
            await repository.createIndex(new ImmutableConfig());
            await repository.deleteIndex();
            await repository.resetIndex();
            await repository.checkIndex();
            await repository.configureIndex(new Config());

            expect(client.calls.length).to.be.equal(7);
        });
    });
});