import { expect } from 'chai';
import {Product} from "./Transformer/Product";
import {Item} from "../src/Model/Item";
import {ItemUUID} from "../src/Model/ItemUUID";
import {Changes} from "../src/Model/Changes";
import {Query} from "../src/Query/Query";
import {Config} from "../src/Config/Config";
import {TestClient} from "../src/Http/TestClient";
import {ProductReadTransformer} from "./Transformer/ProductReadTransformer";
import Apisearch from "../src/Apisearch";
import {IndexUUID} from "../src/Model/IndexUUID";

describe('Apisearch', () => {

    const client = new TestClient();
    const repository = Apisearch.createRepository({
        "app_id": "aaaa",
        "index_id": 'bbbb',
        "token": 'cccc',
        "options": {
            "endpoint": 'http://localhost:8100',
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
                repository.createIndex(IndexUUID.createById('x'), new Config()),
                repository.deleteIndex(IndexUUID.createById('x')),
                repository.resetIndex(IndexUUID.createById('x')),
                repository.checkIndex(IndexUUID.createById('x')),
                repository.configureIndex(IndexUUID.createById('x'), new Config())
            ]).then(() => {
                expect(client.calls.length).to.be.equal(9);
            })
        });
    });

    describe('Check type value', () => {

        it('Should check config properties', () => {
            expect(() => {
                Apisearch.ensureRepositoryConfigIsValid({
                    'app_id': 'a',
                    'index_id': 'b',
                    'token': 'c',
                    'options': {
                        'endpoint': 'd'
                    }
                });
            }).to.not.throw();

            expect(() => {
                Apisearch.ensureRepositoryConfigIsValid({
                    'app_id': 'a',
                    'index_id': 'b',
                    'token': 'c',
                    'options': {
                        'no_endpoint': 'd'
                    }
                });
            }).to.throw();

            expect(() => {
                Apisearch.ensureRepositoryConfigIsValid({
                    'app_id': 'a',
                    'index_id': 'b',
                    'no_token': 'c',
                    'options': {
                        'endpoint': 'd'
                    }
                });
            }).to.throw();

            expect(() => {
                Apisearch.ensureRepositoryConfigIsValid({
                    'app_id': 'a',
                    'no_index_id': 'b',
                    'token': 'c',
                    'options': {
                        'endpoint': 'd'
                    }
                });
            }).to.throw();

            expect(() => {
                Apisearch.ensureRepositoryConfigIsValid({
                    'no_app_id': 'a',
                    'index_id': 'b',
                    'token': 'c',
                    'options': {
                        'endpoint': 'd'
                    }
                });
            }).to.throw();
        });

        it('Should check type value properly', () => {
            expect(() => {
                Apisearch.ensureIsDefined('hhh', 'field');
            }).to.not.throw();

            expect(() => {
                Apisearch.ensureIsDefined({'a': 'b'}['c'], 'field');
            }).to.throw();
        });
    });
});
