import { expect } from 'chai';
import Apisearch from "../src/Apisearch";
import {Product} from "./Transformer/Product";
import {Item} from "../src/Model/Item";
import {ItemUUID} from "../src/Model/ItemUUID";
import {Changes} from "../src/Model/Changes";
import {Query} from "../src/Query/Query";
import {ImmutableConfig} from "../src/Config/ImmutableConfig";
import {Config} from "../src/Config/Config";
import {TestClient} from "../src/Http/TestClient";
import {ProductReadTransformer} from "./Transformer/ProductReadTransformer";

describe('Apisearch', () => {

    const client = new TestClient();
    const repository = Apisearch.createRepository({
        "app_id": "aaaa",
        "index_id": 'bbbb',
        "token": 'cccc',
        "options": {
            "endpoint": 'http://blabla',
            "http_client": client,
        }
    });
    repository.getTransformer().addReadTransformer(new ProductReadTransformer());

    describe('Initial build', () => {
        it('Should create properly', () => {
            expect(typeof repository.getTransformer()).to.be.equal("object");
        });
    });

    describe('Calls will work properly', () => {
        repository.addObject(new Product('1', '1', 'name'));
        repository.addObject(new Product('2', '2', 'name'));
        repository.addItem(Item.create(ItemUUID.createByComposedUUID('3~product')));
        repository.addItems([
            Item.create(ItemUUID.createByComposedUUID('4~product')),
            Item.create(ItemUUID.createByComposedUUID('5~product'))
        ]);
        repository.deleteItem(ItemUUID.createByComposedUUID('6~product'));
        repository.deleteItems([
            ItemUUID.createByComposedUUID('7~product'),
            ItemUUID.createByComposedUUID('8~product')
        ]);
        repository.deleteObject(new Product('9', 'lalala', 'prod4'));
        repository.deleteObject(new Product('10', 'lalala', 'prod5'));

        it('Should take properly all available repository calls', () => {
            return Promise.all([
                repository.flush(100, true),
                repository.flush(3),
                repository.query(Query.createMatchAll()),
                repository.updateItems(Query.createMatchAll(), Changes.create()),
                repository.createIndex(new ImmutableConfig()),
                repository.deleteIndex(),
                repository.resetIndex(),
                repository.checkIndex(),
                repository.configureIndex(new Config())
            ]).then(() => {
                expect(client.calls.length).to.be.equal(9);
            })
        });
    });
});
