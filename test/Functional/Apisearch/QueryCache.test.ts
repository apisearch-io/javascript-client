import { expect } from 'chai';
import {Query} from "../../../src/Query/Query";
import {Item} from "../../../src/Model/Item";
import {ItemUUID} from "../../../src/Model/ItemUUID";
import {FILTER_MUST_ALL, FILTER_AT_LEAST_ONE} from "../../../src/Query/Filter";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import {Config} from "../../../src/Config/Config";
import FunctionalTest from "./FunctionalTest";
import {CacheClient} from "../../../src/Http/CacheClient";

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 *
 */
describe('Queries without cache', () => {
    const repository = FunctionalTest.createCachedRepository();
    const indexUUID = IndexUUID.createById('default');

    it('should properly make a query', async () => {
        try {
            await repository.deleteIndex(indexUUID);
        } catch (e) {
        }

        await repository.createIndex(indexUUID, Config.createFromArray({}));
        await repository.addItems([
            Item.createFromArray({
                uuid: {id: "1", type: "p"},
                searchable_metadata: {
                    f: "number1",
                },
            }),
            Item.createFromArray({
                uuid: {id: "2", type: "p"},
                searchable_metadata: {
                    f: "number2",
                },
            }),
        ]);
        await repository.flush();
        const res1 = await repository.query(Query.create("number2"));
        expect(res1.getTotalHits()).to.be.equal(1);
        let finalQueryText;
        repository.query(Query.create("n"));
        repository.query(Query.create("nu"));
        repository.query(Query.create("num"));
        repository.query(Query.create("numb"));
        repository.query(Query.create("numbe"));
        repository.query(Query.create("number")).then(function() {
            finalQueryText = 'number';
        });

        const res2 = await repository.query(Query.create("number2")).then(function(result) {
            finalQueryText = 'number2';

            return result;
        });
        expect(res2.getTotalHits()).to.be.equal(1);
        await delay(1000);
        expect(finalQueryText).to.be.equal('number2');
    });
});
