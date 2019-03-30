import { expect } from 'chai';
import {Item} from "../../../src/Model/Item";
import {ItemUUID} from "../../../src/Model/ItemUUID";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import {Config} from "../../../src/Config/Config";
import FunctionalTest from "./FunctionalTest";

/**
 *
 */
describe('List Indices', () => {
    const repository = FunctionalTest.createRepository();
    const indexUUID = IndexUUID.createById('default');

    it('should create properly an item and make a query', async () => {
        try {
            await repository.deleteIndex(indexUUID);
        } catch(e) {}

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
                expect(indices[0].getUUID().composedUUID()).to.be.equal('default');
                expect(indices[0].getAppUUID().composedUUID()).to.be.equal('789437438test');
                expect(indices[0].getDocCount()).to.be.equal(5);
            });
    });
});
