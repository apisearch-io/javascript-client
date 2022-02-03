import { expect } from 'chai';
import {
    Aggregation,
    FILTER_MUST_ALL,
    FILTER_AT_LEAST_ONE,
    FILTER_TYPE_GEO,
    FILTER_TYPE_FIELD,
    AGGREGATION_SORT_BY_COUNT_ASC,
    AGGREGATION_SORT_BY_COUNT_DESC,
    AGGREGATION_NO_LIMIT,
} from "../../src";

describe('Query/', () => {
    describe('Aggregation', () => {
        describe('.create() All attributes defined', () => {
            let aggregation = Aggregation.create(
                'name',
                'field',
                FILTER_MUST_ALL,
                FILTER_TYPE_GEO,
                ['xxx'],
                AGGREGATION_SORT_BY_COUNT_ASC,
                10,
                ["a", "b"],
            );

            it('Should have right values', () => {
                expect(aggregation.getName()).to.be.equal('name');
                expect(aggregation.getField()).to.be.equal('field');
                expect(aggregation.getApplicationType()).to.be.equal(FILTER_MUST_ALL);
                expect(aggregation.getFilterType()).to.be.equal(FILTER_TYPE_GEO);
                expect(aggregation.getSubgroup()).to.be.deep.equal(['xxx']);
                expect(aggregation.getSort()).to.be.equal(AGGREGATION_SORT_BY_COUNT_ASC);
                expect(aggregation.getLimit()).to.be.equal(10);
                expect(aggregation.getPromoted()).to.be.deep.equal(["a", "b"]);
            });
        });
        describe('.create() Default attributes', () => {
            let aggregation = Aggregation.create(
                'name',
                'field',
                FILTER_MUST_ALL,
                FILTER_TYPE_GEO,
            );

            it('Should have right values', () => {
                expect(aggregation.getName()).to.be.equal('name');
                expect(aggregation.getField()).to.be.equal('field');
                expect(aggregation.getApplicationType()).to.be.equal(FILTER_MUST_ALL);
                expect(aggregation.getFilterType()).to.be.equal(FILTER_TYPE_GEO);
                expect(aggregation.getSubgroup()).to.be.deep.equal([]);
                expect(aggregation.getSort()).to.be.equal(AGGREGATION_SORT_BY_COUNT_DESC);
                expect(aggregation.getLimit()).to.be.equal(AGGREGATION_NO_LIMIT);
                expect(aggregation.getPromoted()).to.be.deep.equal([]);
            });
        });
        describe('.toArray() All attributes defined', () => {
            let aggregationAsArray = {
                'name': 'name',
                'field': 'uuid.id',
                'application_type': FILTER_MUST_ALL,
                'filter_type': FILTER_TYPE_GEO,
                'subgroup': ['xxx'],
                'sort': AGGREGATION_SORT_BY_COUNT_ASC,
                'limit': 10,
                "promoted": ["a", "b"],
            };

            it('Should have all values', () => {
                expect(Aggregation.createFromArray(aggregationAsArray).toArray()).to.be.deep.equal(aggregationAsArray);
            });
        });
        describe('.toArray() Default attributes', () => {
            let aggregationAsArray = {
                'name': 'name',
                'field': 'uuid.type',
                'application_type': FILTER_AT_LEAST_ONE,
                'filter_type': FILTER_TYPE_FIELD,
                'subgroup': [],
                'sort': AGGREGATION_SORT_BY_COUNT_DESC,
                'limit': 0,
                "promoted": [],
            };

            it('Should have all values', () => {
                expect(Aggregation.createFromArray(aggregationAsArray).toArray()).to.be.deep.equal({
                    'name': 'name'
                });
            });
        });

        describe('.createFromArray() Default attributes', () => {
            let aggregationAsArray = {
                'name': 'name'
            };
            let aggregation = Aggregation.createFromArray(aggregationAsArray);

            it('Should have all values', () => {
                expect(aggregation.toArray()).to.be.deep.equal({
                    'name': 'name'
                });
                expect(aggregation.getName()).to.be.equal('name');
                expect(aggregation.getField()).to.be.equal('uuid.type');
                expect(aggregation.getApplicationType()).to.be.equal(FILTER_AT_LEAST_ONE);
                expect(aggregation.getFilterType()).to.be.equal(FILTER_TYPE_FIELD);
                expect(aggregation.getSubgroup()).to.be.deep.equal([]);
                expect(aggregation.getSort()).to.be.equal(AGGREGATION_SORT_BY_COUNT_DESC);
                expect(aggregation.getLimit()).to.be.equal(AGGREGATION_NO_LIMIT);
                expect(aggregation.getPromoted()).to.be.deep.equal([]);
            });
        });
    });
});
