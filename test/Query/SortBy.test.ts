import { expect } from 'chai';
import SortBy from "../../src/Query/SortBy";
import Filter from "../../src/Query/Filter";
import Coordinate from "../../src/Model/Coordinate";
import {
    SORT_BY_AL_TUN_TUN,
    SORT_BY_RANDOM,
    SORT_BY_TYPE_FIELD,
    SORT_BY_TYPE_NESTED,
    SORT_BY_ASC,
    SORT_BY_DESC,
    SORT_BY_ID_ASC,
    SORT_BY_SCORE,
    SORT_BY_MODE_AVG,
    SORT_BY_LOCATION_KM_ASC,
    SORT_BY_LOCATION_MI_ASC
} from "../../src/Query/SortBy";
import {
    FILTER_AT_LEAST_ONE,
    FILTER_TYPE_FIELD
} from "../../src/Query/Filter";

describe('Query/', () => {
    describe('SortBy', () => {
        describe('.create()', () => {
            let sortBy = SortBy.create();
            it('Should work properly', () => {
                expect(sortBy.toArray()).to.be.deep.equal([]);
            });
        });

        describe('.createFromArray() empty', () => {
            let sortBy = SortBy.createFromArray({});
            it('Should work properly', () => {
                expect(sortBy.toArray()).to.be.deep.equal([]);
            });
        });

        describe('.create() simple sort by', () => {
            let sortBy = SortBy.create().byValue(SORT_BY_AL_TUN_TUN);
            it('Should work properly', () => {
                expect(sortBy.all()).to.be.deep.equal([SORT_BY_AL_TUN_TUN]);
            });
        });

        describe('.fromFieldsAndValues()', () => {
            let sortBy = SortBy.byFieldsValues({
                'category': 'asc',
                'brand': 'desc'
            });
            it('Should work properly', () => {
                expect(sortBy.all()).to.be.deep.equal([
                    {
                        'type': SORT_BY_TYPE_FIELD,
                        'indexed_metadata.category': {
                            'order': SORT_BY_ASC
                        }
                    },
                    {
                        'type': SORT_BY_TYPE_FIELD,
                        'indexed_metadata.brand': {
                            'order': SORT_BY_DESC
                        }
                    },
                ]);
            });
        });

        describe('.create() empty', () => {
            let sortBy = SortBy.create();
            it('Should work properly', () => {
                expect(sortBy.all()).to.be.deep.equal([SORT_BY_SCORE]);
            });
        });

        describe('.create() sort by field value', () => {
            let sortBy = SortBy.create().byFieldValue('category', SORT_BY_ASC);
            it('Should work properly', () => {
                expect(sortBy.all()).to.be.deep.equal([
                    {
                        'type': SORT_BY_TYPE_FIELD,
                        'indexed_metadata.category': {
                            'order': SORT_BY_ASC
                        }
                    },
                ]);
            });
        });

        describe('.byNestedFieldAndFilter()', () => {
            let sortBy = SortBy.create().byNestedFieldAndFilter(
                'category',
                SORT_BY_ASC,
                Filter.create('id', [1, 2], FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD)
            );

            it('Should work properly', () => {
                expect(sortBy.all()).to.be.deep.equal([
                    {
                        'type': SORT_BY_TYPE_NESTED,
                        'indexed_metadata.category': {
                            'order': SORT_BY_ASC
                        },
                        'mode': SORT_BY_MODE_AVG,
                        'filter': Filter.create('uuid.id', [1, 2], FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD)
                    },
                ]);
            });
        });

        describe('.createFromArray()', () => {
            let sortByAsArray = [
                {
                    'indexed_metadata.category': {
                        'order': SORT_BY_ASC
                    }
                },
                {
                    'indexed_metadata.brand': {
                        'order': SORT_BY_ASC
                    }
                },
                {
                    'type': SORT_BY_TYPE_NESTED,
                    'indexed_metadata.manufacturer': {
                        'order': SORT_BY_ASC
                    },
                    'filter': Filter.create('id', [1, 2], FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD).toArray()
                }
            ];
            it('Should work properly', () => {
                expect(SortBy.createFromArray(sortByAsArray).toArray()).to.be.deep.equal(sortByAsArray);
            });
        });

        describe('.toArray()', () => {
            let sortBy = SortBy.create();
            let filter = Filter.create('id', [1, 2], FILTER_AT_LEAST_ONE, FILTER_TYPE_FIELD);
            sortBy.byFieldValue('category', SORT_BY_ASC);
            sortBy.byFieldValue('brand', SORT_BY_ASC);
            sortBy
                .byValue(SORT_BY_ID_ASC)
                .byValue(SORT_BY_AL_TUN_TUN)
                .byNestedFieldAndFilter(
                    'category',
                    SORT_BY_ASC,
                    filter
                );

            it('Should work properly', () => {
                expect(SortBy.createFromArray(sortBy.toArray())).to.be.deep.equal(sortBy);
            });
        });

        describe('.isSortedByGeoDistance()', () => {
            it('Sorted by geodistance should only return true when happens', () => {
                expect(SortBy.create().isSortedByGeoDistance()).to.be.equal(false);
                expect(SortBy.createFromArray([{'category': 'asc'}]).isSortedByGeoDistance()).to.be.equal(false);
                expect(SortBy.create().byValue(SORT_BY_AL_TUN_TUN).isSortedByGeoDistance()).to.be.equal(false);
                expect(SortBy.create().byValue(SORT_BY_LOCATION_KM_ASC).isSortedByGeoDistance()).to.be.equal(true);
                expect(SortBy.create().byValue(SORT_BY_LOCATION_MI_ASC).isSortedByGeoDistance()).to.be.equal(true);
            });
        });

        describe('.copy()', () => {
             let sortBy = SortBy.create()
                .byValue(SORT_BY_LOCATION_KM_ASC)
                .byValue(SORT_BY_AL_TUN_TUN);

             it('Should be the same when copies', () => {
                 expect(sortBy.copy()).to.be.deep.equal(sortBy);
             });

             it('Should never be the same when changes first original and copy', () => {
                 let copy = sortBy.copy();
                 copy.byFieldValue('category', 'asc');
                 expect(copy).to.not.be.deep.equal(sortBy);
             });
        });

        describe('.setCoordinate()', () => {
            let coordinate = new Coordinate(0.0, 1.1);
            let sortBy = SortBy.create()
                .byValue(SORT_BY_LOCATION_KM_ASC)
                .byValue(SORT_BY_AL_TUN_TUN)
                .setCoordinate(coordinate);

            it('Coordinate should be inside all() as a Coordinate object', () => {
                expect(sortBy.all()).to.be.deep.equal([
                    {
                        'type': SORT_BY_TYPE_FIELD,
                        '_geo_distance': {
                            'coordinate': coordinate,
                            'order': SORT_BY_ASC,
                            'unit': 'km',
                        }
                    },
                    SORT_BY_AL_TUN_TUN
                ]);
            });

            it('Coordinate should be inside toArray() as a plain object', () => {
                expect(sortBy.toArray()).to.be.deep.equal([
                    {
                        '_geo_distance': {
                            'coordinate': coordinate.toArray(),
                            'order': SORT_BY_ASC,
                            'unit': 'km',
                        }
                    },
                    SORT_BY_AL_TUN_TUN
                ]);
            });

            it('Coordinate should be build form array', () => {
                expect(SortBy.createFromArray([
                    {
                        '_geo_distance': {
                            'coordinate': coordinate.toArray(),
                            'order': SORT_BY_ASC,
                            'unit': 'km',
                        }
                    },
                    SORT_BY_AL_TUN_TUN
                ])).to.be.deep.equal(sortBy);
            });
        });

        describe('.hasRandomSort()', () => {
            it('Sorted by geodistance should only return true when happens', () => {
                expect(SortBy.create().hasRandomSort()).to.be.equal(false);
                expect(SortBy.createFromArray([{'category': 'asc'}]).hasRandomSort()).to.be.equal(false);
                expect(SortBy.create().byValue(SORT_BY_ID_ASC).hasRandomSort()).to.be.equal(false);
                expect(SortBy.create().byValue(SORT_BY_AL_TUN_TUN).hasRandomSort()).to.be.equal(true);
                expect(SortBy.create().byValue(SORT_BY_RANDOM).hasRandomSort()).to.be.equal(true);
            });
        });
    });
});
