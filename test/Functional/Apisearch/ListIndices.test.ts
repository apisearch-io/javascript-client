import { expect } from 'chai';
import Apisearch from "../../../src/Apisearch";
import {Item} from "../../../src/Model/Item";
import {ItemUUID} from "../../../src/Model/ItemUUID";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import {Config} from "../../../src/Config/Config";

/**
 *
 */
describe('List Indices', () => {
    let repository = Apisearch.createRepository(
            {
                'app_id': 'test-ts-app-id',
                'index_id': 'test-ts-index-id',
                'token': '0e4d75ba-c640-44c1-a745-06ee51db4e93',
                'options': {
                    'endpoint': 'http://127.0.0.1:8999',
                }
            }
        );

    const indexUUID = IndexUUID.createById('test-ts-index-id');

    it('should create properly an item and make a query', async () => {
        await repository.deleteIndex(indexUUID);
        await repository.createIndex(indexUUID, Config.createFromArray({}));
        repository.addItem(Item.create(ItemUUID.createByComposedUUID('1~item')));
        repository.addItem(Item.create(ItemUUID.createByComposedUUID('2~item')));
        repository.addItem(Item.create(ItemUUID.createByComposedUUID('3~item')));
        repository.addItems([
            Item.create(ItemUUID.createByComposedUUID('3~item')),
            Item.create(ItemUUID.createByComposedUUID('4~item')),
            Item.create(ItemUUID.createByComposedUUID('5~item'))
        ]);

        await repository.flush();
        await repository.getIndices()
            .then(indices => {
                expect(indices.length).to.be.equal(1);
                expect(indices[0].getUUID().composedUUID()).to.be.equal('test-ts-index-id');
                expect(indices[0].getAppUUID().composedUUID()).to.be.equal('test-ts-app-id');
                expect(indices[0].getDocCount()).to.be.equal(5);
            });
    });
});
