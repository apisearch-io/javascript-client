const expect = require('chai').expect;

import {defaultQuery} from './mocks/queries';
import {FILTER_AT_LEAST_ONE} from "../src/Filter";
import Query, {
    QUERY_DEFAULT_PAGE,
    QUERY_DEFAULT_SIZE
} from '../src/Query';

/**
 * Query object tests
 */
describe('# Test: new Query()', () => {
    describe('-> filterBy...() methods', () => {
        let query = new Query({
            q: '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        });

        it('should filterBy()', () => {
            query.filterBy('source', 'source', ['source_id_123456']);
            expect(query.filters).to.have.own.property('source');
            expect(query.filters.source).to.include.all.keys(
                'application_type',
                'field',
                'filter_terms',
                'filter_type',
                'values'
            );
            expect(query.filters.source.values).to.include('source_id_123456');
        });
    });

    describe('-> filterUniverseBy...() methods', () => {
        let query = new Query({
            q: '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        });

        it('should filterUniverseBy()', () => {
            query.filterUniverseBy('source', ['source_id_123456']);
            expect(query.universe_filters).to.have.own.property('source');
            expect(query.universe_filters.source).to.include.all.keys(
                'application_type',
                'field',
                'filter_terms',
                'filter_type',
                'values'
            );
            expect(query.universe_filters.source.values).to.include('source_id_123456');
        });
    });

    describe('-> aggregateBy...() methods', () => {
        let query = new Query({
            q: '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        });

        it('should aggregateBy()', () => {
            query.aggregateBy('source', 'source');
            expect(query.aggregations).to.have.own.property('source');
            expect(query.aggregations.source).to.include.all.keys(
                'applicationType',
                'field',
                'filterType',
                'limit',
                'name',
                'sort',
                'subgroup'
            );
            expect(query.aggregations.source.name).to.include('source');
        });
    });

    describe('-> When switching query setters', () => {
        let query = new Query({
            q: '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        });

        it('should set and unset aggregations properly', () => {
            query.disableAggregations();
            expect(query.aggregations_enabled).to.be.false;
            query.enableAggregations();
            expect(query.aggregations_enabled).to.be.true;
        });

        it('should set and unset suggestions properly', () => {
            query.enableSuggestions();
            expect(query.suggestions_enabled).to.be.true;
            query.disableSuggestions();
            expect(query.suggestions_enabled).to.be.false;
        });

        it('should set and unset highlights properly', () => {
            query.enableHighlights();
            expect(query.highlight_enabled).to.be.true;
            query.disableHighlights();
            expect(query.highlight_enabled).to.be.false;
        });
    })
});

