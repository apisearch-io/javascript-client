import { expect } from 'chai';
import {Query} from "../../../src/Query/Query";
import {Item} from "../../../src/Model/Item";
import {ItemUUID} from "../../../src/Model/ItemUUID";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import {Config} from "../../../src/Config/Config";
import {Synonym} from "../../../src/Config/Synonym";
import FunctionalTest from "./FunctionalTest";

/**
 *
 */
describe('Configure Index', () => {
    const repository = FunctionalTest.createRepository();
    const indexUUID = IndexUUID.createById('default');

    it('should configure properly the index', async () => {
        try {
            await repository.deleteIndex(indexUUID);
        } catch(e) {}

        await repository.createIndex(indexUUID, Config.createFromArray({}));
        repository.addItem(Item.create(
            ItemUUID.createByComposedUUID('1~item'),
            {},
            {},
            {
                'title': 'eleuterio'
            }
        ));
        await repository.flush();
        await repository
            .query(Query.create('eleuterio'))
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(1);
            });

        await repository
            .query(Query.create('feliciano'))
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(0);
            });

        const config = Config.createFromArray({});
        config.addSynonym(Synonym.createbyWords(['eleuterio', 'feliciano']));
        await repository.configureIndex(indexUUID, config);
        await repository
            .query(Query.create('feliciano'))
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(1);
            });

        repository.addItem(Item.create(
            ItemUUID.createByComposedUUID('1~item'),
            {},
            {},
            {
                'title': 'eleuterio'
            }
        ));

        await repository.flush();
        await repository
            .query(Query.create('feliciano'))
            .then(result => {
                expect(result.getTotalHits()).to.be.equal(1);
            });
    });
});
