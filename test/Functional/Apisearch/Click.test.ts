import { expect } from 'chai';
import {Query} from "../../../src/Query/Query";
import {Item} from "../../../src/Model/Item";
import {ItemUUID} from "../../../src/Model/ItemUUID";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import {Config} from "../../../src/Config/Config";
import FunctionalTest from "./FunctionalTest";

/**
 *
 */
describe('Click', () => {
    const repository = FunctionalTest.createRepository();
    const indexUUID = IndexUUID.createById('default');

    it('should properly make a click', async () => {
        try {
            await repository.deleteIndex(indexUUID);
        } catch(e) {}

        await repository.createIndex(indexUUID, Config.createFromArray({}));
        const item1 = Item.create(ItemUUID.createByComposedUUID('1~item'));
        const item2 = Item.create(ItemUUID.createByComposedUUID('2~item'));
        repository.addItem(item1);
        repository.addItem(item2);
        await repository.flush();
        const result = await repository.query(Query.createMatchAll());
        const items = result.getItems();
        const nItem0 = items[0];
        const nItem1 = items[1];

        await repository.click(nItem0.getAppUUID().composedUUID(), nItem0.getIndexUUID().composedUUID(), nItem0.getUUID().composedUUID(), 'user1234');
        await repository.click(nItem1.getAppUUID().composedUUID(), nItem1.getIndexUUID().composedUUID(), nItem1.getUUID().composedUUID(), 'user5678');
    });
});
