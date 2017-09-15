const expect = require('chai').expect;
import {defaultQuery} from './queries';
import Query, {
    QUERY_DEFAULT_PAGE,
    QUERY_DEFAULT_SIZE
} from '../src/Query';

describe('new Query()', () => {
    describe('creation methods', () => {
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

    describe('filtered by universe methods', () => {
        let query = new Query({
            q: '',
            QUERY_DEFAULT_PAGE,
            QUERY_DEFAULT_SIZE
        });

        it('should filter universe by', () => {
            query.filterUniverseBy(source, ['hola']);
            expect(query.universe_filters).to.have.prop('object');
        });
    });
});

