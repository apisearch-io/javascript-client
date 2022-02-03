import {Query} from "../../../src/Query/Query";
import {Item} from "../../../src/Model/Item";
import {ItemUUID} from "../../../src/Model/ItemUUID";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import {Config} from "../../../src/Config/Config";
import FunctionalTest from "./FunctionalTest";

/**
 *
 */
describe('Interact', () => {
    const repository = FunctionalTest.createRepository();
    const indexUUID = IndexUUID.createById('default');

    it('should properly make an interaction', async () => {
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

        await repository.pushInteraction(nItem0.getIndexUUID(), nItem0.getUUID(), 'user1234', 'search1', 'cli');
        await repository.pushInteraction(nItem1.getIndexUUID(), nItem1.getUUID(), 'user5678', 'search2', 'cli');
    });
});
