import { expect } from 'chai';
import {Counter} from "../../src/Result/Counter";
import {Result} from "../../src/Result/Result";
import {ItemUUID} from "../../src/Model/ItemUUID";
import {Item} from "../../src/Model/Item";
import {ResultAggregation} from "../../src/Result/ResultAggregation";
import {ResultAggregations} from "../../src/Result/ResultAggregations";
import {HttpHelper} from "../HttpHelper";

describe('Result/', () => {
    describe('Counter', () => {
        describe('()', () => {
            let result = new Result(
                '123',
                2, 1
            );
            let resultAsArray = result.toArray();

            it('Should work properly', () => {
                expect(result.getQueryUUID()).to.be.equal('123');
                expect(result.getTotalHits()).to.be.equal(1);
                expect(resultAsArray.total_hits).to.be.equal(1);
                expect(result.getTotalItems()).to.be.equal(2);
                expect(resultAsArray.total_items).to.be.equal(2);
                expect(result.getItems().length).to.be.equal(0);
                expect(result.getFirstItem()).to.be.null;
                expect(result.getSuggestions().length).to.be.equal(0);
                expect(result.getAggregations()).to.be.null;
                expect(result.getAutocomplete()).to.be.null;
                expect(result.getMetadata()).to.be.deep.equal({});

                result = HttpHelper.emulateHttpTransport(result);
                expect(result.getQueryUUID()).to.be.equal('123');
                expect(result.getTotalHits()).to.be.equal(1);
                expect(result.getTotalItems()).to.be.equal(2);
                expect(result.getItems().length).to.be.equal(0);
                expect(result.getFirstItem()).to.be.null;
                expect(result.getSuggestions().length).to.be.equal(0);
                expect(result.getAggregations()).to.be.null;
                expect(result.getAutocomplete()).to.be.null;
                expect(result.getMetadata()).to.be.deep.equal({});
            });
        });

        describe('Test items', () => {
            let result = new Result(
                '123',
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

                result = HttpHelper.emulateHttpTransport(result);
                expect(result.getItems().length).to.be.equal(2);
                expect(result.getFirstItem().getId()).to.be.equal('1');
            });
        });

        describe('Test aggregations', () => {
            let result = new Result(
                '123',
                2, 1
            );
            let aggregations = new ResultAggregations(2);
            aggregations.addAggregation('blabla', new ResultAggregation('hola', 0, 10, ['hola']));
            aggregations.addAggregation('empty', new ResultAggregation('empty', 0, 10, []));
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

                result = HttpHelper.emulateHttpTransport(result);
                expect(result.getAggregations()).to.not.be.null;
                expect(result.getAggregation('blabla').getName()).to.be.equal('hola');
                expect(result.getAggregation('adeu')).to.be.null;
                expect(result.hasNotEmptyAggregation('blabla')).to.be.true;
                expect(result.hasNotEmptyAggregation('empty')).to.be.false;
                expect(result.hasNotEmptyAggregation('adeu')).to.be.false;
            });
        });

        describe('Test suggestions', () => {
            let result = Result.create(
                '123',
                0, 0, new ResultAggregations(0), ['hola'], []
            );

            let resultAsArray = result.toArray();

            it('Should work properly', () => {
                expect(result.getSuggestions()).to.be.deep.equal(['hola']);
                expect(resultAsArray.suggests).to.be.deep.equal(['hola']);
            });
        });

        describe('Test autocomplete', () => {
            let result = Result.create(
                '123',
                0, 0, new ResultAggregations(0), [], [], 'lolazo'
            );

            let resultAsArray = result.toArray();
            let resultObject = Result.createFromArray(resultAsArray);

            it('Should work properly', () => {
                expect(result.getAutocomplete()).to.be.equal('lolazo');
                expect(resultAsArray.autocomplete).to.be.equal('lolazo');
                expect(resultObject.getAutocomplete()).to.be.equal('lolazo');
            });

            let result2 = Result.create(
                '123',
                0, 0, new ResultAggregations(0), [], [], null
            );

            let resultAsArray2 = result2.toArray();
            let resultObject2 = Result.createFromArray(resultAsArray2);

            it('Should work properly', () => {
                expect(result2.getAutocomplete()).to.be.null;
                expect(resultAsArray2.autocomplete).to.be.undefined;
                expect(resultObject2.getAutocomplete()).to.be.null;
            });
        });

        describe('Test items grouped by type', () => {
            let result = new Result(
                '123',
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

                result = HttpHelper.emulateHttpTransport(result);
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
                'query_uuid': '123',
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
                ],
                'metadata': {
                    'a': 'b',
                    'c': 123
                },
            };
            let result = Result.createFromArray(resultAsArray);
            expect(result.getQueryUUID()).to.be.equal('123');
            expect(result.getTotalItems()).to.be.equal(10);
            expect(result.getTotalHits()).to.be.equal(20);
            expect(result.getAggregation('gogo').getName()).to.be.equal('hola');
            expect(result.getSuggestions()).to.be.deep.equal(['sug1', 'sug2']);
            expect(result.getItems().length).to.be.equal(2);
            expect(result.getFirstItem().getType()).to.be.equal('product');
            expect(result.getMetadata()).to.be.deep.equal({'a': 'b', 'c': 123});
            expect(result.getMetadataValue('a')).to.be.equal('b');
            expect(result.getMetadataValue('c')).to.be.equal(123);
            expect(result.getMetadataValue('X')).to.be.null;

            result = HttpHelper.emulateHttpTransport(result);
            expect(result.getQueryUUID()).to.be.equal('123');
            expect(result.getTotalItems()).to.be.equal(10);
            expect(result.getTotalHits()).to.be.equal(20);
            expect(result.getAggregation('gogo').getName()).to.be.equal('hola');
            expect(result.getSuggestions()).to.be.deep.equal(['sug1', 'sug2']);
            expect(result.getItems().length).to.be.equal(2);
            expect(result.getFirstItem().getType()).to.be.equal('product');
            expect(result.getMetadata()).to.be.deep.equal({'a': 'b', 'c': 123});
            expect(result.getMetadataValue('a')).to.be.equal('b');
            expect(result.getMetadataValue('c')).to.be.equal(123);
            expect(result.getMetadataValue('X')).to.be.null;
        });
    });



    describe('-> Test multiresult', () => {
        it('should work properly', () => {
            let result = Result.createMultiresults({
                'res1': Result.create('1', 10, 3, null, [], []),
                'res2': Result.create('2', 10, 3, null, [], []),
                'res3': Result.create('3', 10, 3, null, [], []),
            });

            expect(Object.keys(result.getSubresults()).length).to.be.equal(3);
            expect(result.getSubresults()['res1'].getQueryUUID()).to.be.equal('1');
            expect(result.getSubresults()['res2'].getQueryUUID()).to.be.equal('2');
            expect(result.getSubresults()['res3'].getQueryUUID()).to.be.equal('3');
            result = HttpHelper.emulateHttpTransport(result);
            expect(Object.keys(result.getSubresults()).length).to.be.equal(3);
            expect(result.getSubresults()['res1'].getQueryUUID()).to.be.equal('1');
            expect(result.getSubresults()['res2'].getQueryUUID()).to.be.equal('2');
            expect(result.getSubresults()['res3'].getQueryUUID()).to.be.equal('3');
        });
    });
});
