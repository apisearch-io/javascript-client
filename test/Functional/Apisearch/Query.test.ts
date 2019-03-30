import { expect } from 'chai';
import {Query} from "../../../src/Query/Query";
import {Item} from "../../../src/Model/Item";
import {ItemUUID} from "../../../src/Model/ItemUUID";
import {FILTER_MUST_ALL} from "../../../src/Query/Filter";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import {Config} from "../../../src/Config/Config";
import FunctionalTest from "./FunctionalTest";

/**
 *
 */
describe('Apisearch', () => {
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
                console.log(error);
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
    })
});
