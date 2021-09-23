import { expect } from 'chai';
import {Query} from "../../../src/Query/Query";
import {Item} from "../../../src/Model/Item";
import {ItemUUID} from "../../../src/Model/ItemUUID";
import {FILTER_MUST_ALL, FILTER_AT_LEAST_ONE} from "../../../src/Query/Filter";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import {Config} from "../../../src/Config/Config";
import FunctionalTest from "./FunctionalTest";
import {CacheClient} from "../../../src/Http/CacheClient";

/**
 *
 */
describe('Queries without cache', () => {
    const repository = FunctionalTest.createRepository();
    const indexUUID = IndexUUID.createById('default');

    it('should properly make a query', async () => {
        try {
            await repository.deleteIndex(indexUUID);
        } catch(e) {}

        await repository.createIndex(indexUUID, Config.createFromArray({}));
        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalItems()).to.be.equal(0);
            })
            .catch(error => {
                expect.fail();
            });
    });

    it('should create properly an item and make a query', async () => {
        repository.addItem(Item.create(ItemUUID.createByComposedUUID('1~item')));
        repository.addItem(Item.create(ItemUUID.createByComposedUUID('2~item')));
        repository.addItem(Item.create(ItemUUID.createByComposedUUID('3~item')));
        repository.addItems([
            Item.create(ItemUUID.createByComposedUUID('3~item')),
            Item.create(ItemUUID.createByComposedUUID('4~item')),
            Item.create(ItemUUID.createByComposedUUID('5~item'))
        ]);

        await repository.flush();
        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalItems()).to.be.equal(5);
                expect(result.getTotalHits()).to.be.equal(5);
            });

        repository.deleteItem(ItemUUID.createByComposedUUID('1~item'));
        repository.deleteItems([
            ItemUUID.createByComposedUUID('1~item'),
            ItemUUID.createByComposedUUID('2~item'),
            ItemUUID.createByComposedUUID('3~item'),
        ]);

        await repository.flush();
        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalItems()).to.be.equal(2);
                expect(result.getTotalHits()).to.be.equal(2);
            });

        repository.deleteItems([
            ItemUUID.createByComposedUUID('4~item'),
            ItemUUID.createByComposedUUID('4~item'),
            ItemUUID.createByComposedUUID('5~item'),
        ]);

        await repository.flush();
        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalItems()).to.be.equal(0);
                expect(result.getTotalHits()).to.be.equal(0);
            });
    });



    it('should create properly an item and make a complex query', async () => {
        repository.addItem(Item.create(
            ItemUUID.createByComposedUUID('1~item'),
            {
                'field1': 'value1'
            },
            {
                'category': [
                    1,2
                ]
            },
            {
                'name': 'This is my house'
            },
            [
                '12345'
            ]
        ));

        await repository.flush();
        await repository
            .query(Query.create('house'))
            .then(result => {
                expect(result.getTotalItems()).to.be.equal(1);
                expect(result.getTotalHits()).to.be.equal(1);
            });

        await repository
            .query(Query.createMatchAll().filterUniverseBy('category', [1,2], FILTER_MUST_ALL))
            .then(result => {
                expect(result.getTotalItems()).to.be.equal(1);
                expect(result.getTotalHits()).to.be.equal(1);
            });
    });

    it('should be able to work with multiqueries', async() => {

        repository.addItem(Item.create(
            ItemUUID.createByComposedUUID('1~item'), {}, {},
            {'name': 'This is my house'},
        ));

        repository.addItem(Item.create(
            ItemUUID.createByComposedUUID('2~item'), {}, {},
            {'name': 'This is my country'},
        ));

        await repository.flush();

        await repository
            .query(Query.createMultiquery({
                'q1': Query.create('house'),
                'q2': Query.create('country')
            }))
            .then(result => {
                const r1 = result.getSubresults()['q1'];
                expect(r1.getTotalItems()).to.be.equal(2);
                expect(r1.getTotalHits()).to.be.equal(1);
                expect(r1.getFirstItem().getId()).to.be.equal('1');
                expect(r1.getQueryUUID()).to.not.be.undefined;
                const r2 = result.getSubresults()['q2'];
                expect(r2.getTotalItems()).to.be.equal(2);
                expect(r2.getTotalHits()).to.be.equal(1);
                expect(r2.getFirstItem().getId()).to.be.equal('2');
                expect(r2.getQueryUUID()).to.not.be.undefined;
            });
    });


    it('should be able to build ranges', async() => {
        const items = [
            Item.create(ItemUUID.createByComposedUUID('1~item'), {}, {'price': 30}),
            Item.create(ItemUUID.createByComposedUUID('2~item'), {}, {'price': 300}),
            Item.create(ItemUUID.createByComposedUUID('3~item'), {}, {'price': 500}),
            Item.create(ItemUUID.createByComposedUUID('4~item'), {}, {'price': 900}),
            Item.create(ItemUUID.createByComposedUUID('5~item'), {}, {'price': 1000}),
            Item.create(ItemUUID.createByComposedUUID('6~item'), {}, {'price': 1200})
        ];

        repository.addItems(items);
        await repository.flush();

        await repository
            .query(Query
                .createMatchAll()
                .aggregateByRange(
                    'price',
                    'price',
                    ['..100', '100..600', '600..1100', '1100..', '0..', '..2000', '-2000..1000'],
                    FILTER_AT_LEAST_ONE
                )
            )
            .then(result => {
                const aggregations = result.getAggregation('price');
                const counters = aggregations.getCounters();

                expect(counters['_..100'].getN()).to.be.equal(1);
                expect(counters['_100..600'].getN()).to.be.equal(2);
                expect(counters['_600..1100'].getN()).to.be.equal(2);
                expect(counters['_1100..'].getN()).to.be.equal(1);
                expect(counters['_0..'].getN()).to.be.equal(6);
                expect(counters['_..2000'].getN()).to.be.equal(6);
                expect(counters['_-2000..1000'].getN()).to.be.equal(4);
            });
    });

    it('should be able to work with suggestions', async() => {
        const items = [
            Item.create(ItemUUID.createByComposedUUID('1~item'), {}, {}, {}, [], ['sug1']),
        ];

        repository.addItems(items);
        await repository.flush();
        await repository
            .query(Query
                .create('sug')
                .setNumberOfSuggestions(10)
            )
            .then(result => {
                expect(result.getSuggestions()).to.be.deep.equal(['<em>Sug1</em>']);
            });
    });

    it('should be able to work with highlights', async() => {
        const items = [
            Item.create(ItemUUID.createByComposedUUID('1~item'), {
                'name': "item result"
            }, {}, {
                'name': 'item result'
            }),
        ];

        repository.addItems(items);
        await repository.flush();

        await repository
            .query(Query
                .create('it')
                .enableHighlights()
            )
            .then(result => {
                expect(result.getFirstItem().getHighlights().name).to.be.equal('<em>item</em> result');
            });
    });


    it('should be able to work with strange characters', async() => {
        const items = [
            Item.create(ItemUUID.createByComposedUUID('1~item'), {
                'name': "strange # character"
            }, {}, {
                'name': 'strange # character'
            }),
        ];

        repository.addItems(items);
        await repository.flush();

        await repository
            .query(Query
                .create('strange # char')
            )
            .then(result => {
                expect(result.getFirstItem().getUUID().getId()).to.be.equal("1");
            });
    });
});

/**
 *
 */
describe('Queries with cache', () => {
    const repository = FunctionalTest.createCachedRepository();
    const cachedClient = repository.getHttpClient();
    const indexUUID = IndexUUID.createById('default');

    it('should properly make a query twice with the same result', async () => {

        if (!(cachedClient instanceof CacheClient)) {
            expect.fail('Cache should be enabled');
        }

        try {
            await repository.deleteIndex(indexUUID);
        } catch (e) {
        }

        await repository.createIndex(indexUUID, Config.createFromArray({}));
        repository.addItem(Item.create(ItemUUID.createByComposedUUID('1~item'), {}, {}, {'title': "Hello"}));
        repository.addItem(Item.create(ItemUUID.createByComposedUUID('2~item'), {}, {}, {'title': "Hello"}));
        repository.addItem(Item.create(ItemUUID.createByComposedUUID('3~item')));
        repository.addItems([
            Item.create(ItemUUID.createByComposedUUID('3~item')),
            Item.create(ItemUUID.createByComposedUUID('4~item')),
            Item.create(ItemUUID.createByComposedUUID('5~item'))
        ]);

        await repository.flush();

        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(5);
            });

        expect(cachedClient.size()).to.be.equal(1);
        expect(cachedClient.getNumberOfHits()).to.be.equal(0);

        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(5);
            });

        expect(cachedClient.size()).to.be.equal(1);
        expect(cachedClient.getNumberOfHits()).to.be.equal(1);

        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(5);
            });

        expect(cachedClient.size()).to.be.equal(1);
        expect(cachedClient.getNumberOfHits()).to.be.equal(2);

        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(5);
            });


        expect(cachedClient.size()).to.be.equal(1);
        expect(cachedClient.getNumberOfHits()).to.be.equal(3);
        cachedClient.flushCache();
        expect(cachedClient.size()).to.be.equal(0);
        expect(cachedClient.getNumberOfHits()).to.be.equal(3);

        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(5);
            });

        expect(cachedClient.size()).to.be.equal(1);
        expect(cachedClient.getNumberOfHits()).to.be.equal(3);

        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(5);
            });

        expect(cachedClient.size()).to.be.equal(1);
        expect(cachedClient.getNumberOfHits()).to.be.equal(4);

        await repository
            .query(Query.create('Hello'))
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(2);
            });

        expect(cachedClient.size()).to.be.equal(2);
        expect(cachedClient.getNumberOfHits()).to.be.equal(4);

        await repository
            .query(Query.createMatchAll())
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(5);
            });

        expect(cachedClient.size()).to.be.equal(2);
        expect(cachedClient.getNumberOfHits()).to.be.equal(5);

        await repository
            .query(Query.create('Hello'))
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(2);
            });

        expect(cachedClient.size()).to.be.equal(2);
        expect(cachedClient.getNumberOfHits()).to.be.equal(6);

        await repository
            .query(Query.create('Bye'))
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(0);
            });

        expect(cachedClient.size()).to.be.equal(3);
        expect(cachedClient.getNumberOfHits()).to.be.equal(6);

        await repository
            .query(Query.create('Bye'))
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(0);
            });

        expect(cachedClient.size()).to.be.equal(3);
        expect(cachedClient.getNumberOfHits()).to.be.equal(7);
        cachedClient.flushCache();
        expect(cachedClient.size()).to.be.equal(0);
        expect(cachedClient.getNumberOfHits()).to.be.equal(7);
    });
});
