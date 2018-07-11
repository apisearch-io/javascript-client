import { expect } from 'chai';
import {Filter} from "../../src/Query/Filter";
import {
    FILTER_MUST_ALL,
    FILTER_AT_LEAST_ONE,
    FILTER_TYPE_GEO,
    FILTER_TYPE_FIELD
} from "../../src/Query/Filter"

describe('Query/', () => {
    describe('Filter', () => {
        describe('.create() All attributes defined', () => {
            let filter = Filter.create(
                'field',
                [1, 2, 3],
                FILTER_MUST_ALL,
                FILTER_TYPE_GEO,
                ['a', 'b']
            );

            it('Should have right values', () => {
                expect(filter.getField()).to.be.equal('field');
                expect(filter.getValues()).to.be.deep.equal([1, 2, 3]);
                expect(filter.getApplicationType()).to.be.equal(FILTER_MUST_ALL);
                expect(filter.getFilterType()).to.be.equal(FILTER_TYPE_GEO);
                expect(filter.getFilterTerms()).to.be.deep.equal(['a', 'b']);
            });
        });
        describe('.create() Default attributes', () => {
            let filter = Filter.create(
                'field',
                [1, 2, 3],
                FILTER_MUST_ALL,
                FILTER_TYPE_GEO
            );

            it('Should have right values', () => {
                expect(filter.getField()).to.be.equal('field');
                expect(filter.getValues()).to.be.deep.equal([1, 2, 3]);
                expect(filter.getApplicationType()).to.be.equal(FILTER_MUST_ALL);
                expect(filter.getFilterType()).to.be.equal(FILTER_TYPE_GEO);
                expect(filter.getFilterTerms()).to.be.deep.equal([]);
            });
        });
        describe('.toArray() All attributes defined', () => {
            let filterAsArray = {
                'field': 'field',
                'values': [1, 2, 3],
                'application_type': FILTER_MUST_ALL,
                'filter_type': FILTER_TYPE_GEO,
                'filter_terms': ['a', 'b']
            };

            it('Should have all values', () => {
                expect(Filter.createFromArray(filterAsArray).toArray()).to.be.deep.equal(filterAsArray);
            });
        });
        describe('.toArray() Default attributes', () => {
            let filterAsArray = {
                'field': 'uuid.type',
                'values': [],
                'application_type': FILTER_AT_LEAST_ONE,
                'filter_type': FILTER_TYPE_FIELD,
                'filter_terms': [],
            };

            it('Should have all values', () => {
                expect(Filter.createFromArray(filterAsArray).toArray()).to.be.deep.equal({});
            });
        });

        describe('.createFromArray() Default attributes', () => {
            let filterAsArray = {};
            let filter = Filter.createFromArray(filterAsArray);

            it('Should have all values', () => {
                expect(filter.toArray()).to.be.deep.equal({});
                expect(filter.getField()).to.be.equal('uuid.type');
                expect(filter.getValues()).to.be.deep.equal([]);
                expect(filter.getApplicationType()).to.be.equal(FILTER_AT_LEAST_ONE);
                expect(filter.getFilterType()).to.be.equal(FILTER_TYPE_FIELD);
                expect(filter.getFilterTerms()).to.be.deep.equal([]);
            });
        });
    });
});
