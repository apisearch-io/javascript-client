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
import {Config} from "../../src/Config/Config";
import {IndexUUID} from "../../src/Model/IndexUUID";

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

        it('Should delete items and objects even with blocks', async () => {
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
            repository.deleteObject(new Product('6', 'lalala', 'prod6'));
            await repository
                .flush(20, false)
                .then(_ => {
                    expect(client.calls.length).to.be.equal(1);
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
                .flush(20, true)
                .then(_ => {
                     expect(client.calls.length).to.be.equal(0);
                });

            await repository
                .flush(2)
                .then(_ => {
                     expect(client.calls.length).to.be.equal(3);
                });

            client.calls = [];

            await repository
                .flush()
                .then(_ => {
                     expect(client.calls.length).to.be.equal(0);
                });
        });



        it('Should flush with blocks', async () => {
            let client = new TestClient();
            let repository = new HttpRepository(
                client,
                'aaa',
                'bbb',
                'error',
                transformer
            );

            repository.addItems([
                Item.create(ItemUUID.createByComposedUUID('1~product')),
            ]);

            expect(client.calls.length).to.be.equal(0);

            await repository
                .flush()
                .then(_ => {
                    expect(true).to.be.equal(false);
                })
                .catch(_ => {
                    expect(true).to.be.equal(true);
                })
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

            client.calls = [];

            await repository
                .flush()
                .then(_ => {
                     expect(client.calls.length).to.be.equal(0);
                });
        });

        it("Should fail on flush when client fails", async () => {
            const client = new TestClient();
            const repository = new HttpRepository(
                client,
                "aaa",
                "bbb",
                "error",
                transformer,
            );

            repository.addItems([
                Item.create(ItemUUID.createByComposedUUID("1~product")),
            ]);

            expect(client.calls.length).to.be.equal(0);

            try {
                await repository.flush();
                expect.fail("flush() should have failed");
            } catch (error) {
                //
            }
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

            let counter = 0;
            await repository.query(Query.createMatchAll()).then(_ => counter++);
            await repository.updateItems(Query.createMatchAll(), Changes.create()).then(_ => counter++);
            await repository.createIndex(IndexUUID.createById('x'), new Config()).then(_ => counter++);
            await repository.deleteIndex(IndexUUID.createById('x')).then(_ => counter++);
            await repository.resetIndex(IndexUUID.createById('x')).then(_ => counter++);
            await repository.checkIndex(IndexUUID.createById('x')).then(_ => counter++);
            await repository.configureIndex(IndexUUID.createById('x'), new Config()).then(_ => counter++);
            await repository.getSimilarItems(Query.createMatchAll(), [ItemUUID.createByComposedUUID('1~type')], 1).then(_ => counter++);
            await repository.getRecommendedItems(Query.createMatchAll()).then(_ => counter++);
            await repository.pushInteraction(IndexUUID.createById('x'), ItemUUID.createByComposedUUID('1~type'), '123', 'queryX', 'cli').then(_ => counter++);
            await repository.pushInteraction(IndexUUID.createById('x'), ItemUUID.createByComposedUUID('1~type'), '123', 'queryX', 'cli', 'site2', 'desktop').then(_ => counter++);
            await repository.purchase(IndexUUID.createById('x'), '123', []).then(_ => counter++);
            await repository.purchase(IndexUUID.createById('x'), '123', [], 'site2', 'desktop').then(_ => counter++);
            await repository.purchase(IndexUUID.createById('x'), '123', [
                ItemUUID.createByComposedUUID('2~type'),
                ItemUUID.createByComposedUUID('3~type')
            ]).then(_ => counter++);

            expect(client.calls.length).to.be.equal(14);
            expect(counter).to.be.equal(14);
        });
    });
});
