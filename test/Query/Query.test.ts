/**
 * Created by mmoreram on 3/07/18.
 */
import { expect } from 'chai';
import {ItemUUID} from "../../src/Model/ItemUUID";
import {User} from "../../src/Model/User";
import {Query} from '../../src/Query/Query';
import {Polygon, Square, CoordinateAndDistance} from "../../src/Geo/LocationRange";
import {Coordinate} from "../../src/Model/Coordinate";

import {QUERY_DEFAULT_PAGE, QUERY_DEFAULT_SIZE} from '../../src/Query/Query';
import {FILTER_AT_LEAST_ONE, FILTER_MUST_ALL} from "../../src/Query/Filter";

/**
 * Query object tests
 */
describe('Query()', () => {


    describe('-> filterBy...()', () => {
        let query = Query.create(
            '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        );

        it('should filterBy()', () => {
            query.filterBy('source', 'source', ['source_id_123456']);
            expect(query.getFilters()).to.have.property('source');
            expect(query.getFilters().source.toArray()).to.deep.equal({
                field: 'indexed_metadata.source',
                values: ['source_id_123456']
            });
        });

        it('should filterByTypes()', () => {
            query.filterByTypes(['item_uuid_type']);
            expect(query.getFilters()).to.have.property('type');
            expect(query.getFilters().type.toArray()).to.deep.equal({
                values: ['item_uuid_type']
            });
        });

        it('should filterByIds()', () => {
            query.filterByIds(['item_uuid_id']);
            expect(query.getFilters()).to.have.property('id');
            expect(query.getFilters().id.toArray()).to.deep.equal({
                field: 'uuid.id',
                values: ['item_uuid_id']
            });
        });

        it('should filterByRange()', () => {
            query.filterByRange(
                'price',
                'price',
                [],
                ['50..60', '90..100']
            );
            expect(query.getFilters()).to.have.property('price');
            expect(query.getFilters().price.toArray()).to.deep.equal({
                field: 'indexed_metadata.price',
                filter_type: 'range',
                values: ['50..60', '90..100']
            });
        });

        it('should filterByDateRange()', function () {
            query.filterByDateRange(
                'created_at',
                'created_at',
                [],
                ['today..tomorrow']
            );
            expect(query.getFilters()).to.have.property('created_at');
            expect(query.getFilters().created_at.toArray()).to.deep.equal({
                field: 'indexed_metadata.created_at',
                filter_type: 'date_range',
                values: ['today..tomorrow']
            });
        });
    });

    describe('-> filterUniverseBy...()', () => {
        let query = Query.create(
            '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        );

        it('should filterUniverseBy()', () => {
            query.filterUniverseBy('source', ['source_id_123456']);
            expect(query.getUniverseFilters()).to.have.property('source');
            expect(query.getUniverseFilters().source.toArray()).to.include.all.keys(
                'field',
                'values'
            );
            expect(query.getUniverseFilters().source.values).to.include('source_id_123456');
        });

        it('should filterUniverseByTypes()', () => {
            query.filterUniverseByTypes(['item_uuid_type']);
            expect(query.getUniverseFilters()).to.have.property('type');
            expect(query.getUniverseFilters().type.toArray()).to.deep.equal({
                values: ['item_uuid_type']
            });
        });

        it('should filterUniverseByIds()', () => {
            query.filterUniverseByIds(['item_uuid_id']);
            expect(query.getUniverseFilters()).to.have.property('id');
            expect(query.getUniverseFilters().id.toArray()).to.deep.equal({
                field: 'uuid.id',
                values: ['item_uuid_id']
            });
        });

        it('should filterUniverseByRange()', () => {
            query.filterUniverseByRange(
                'price',
                ['0..20'],
                FILTER_MUST_ALL
            );
            expect(query.getUniverseFilters()).to.have.property('price');
            expect(query.getUniverseFilters().price.toArray()).to.deep.equal({
                application_type: 4,
                field: 'indexed_metadata.price',
                filter_type: 'range',
                values: ['0..20']
            });
        });

        it('should filterUniverseByDateRange()', () => {
            query.filterUniverseByDateRange(
                'created_at',
                ['2009-11-04T19:55:41Z..2017-11-04T19:55:41Z'],
                FILTER_MUST_ALL
            );
            expect(query.getUniverseFilters()).to.have.property('created_at');
            expect(query.getUniverseFilters().created_at.toArray()).to.deep.equal({
                application_type: 4,
                field: 'indexed_metadata.created_at',
                filter_type: 'date_range',
                values: ['2009-11-04T19:55:41Z..2017-11-04T19:55:41Z']
            });
        });

        describe('--> When filterUniverseByLocation()', () => {
            let query = Query.createLocated(
                new Coordinate(1.234, -1.234),
                '',
                QUERY_DEFAULT_PAGE,
                QUERY_DEFAULT_SIZE
            );

            it('should filter by Coordinate and Distance points', () => {
                query.filterUniverseByLocation(
                    new CoordinateAndDistance(
                        new Coordinate(1.234, -1.234),
                        '20km'
                    )
                );
                expect(query.getUniverseFilters()).to.have.property('coordinate');
                expect(query.getUniverseFilters().coordinate.toArray()).to.deep.equal({
                    field: 'coordinate',
                    filter_type: 'geo',
                    values: {
                        type: 'CoordinateAndDistance',
                        data: {
                            coordinate: {
                                lat: 1.234,
                                lon: -1.234
                            },
                            distance: '20km'
                        }
                    }
                });
            });

            it('should filter by square area location', () => {
                query.filterUniverseByLocation(
                    new Square(
                        new Coordinate(1.234, 1.234),
                        new Coordinate(-1.234, -1.234)
                    )
                );
                expect(query.getUniverseFilters()).to.have.property('coordinate');
                expect(query.getUniverseFilters().coordinate.toArray()).to.deep.equal({
                    field: 'coordinate',
                    filter_type: 'geo',
                    values: {
                        type: 'Square',
                        data: {
                            'top_left': {
                                lat: 1.234,
                                lon: 1.234
                            },
                            'bottom_right': {
                                lat: -1.234,
                                lon: -1.234
                            },
                        }
                    }
                });
            });

            it('should filter by polygon area location', () => {
                query.filterUniverseByLocation(
                    new Polygon([
                        new Coordinate(1.234, 1.234),
                        new Coordinate(-1.234, -1.234),
                        new Coordinate(2.234, 2.234)
                    ])
                );
                expect(query.getUniverseFilters()).to.have.property('coordinate');
                expect(query.getUniverseFilters().coordinate.toArray()).to.deep.equal({
                    field: 'coordinate',
                    filter_type: 'geo',
                    values: {
                        type: 'Polygon',
                        data: {
                            'coordinates': [
                                {
                                    lat: 1.234,
                                    lon: 1.234
                                },
                                {
                                    lat: -1.234,
                                    lon: -1.234
                                },
                                {
                                    lat: 2.234,
                                    lon: 2.234
                                }
                            ]
                        }
                    }
                });
            });
        });
    });

    describe('-> aggregateBy...()', () => {
        let query = Query.create(
            '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        );

        it('should aggregateBy()', () => {
            query.aggregateBy(
                'source',
                'source',
                FILTER_AT_LEAST_ONE
            );

            expect(query.getAggregations()).to.have.property('source');
            expect(query.getAggregations().source.toArray()).to.deep.equal({
                field: 'indexed_metadata.source',
                name: 'source',
            });
        });

        it('should aggregateByRange()', () => {
            query.aggregateByRange(
                'price',
                'price',
                ['some_option'],
                FILTER_MUST_ALL
            );
            expect(query.getAggregations()).to.have.property('price');
            expect(query.getAggregations().price.toArray()).to.deep.equal({
                application_type: 4,
                field: 'indexed_metadata.price',
                filter_type: 'range',
                name: 'price',
                subgroup: [
                    'some_option'
                ]
            });
        });

        it('should aggregateByDateRange()', () => {
            query.aggregateByDateRange(
                'created_at',
                'created_at',
                ['some_option'],
                FILTER_MUST_ALL
            );
            expect(query.getAggregations()).to.have.property('created_at');
            expect(query.getAggregations().created_at.toArray()).to.deep.equal({
                application_type: 4,
                field: 'indexed_metadata.created_at',
                filter_type: 'date_range',
                name: 'created_at',
                subgroup: [
                    'some_option'
                ]
            });
        });
    });

    describe('-> When promoting uuids', () => {
        let query = Query.create(
            '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        );

        it('should promote one uuid when calling promoteUUID()', () => {
            query.promoteUUID(
                new ItemUUID('spiderman', 'marvel')
            );
            expect(query.getItemsPromoted().length).to.equal(1);
            expect(query.getItemsPromoted()[0].toArray()).to.deep.equal({
                id: 'spiderman',
                type: 'marvel'
            });
        });

        it('should promote many uuids when calling promoteUUIDs()', () => {
            // Promote thi two uuids into an existing array from the last test
            query.promoteUUIDs(
                new ItemUUID('ironman', 'marvel'),
                new ItemUUID('thor', 'marvel')
            );
            expect(query.getItemsPromoted().length).to.equal(2);
            expect(query.getItemsPromoted()[0].toArray()).to.deep.equal({
                id: 'ironman',
                type: 'marvel'
            });
        });
    });

    describe('-> When excluding uuids', () => {
        let query = Query.create(
            '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        );

        query.excludeUUID(
            new ItemUUID('hulk', 'marvel')
        );

        it('should exist "excluded_ids" property on Query object', () => {
            expect(query.getFilters()).to.have.property('excluded_ids');
        });

        it('should "excluded_ids" property be an object type of Filter', () => {
            expect(query.getFilters()['excluded_ids'].constructor.name).to.be.equal('Filter');
        });

        it('should exclude one uuid when calling excludeUUID()', () => {
            expect(query.getFilters()['excluded_ids'].values).to.include('hulk~marvel');
        });

        it('should exclude many uuids when calling excludeUUIDs()', () => {
            query.excludeUUIDs(
                new ItemUUID('captain-america', 'marvel'),
                new ItemUUID('daredevil', 'marvel')
            );
            expect(query.getFilters()['excluded_ids'].values).to.deep.equal([
                'captain-america~marvel',
                'daredevil~marvel'
            ]);
        });
    });

    describe('-> When switching query setters', () => {
        let query = Query.create(
            '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        );

        it('should set and unset results properly', () => {
            query.disableResults();
            expect(query.areResultsEnabled()).to.be.false;
            query.enableResults();
            expect(query.areResultsEnabled()).to.be.true;
        });

        it('should set and unset aggregations properly', () => {
            query.disableAggregations();
            expect(query.areAggregationsEnabled()).to.be.false;
            query.enableAggregations();
            expect(query.areAggregationsEnabled()).to.be.true;
        });

        it('should set and unset suggestions properly', () => {
            query.enableSuggestions();
            expect(query.areSuggestionsEnabled()).to.be.true;
            query.disableSuggestions();
            expect(query.areSuggestionsEnabled()).to.be.false;
        });

        it('should set and unset highlights properly', () => {
            query.enableHighlights();
            expect(query.areHighlightsEnabled()).to.be.true;
            query.disableHighlights();
            expect(query.areHighlightsEnabled()).to.be.false;
        });
    });

    describe('-> When setting/unsetting a User on query', () => {
        let query = Query.create(
            '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        );

        it('should set a user when calling byUser() method', () => {
            query.byUser(
                new User('some_user_uuid')
            );
            expect(query.getUser().toArray()).to.deep.equal({
                id:'some_user_uuid'
            });
        });
        it('should unset the user when calling anonymously() on a user query', () => {
            query.anonymously();
            expect(query.getUser()).to.be.equal(null);
        });
    });
});
