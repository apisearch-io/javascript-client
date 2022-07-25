/**
 * Created by mmoreram on 3/07/18.
 */
import { expect } from 'chai';
import {AGGREGATION_SORT_BY_COUNT_DESC} from "../../src";
import {ItemUUID} from "../../src/Model/ItemUUID";
import {User} from "../../src/Model/User";
import {Query, NO_MIN_SCORE} from '../../src/Query/Query';
import {Polygon, Square, CoordinateAndDistance} from "../../src/Geo/LocationRange";
import {Coordinate} from "../../src/Model/Coordinate";

import {QUERY_DEFAULT_PAGE, QUERY_DEFAULT_SIZE} from '../../src/Query/Query';
import {FILTER_AT_LEAST_ONE, FILTER_MUST_ALL} from "../../src/Query/Filter";
import {ScoreStrategies} from "../../src/Query/ScoreStrategies";
import {HttpHelper} from "../HttpHelper";
import {IndexUUID} from "../../src/Model/IndexUUID";

/**
 * Query object tests
 */
describe('Query()', () => {

    describe('Test defaults', () => {
        let query = Query.create('');
        it('should have default values', () => {
            expect(query.getFields()).to.be.deep.equals([]);
            expect(query.getNumberOfSuggestions()).to.be.equals(0);
            expect(query.areAggregationsEnabled()).to.be.true;
            expect(query.getQueryText()).to.be.equals('');
            expect(query.getPage()).to.be.equals(QUERY_DEFAULT_PAGE);
            expect(query.getSize()).to.be.equals(QUERY_DEFAULT_SIZE);
            expect(query.getScoreStrategies()).to.be.undefined;
            expect(query.getUser()).to.be.undefined;
            expect(query.getMinScore()).to.be.equals(NO_MIN_SCORE);
            expect(query.getUUID()).to.be.null;
            expect(query.getIndexUUID()).to.be.undefined;
            expect(query.getSearchableFields()).to.be.deep.equals([]);

            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getFields()).to.be.deep.equals([]);
            expect(query.getNumberOfSuggestions()).to.be.equals(0);
            expect(query.areAggregationsEnabled()).to.be.true;
            expect(query.getQueryText()).to.be.equals('');
            expect(query.getPage()).to.be.equals(QUERY_DEFAULT_PAGE);
            expect(query.getSize()).to.be.equals(QUERY_DEFAULT_SIZE);
            expect(query.getScoreStrategies()).to.be.undefined;
            expect(query.getUser()).to.be.undefined;
            expect(query.getMinScore()).to.be.equals(NO_MIN_SCORE);
            expect(query.getUUID()).to.be.undefined;
            expect(query.getIndexUUID()).to.be.undefined;
            expect(query.getSearchableFields()).to.be.deep.equals([]);
        });
    });

    describe('-> basics...()', () => {
        it('should work basics()', () => {
            let query = Query.create(
                'Hola!',
                QUERY_DEFAULT_PAGE,
                QUERY_DEFAULT_SIZE
            );

            expect(query.getQueryText()).to.be.equal('Hola!');

            let queryAsArray = {
                q: 'Hola!',
                metadata: {'a': '1', 'bn': 'A', 'c': 'AA'},
                user: {id: '123434'},
            };
            query = Query.createFromArray(queryAsArray);
            expect(query.getQueryText()).to.be.equal('Hola!');
        });
    });

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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
                query = HttpHelper.emulateHttpTransport(query);
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
                query = HttpHelper.emulateHttpTransport(query);
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
                query = HttpHelper.emulateHttpTransport(query);
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

            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getAggregations()).to.have.property('source');
            expect(query.getAggregations().source.toArray()).to.deep.equal({
                field: 'indexed_metadata.source',
                name: 'source',
            });

            query.aggregateBy(
                'source',
                'source',
                FILTER_AT_LEAST_ONE,
                AGGREGATION_SORT_BY_COUNT_DESC,
                10, ['p1', 'p2'],
            );

            expect(query.getAggregations()).to.have.property('source');
            expect(query.getAggregations().source.toArray()).to.deep.equal({
                field: 'indexed_metadata.source',
                name: 'source',
                limit: 10,
                promoted: ['p1', 'p2']
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getItemsPromoted().length).to.equal(2);
            expect(query.getItemsPromoted()[0].toArray()).to.deep.equal({
                id: 'ironman',
                type: 'marvel'
            });
        });

        it('should work properly when doing toArray', () => {
            // Promote thi two uuids into an existing array from the last test
            query.promoteUUIDs(
                new ItemUUID('ironman', 'marvel'),
                new ItemUUID('thor', 'marvel')
            );
            expect(query.toArray().items_promoted.length).to.equal(2);
            expect(query.toArray().items_promoted[0]).to.deep.equal({
                id: 'ironman',
                type: 'marvel'
            });
            expect(query.toArray().items_promoted[1]).to.deep.equal({
                id: 'thor',
                type: 'marvel'
            });
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.toArray().items_promoted.length).to.equal(2);
            expect(query.toArray().items_promoted[0]).to.deep.equal({
                id: 'ironman',
                type: 'marvel'
            });
            expect(query.toArray().items_promoted[1]).to.deep.equal({
                id: 'thor',
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
            query = HttpHelper.emulateHttpTransport(query);
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
            query.setNumberOfSuggestions(10);
            expect(query.getNumberOfSuggestions()).to.be.equals(10);
            expect(query.toArray().number_of_suggestions).to.be.equals(10);
            query.disableSuggestions();
            expect(query.getNumberOfSuggestions()).to.be.equals(0);
            expect(query.toArray().number_of_suggestions).to.be.undefined;
        });

        it('should set and unset highlights properly', () => {
            query.enableHighlights();
            expect(query.areHighlightsEnabled()).to.be.true;
            expect(query.toArray().highlight_enabled).to.be.true;
            query.disableHighlights();
            expect(query.toArray().highlight_enabled).to.be.undefined;
        });

        it('should set and unset autocomplete properly', () => {
            query.enableAutocomplete();
            expect(query.areAutocompleteEnabled()).to.be.true;
            expect(query.toArray().autocomplete_enabled).to.be.true;
            query.disableAutocomplete();
            expect(query.toArray().autocomplete_enabled).to.be.undefined;
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

    describe('-> Test fuzziness', () => {
        it('should work properly', () => {
            let query = Query.createMatchAll();
            expect(query.getFuzziness()).to.be.null;
            expect(query.toArray().fuzziness).to.be.undefined;
            query.setFuzziness(1.0);
            expect(query.getFuzziness()).to.be.equals(1.0);
            expect(query.toArray().fuzziness).to.be.equals(1.0);
            expect(Query.createFromArray({fuzziness: 1.0}).getFuzziness()).to.be.equals(1.0);
            expect(Query.createFromArray({}).getFuzziness()).to.be.null;
            expect(query.setFuzziness('1..3')).to.be.instanceOf(Query);
            expect(Query.createMatchAll().setAutoFuzziness().getFuzziness()).to.be.equals('AUTO');
            expect(query.setAutoFuzziness()).to.be.instanceOf(Query);
        });
    });

    describe('-> Test fields', () => {
        it('should work properly', () => {
            let query = Query.createMatchAll();
            expect(query.getFields()).to.be.deep.equals([]);
            expect(query.toArray().fields).to.be.undefined;
            expect(Query.createFromArray({}).getFields()).to.be.deep.equals([]);
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getFields()).to.be.deep.equals([]);
            expect(query.toArray().fields).to.be.undefined;
            expect(Query.createFromArray({}).getFields()).to.be.deep.equals([]);
            query = Query.createMatchAll().setFields(['a', 'b']);
            expect(query.getFields()).to.be.deep.equals(['a', 'b']);
            expect(query.toArray().fields).to.be.deep.equals(['a', 'b']);
            expect(Query.createFromArray({
                fields: ['a', 'b']
            }).getFields()).to.be.deep.equals(['a', 'b']);
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getFields()).to.be.deep.equals(['a', 'b']);
            expect(query.toArray().fields).to.be.deep.equals(['a', 'b']);
            expect(Query.createFromArray({
                fields: ['a', 'b']
            }).getFields()).to.be.deep.equals(['a', 'b']);
        });
    });

    describe('-> Test min score', () => {
        it('should work properly', () => {
            let query = Query.createMatchAll();
            expect(query.getMinScore()).to.be.deep.equals(NO_MIN_SCORE);
            expect(query.toArray().min_score).to.be.undefined;
            expect(Query.createFromArray({}).getMinScore()).to.be.deep.equals(NO_MIN_SCORE);
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getMinScore()).to.be.deep.equals(NO_MIN_SCORE);
            expect(query.toArray().min_score).to.be.undefined;
            expect(Query.createFromArray({}).getMinScore()).to.be.deep.equals(NO_MIN_SCORE);
            query = Query.createMatchAll().setMinScore(4.5);
            expect(query.getMinScore()).to.be.deep.equals(4.5);
            expect(query.toArray().min_score).to.be.deep.equals(4.5);
            expect(Query.createFromArray({
                min_score: 4.5
            }).getMinScore()).to.be.deep.equals(4.5);
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getMinScore()).to.be.deep.equals(4.5);
            expect(query.toArray().min_score).to.be.deep.equals(4.5);
            expect(Query.createFromArray({
                min_score: 4.5
            }).getMinScore()).to.be.deep.equals(4.5);
        });
    });

    describe('-> Test score strategy', () => {
        it('should work properly', () => {
            let query = Query.createMatchAll().setScoreStrategies(ScoreStrategies.createEmpty());
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getScoreStrategies()).to.be.instanceof(ScoreStrategies);
        });
    });

    describe('-> Test metadata', () => {
        it('should work properly', () => {
            let query = Query.createMatchAll()
                .setMetadataValue('a', 'a1')
                .setMetadataValue('b', ['b1', 'b2']);

            expect(query.getMetadata()).to.be.deep.equal({
                'a': 'a1',
                'b': ['b1', 'b2']
            });
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getMetadata()).to.be.deep.equal({
                'a': 'a1',
                'b': ['b1', 'b2']
            });
        });
    });

    describe('-> Test multiquery', () => {
        it('should work properly', () => {
            let query = Query.createMatchAll()
                .addSubquery('sub1', Query.create('sub1'))
                .addSubquery('sub2', Query.create('sub2'))
                .addSubquery('sub3', Query.create('sub3'));

            expect(Object.keys(query.getSubqueries()).length).to.be.equal(3);
            query = HttpHelper.emulateHttpTransport(query);
            expect(Object.keys(query.getSubqueries()).length).to.be.equal(3);

            query = Query.createMultiquery({
                'sub1': Query.create('sub1'),
                'sub2': Query.create('sub2'),
                'sub3': Query.create('sub3')
            });
            expect(Object.keys(query.getSubqueries()).length).to.be.equal(3);
        });
    });

    describe('-> Test identifier', () => {
        it('should work properly', () => {
            let query = Query.createMatchAll().identifyWith('123');
            expect(query.getUUID()).to.be.equal('123');
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getUUID()).to.be.equal('123');
        });
    });

    describe('-> Test searchable fields', () => {
        it('should work properly', () => {
            let query = Query.createMatchAll().setSearchableFields(['a', 'b']);
            expect(query.getSearchableFields()).to.be.deep.equal(['a', 'b']);
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getSearchableFields()).to.be.deep.equal(['a', 'b']);
        });
    });

    describe('-> Test forced index uuid', () => {
        it('should work properly', () => {
            let query = Query.createMatchAll().forceIndexUUID(IndexUUID.createById('i'));
            expect(query.getIndexUUID().composedUUID()).to.be.equal('i');
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getIndexUUID().composedUUID()).to.be.equal('i');
        });
    });

    describe('-> Test query operator', () => {
        it('should work properly', () => {
            let query = Query.createMatchAll().setQueryOperator("and");
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getQueryOperator()).to.be.equal("and");
            expect(query.toArray()["query_operator"]).to.be.equal('and');

            query = Query.createMatchAll().setQueryOperator("or");
            query = HttpHelper.emulateHttpTransport(query);
            expect(query.getQueryOperator()).to.be.equal("or");
            expect(query.toArray()["query_operator"]).to.be.undefined;
        });
    });
});
