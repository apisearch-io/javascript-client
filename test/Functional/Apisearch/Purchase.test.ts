import {Query} from "../../../src/Query/Query";
import {Item} from "../../../src/Model/Item";
import {ItemUUID} from "../../../src/Model/ItemUUID";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import {Config} from "../../../src/Config/Config";
import FunctionalTest from "./FunctionalTest";

/**
 *
 */
describe('Purchase', () => {
    const repository = FunctionalTest.createRepository();
    const indexUUID = IndexUUID.createById('default');

    it('should properly make a purchase', async () => {
        try {
            await repository.deleteIndex(indexUUID);
        } catch(e) {}

        await repository.createIndex(indexUUID, Config.createFromArray({}));
        const item1 = Item.create(ItemUUID.createByComposedUUID('1~item'));
        repository.addItem(item1);
        await repository.flush();
        const result = await repository.query(Query.createMatchAll());
        const items = result.getItems();
        const nItem0 = items[0];

        await repository.purchase(nItem0.getIndexUUID(), 'user1234', []);
        await repository.purchase(nItem0.getIndexUUID(), 'user1234', []);
        await repository.purchase(nItem0.getIndexUUID(), 'user5678', []);
    });
});
