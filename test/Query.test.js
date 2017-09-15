const expect = require('chai').expect;
import {defaultQuery} from './queries';
import Query, {
    QUERY_DEFAULT_PAGE,
    QUERY_DEFAULT_SIZE
} from '../src/Query';

describe('# Test: new Query()', () => {
    describe('-> create...() methods', () => {
        let query = new Query({
            q: '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        });

        it('should be an object', () => {
            expect(query).to.be.an('object');
        });

        it('should return a default query when creating an empty one', () => {
            expect(query).to.deep.equal(defaultQuery);
        });

        it('should toggle aggregations properly', () => {
            query.disableAggregations();
            expect(query.aggregations_enabled).to.be.false;
            query.enableAggregations();
            expect(query.aggregations_enabled).to.be.true;
        });

        it('should toggle suggestions properly', () => {
            query.enableSuggestions();
            expect(query.suggestions_enabled).to.be.true;
            query.disableSuggestions();
            expect(query.suggestions_enabled).to.be.false;
        });

        it('should toggle highlights properly', () => {
            query.enableHighlights();
            expect(query.highlight_enabled).to.be.true;
            query.disableHighlights();
            expect(query.highlight_enabled).to.be.false;
        });
    });

    describe('-> filterBy...() methods', () => {
        let query = new Query({
            q: '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        });

        it('should filterUniverseBy()', () => {
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

        it('should filter universe by', () => {
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
});

