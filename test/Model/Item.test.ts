import { expect } from 'chai';
import {Item} from "../../src/Model/Item";
import {ItemUUID} from "../../src/Model/ItemUUID";
import {AppUUID} from "../../src/Model/AppUUID";
import {IndexUUID} from "../../src/Model/IndexUUID";
import {Coordinate} from "../../src/Model/Coordinate";

describe('Model/', () => {
    describe('Item', () => {
        describe('.createLocated()', () => {
            let item = Item.createLocated(
                new ItemUUID('1', 'product'),
                new Coordinate(0.0, 0.0),
                {},
                {},
            );

            it('Should work properly with default values', () => {
                expect(item.getCoordinate()).to.not.be.equal(null);
                expect(item.getUUID()).to.not.be.equal(null);
                expect(item.getId()).to.be.equal('1');
                expect(item.getType()).to.be.equal('product');
                expect(item.getMetadata()).to.be.deep.equal({});
                expect(item.getIndexedMetadata()).to.be.deep.equal({});
                expect(item.getSearchableMetadata()).to.be.deep.equal({});
                expect(item.getExactMatchingMetadata()).to.be.deep.equal([]);
                expect(item.getSuggest()).to.be.deep.equal([]);
                expect(item.getDistance()).to.be.equal(undefined);
                expect(item.getScore()).to.be.equal(undefined);
            });
        });

        describe('.createLocated() from array', () => {
            let item = Item.createFromArray({
                'uuid': {'id': '1', 'type': 'product'},
                'coordinate': {'lat': 0.0, 'lon': 0.0}
            });

            it('Should work properly', () => {
                expect(item.getCoordinate()).to.not.be.equal(null);
                expect(item.getUUID()).to.not.be.equal(null);
                expect(item.getId()).to.be.equal('1');
                expect(item.getType()).to.be.equal('product');
            });
        });

        describe('.create()', () => {
            let item = Item.create(
                new ItemUUID('1', 'product'),
                {},
                {},
            );

            it('Should work properly', () => {
                expect(item.getCoordinate()).to.be.equal(null);
                expect(item.getUUID()).to.not.be.equal(null);
                expect(item.getId()).to.be.equal('1');
                expect(item.getType()).to.be.equal('product');
            });
        });

        describe('.create() from array', () => {
            let item = Item.createFromArray({
                'uuid': {'id': '1', 'type': 'product'},
                'metadata': {},
                'indexed_metadata': {},
                'searchable_metadata': {},
                'exact_matching_metadata': [],
                'suggest': []
            });

            it('Should work properly', () => {
                expect(item.getCoordinate()).to.be.equal(null);
                expect(item.getUUID()).to.not.be.equal(null);
                expect(item.getId()).to.be.equal('1');
                expect(item.getType()).to.be.equal('product');
                expect(item.getMetadata()).to.be.deep.equal({});
                expect(item.getIndexedMetadata()).to.be.deep.equal({});
                expect(item.getSearchableMetadata()).to.be.deep.equal({});
                expect(item.getExactMatchingMetadata()).to.be.deep.equal([]);
                expect(item.getSuggest()).to.be.deep.equal([]);
            });
        });

        describe('.createFromArray() with bad items', () => {
            expect(function(){Item.createFromArray({'id': '1'})}).to.throw();
            expect(function(){Item.createFromArray({'uuid': {'id': '1', 'type': 'item'}, 'coordinate': {'lon': 0.0}})}).to.throw();
        });

        describe('.createFromArray() with distance', () => {
            let item = Item.createFromArray({
                'uuid': {'id': '1', 'type': 'product'},
                'distance': 0.1
            });

            it('Should work properly', () => {
                expect(item.getDistance()).to.be.equal(0.1);
            });
        });

        describe(' Metadata', () => {
            let metadata = {'a': '1', 'b': 2};
            let item = Item.createFromArray({
                'uuid': {
                    'id': '1',
                    'type': 'product'
                },
                'metadata': metadata
            });

            expect(item.getMetadata()).to.be.deep.equal(metadata);
            expect(item.getAllMetadata()).to.be.deep.equal(metadata);
            expect(item.get('a')).to.be.equal('1');
            expect(item.get('b')).to.be.equal(2);

            item.setMetadata({
                'c': true,
                'd': {
                    'e': 'hola'
                }
            });

            expect(item.getMetadata()['d']['e']).to.be.equal('hola');
            expect(item.getAllMetadata()['d']['e']).to.be.equal('hola');
            expect(item.get('d')['e']).to.be.equal('hola');

            item.addMetadata('z', 10);
            expect(item.getMetadata()['z']).to.be.equal(10);
        });


        describe(' Indexed Metadata', () => {
            let indexedMetadata = {'a': '1', 'b': 2};
            let item = Item.createFromArray({
                'uuid': {
                    'id': '1',
                    'type': 'product'
                },
                'indexed_metadata': indexedMetadata
            });

            expect(item.getIndexedMetadata()).to.be.deep.equal(indexedMetadata);
            expect(item.getAllMetadata()).to.be.deep.equal(indexedMetadata);
            expect(item.get('a')).to.be.equal('1');
            expect(item.get('b')).to.be.equal(2);

            item.setIndexedMetadata({
                'c': true,
                'd': {
                    'e': 'hola'
                }
            });

            expect(item.getIndexedMetadata()['d']['e']).to.be.equal('hola');
            expect(item.getAllMetadata()['d']['e']).to.be.equal('hola');
            expect(item.get('d')['e']).to.be.equal('hola');

            item.addIndexedMetadata('z', 10);
            expect(item.getIndexedMetadata()['z']).to.be.equal(10);
        });


        describe('.toArray() with default values', () => {
            let itemAsArray = {
                'uuid': {
                    'id': '1',
                    'type': 'product'
                },
                'coordinate': null,
                'metadata': {},
                'indexed_metadata': {},
                'searchable_metadata': {},
                'exact_matching_metadata': [],
                'suggest': [],
                'distance': null,
            };

            expect(Item.createFromArray(itemAsArray).toArray()).to.be.deep.equal({
                'uuid': {
                    'id': '1',
                    'type': 'product'
                }
            });
        });

        describe('.toArray() with all values', () => {
            let itemAsArray = {
                'uuid': {
                    'id': '1',
                    'type': 'product'
                },
                'coordinate': {
                    'lat': 0.0,
                    'lon': 0.0
                },
                'metadata': {'a': 1},
                'indexed_metadata': {'b': 1},
                'searchable_metadata': {'c': 1},
                'exact_matching_metadata': [12345],
                'suggest': ['hola'],
                'distance': 0.45,
                'highlights': {'a': '<strong>1</strong>'},
                'is_promoted': true
            };

            expect(Item.createFromArray(itemAsArray).toArray()).to.be.deep.equal(itemAsArray);
        });

        describe('-> Test score should work properly', () => {
            let item = Item.createFromArray({
                'uuid': {
                    'id': '1',
                    'type': 'product'
                }
            });
            expect(item.getScore()).to.be.undefined;
            expect(item.toArray().score).to.be.undefined;

            item = Item.createFromArray({
                'uuid': {
                    'id': '1',
                    'type': 'product'
                },
                'score': 2.4
            });
            expect(item.getScore()).to.be.equals(2.4);
            expect(item.toArray().score).to.be.equals(2.4);
            expect(item.setScore(3.3).getScore()).to.be.equals(3.3);
        });

        describe('.composedUUID() should work', () => {
            let composedId = '1~product';
            expect(Item.create(ItemUUID.createByComposedUUID(composedId)).composeUUID())
        });

        describe('.appUUID and .indexUUID should work', () => {
            let item = Item.createFromArray({
                'uuid': {
                    'id': '1',
                    'type': 'product'
                }
            });
            expect(item.getAppUUID()).to.be.undefined;
            expect(item.getIndexUUID()).to.be.undefined;
            item = Item.createFromArray(item.toArray());
            expect(item.getAppUUID()).to.be.undefined;
            expect(item.getIndexUUID()).to.be.undefined;

            let appUUID = AppUUID.createById('app1');
            let indexUUID = IndexUUID.createById('index1');
            let itemAsArray = item.toArray();
            itemAsArray.app_uuid = appUUID.toArray();
            itemAsArray.index_uuid = indexUUID.toArray();
            item = Item.createFromArray(itemAsArray);
            expect(item.getAppUUID().toArray()).to.be.deep.equals(appUUID.toArray());
            expect(item.getIndexUUID().toArray()).to.be.deep.equals(indexUUID.toArray());
            item = Item.createFromArray(item.toArray());
            expect(item.getAppUUID().toArray()).to.be.deep.equals(appUUID.toArray());
            expect(item.getIndexUUID().toArray()).to.be.deep.equals(indexUUID.toArray());
        });
    });
});
