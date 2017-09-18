const expect = require('chai').expect;

import {createLocatedQuery, createMatchAllQuery, defaultQuery} from './mocks/queries';

import * as apisearch from '../src/apisearch';

/**
 * Apisearch test
 */
describe('# Test: Apisearch entry point', () => {

    describe('-> When creating a query', () => {
        it('should create a "Query" object type', () => {
            let query = apisearch
                .query
                .create('');
            expect(query).to.be.an('object');
            expect(query.constructor.name).to.be.equal('Query');
        });
        it('should create a "default query" given default parameters', () => {
            let query = apisearch
                .query
                .create('');
            expect(query).to.deep.equal(defaultQuery);
        });
        it('should create a "create match all query" given createMatchAll parameters', () => {
            let query = apisearch
                .query
                .createMatchAll();
            expect(query).to.deep.equal(createMatchAllQuery);
        });
        it('should create a "located query" given createLocatedQuery parameters', () => {
            let query = apisearch
                .query
                .createLocated({
                    lat: 12.345,
                    lon: -12.345
                }, '');
            expect(query).to.deep.equal(createLocatedQuery);
        });
    });
});