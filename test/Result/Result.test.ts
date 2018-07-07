import { expect } from 'chai';
import Counter from "../../src/Result/Counter";
import Query from "../../src/Query/Query";
import Result from "../../src/Result/Result";
import ItemUUID from "../../src/Model/ItemUUID";
import Item from "../../src/Model/Item";
import Aggregation from "../../src/Result/Aggregation";
import Aggregations from "../../src/Result/Aggregations";

describe('Result/', () => {
    describe('Counter', () => {
        describe('()', () => {
            let result = new Result(
                Query.createMatchAll(),
                2, 1
            );
            let resultAsArray = result.toArray();

            it('Should work properly', () => {
                expect(result.getQuery()).to.be.deep.equal(Query.createMatchAll());
                expect(resultAsArray.query).to.be.deep.equal(Query.createMatchAll().toArray());
                expect(result.getTotalHits()).to.be.equal(1);
                expect(resultAsArray.total_hits).to.be.equal(1);
                expect(result.getTotalItems()).to.be.equal(2);
                expect(resultAsArray.total_items).to.be.equal(2);
                expect(result.getItems().length).to.be.equal(0);
                expect(result.getFirstItem()).to.be.null;
                expect(result.getSuggests().length).to.be.equal(0);
                expect(result.getAggregations()).to.be.null;
            });
        });

        describe('Test items', () => {
            let result = new Result(
                Query.createMatchAll(),
                2, 1
            );
            result.addItem(Item.create(ItemUUID.createByComposedUUID('1~product')));
            result.addItem(Item.create(ItemUUID.createByComposedUUID('2~product')));
            let resultAsArray = result.toArray();

            it('Should work properly', () => {
                expect(result.getItems().length).to.be.equal(2);
                expect(resultAsArray.items.length).to.be.equal(2);
                expect(result.getFirstItem().getId()).to.be.equal('1');
                expect(resultAsArray.items[0].uuid.id).to.be.equal('1');
            });
        });

        describe('Test aggregations', () => {
            let result = new Result(
                Query.createMatchAll(),
                2, 1
            );
            let aggregations = new Aggregations(2);
            aggregations.addAggregation('blabla', new Aggregation('hola', 0, 10, ['hola']));
            aggregations.addAggregation('empty', new Aggregation('empty', 0, 10, []));
            result.setAggregations(aggregations);
            let resultAsArray = result.toArray();

            it('Should work properly', () => {
                expect(result.getAggregations()).to.not.be.null;
                expect(resultAsArray.aggregations.aggregations.blabla.name).to.be.equal('hola');
                expect(result.getAggregation('blabla').getName()).to.be.equal('hola');
                expect(result.getAggregation('adeu')).to.be.null;
                expect(result.hasNotEmptyAggregation('blabla')).to.be.true;
                expect(result.hasNotEmptyAggregation('empty')).to.be.false;
                expect(result.hasNotEmptyAggregation('adeu')).to.be.false;
            });
        });

        describe('Test suggests', () => {
            let result = new Result(
                Query.createMatchAll(),
                2, 1
            );
            result.addSuggest('hola');
            let resultAsArray = result.toArray();

            it('Should work properly', () => {
                expect(result.getSuggests()).to.be.deep.equal(['hola']);
                expect(resultAsArray.suggests).to.be.deep.equal(['hola']);
            });
        });

        describe('Test items grouped by type', () => {
            let result = new Result(
                Query.createMatchAll(),
                2, 1
            );
            result.addItem(Item.create(ItemUUID.createByComposedUUID('1~type1')));
            result.addItem(Item.create(ItemUUID.createByComposedUUID('3~type2')));
            result.addItem(Item.create(ItemUUID.createByComposedUUID('1~type3')));
            result.addItem(Item.create(ItemUUID.createByComposedUUID('4~type2')));
            result.addItem(Item.create(ItemUUID.createByComposedUUID('10~type1')));

            it('Should work properly', () => {
                expect(result.getItemsByType('type1').length).to.be.equal(2);
                expect(result.getItemsByType('type2').length).to.be.equal(2);
                expect(result.getItemsByType('type3').length).to.be.equal(1);
                expect(result.getItemsByType('nonexisting').length).to.be.equal(0);

                expect(Object.keys(result.getItemsGroupedByTypes()).length).to.be.equal(3);
                expect(result.getItemsGroupedByTypes()['type1'].length).to.be.equal(2);
                expect(result.getItemsGroupedByTypes()['type2'].length).to.be.equal(2);
                expect(result.getItemsGroupedByTypes()['type3'].length).to.be.equal(1);
                expect(result.getItemsGroupedByTypes()['type-nonexisting']).to.be.undefined;

                expect(result.getItemsByTypes(['type1', 'type2']).length).to.be.equal(4);
                expect(result.getItemsByTypes(['type1', 'type3']).length).to.be.equal(3);
                expect(result.getItemsByTypes(['type1', 'type-nonexisting']).length).to.be.equal(2);
                expect(result.getItemsByTypes(['type-nonexisting']).length).to.be.equal(0);
            });
        });


        describe('create from array all values', () => {
            let resultAsArray = {
                'query': {
                    'q': 'engonga',
                },
                'total_items': 10,
                'total_hits': 20,
                'aggregations': {
                    'aggregations': {
                        'gogo': {
                            'name': 'hola'
                        }
                    }
                },
                'suggests': [
                    'sug1',
                    'sug2'
                ],
                'items': [
                    {
                        'uuid': {
                            'id': 1,
                            'type': 'product'
                        }
                    },
                    {
                        'uuid': {
                            'id': 2,
                            'type': 'product'
                        },
                    }
                ]
            };
            let result = Result.createFromArray(resultAsArray);
            expect(result.getQuery().toArray()).to.be.deep.equal(Query.create('engonga').toArray());
            expect(result.getTotalItems()).to.be.equal(10);
            expect(result.getTotalHits()).to.be.equal(20);
            expect(result.getAggregation('gogo').getName()).to.be.equal('hola');
            expect(result.getSuggests()).to.be.deep.equal(['sug1', 'sug2']);
            expect(result.getItems().length).to.be.equal(2);
            expect(result.getFirstItem().getType()).to.be.equal('product');
        });
    });
});
