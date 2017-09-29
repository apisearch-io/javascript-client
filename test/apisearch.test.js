const expect = require('chai').expect;
const apisearch = require('../src/apisearch');

/**
 * Apisearch test
 */
describe('apisearch()', () => {
    let client = apisearch('some_client_api_key');

    describe('-> When creating a query', () => {
        it('should create a "Query" object type', () => {
            let query = client.query.create('');

            expect(query).to.be.an('object');
            expect(query.constructor.name).to.be.equal('Query');
        });

        it('should create a "default query" given default method', () => {
            let query = client.query.create('');
            expect(query).to.deep.equal({
                q: '',
                from: 0,
                size: 10,
                page: 1,
                aggregations: [],
                universe_filters: [],
                filters: [],
                filter_fields: [],
                items_promoted: [],
                coordinate: null,
                user: null,
                aggregations_enabled: true,
                highlight_enabled: false,
                suggestions_enabled: false,
                sort: {
                    _score: {
                        order: "asc"
                    }
                }
            });
        });

        it('should create a "create match all query" given createMatchAll method', () => {
            let query = client.query.createMatchAll();
            expect(query).to.deep.equal({
                q: '',
                from: 0,
                size: 1000,
                page: 1,
                aggregations: [],
                universe_filters: [],
                filters: [],
                filter_fields: [],
                items_promoted: [],
                coordinate: null,
                user: null,
                aggregations_enabled: true,
                highlight_enabled: false,
                suggestions_enabled: false,
                sort: {
                    _score: {
                        order: "asc"
                    }
                }
            });
        });

        it('should create a "located query" given createLocatedQuery method', () => {
            let query = client.query.createLocated({
                    lat: 12.345,
                    lon: -12.345
                }, '')
            ;
            expect(query).to.deep.equal({
                q: '',
                from: 0,
                size: 10,
                page: 1,
                aggregations: [],
                universe_filters: [],
                filters: [],
                filter_fields: [],
                items_promoted: [],
                coordinate: {
                    lat: 12.345,
                    lon: -12.345
                },
                user: null,
                aggregations_enabled: true,
                highlight_enabled: false,
                suggestions_enabled: false,
                sort: {
                    _score: {
                        order: "asc"
                    }
                }
            });
        });

        it('should create a "uuid query" given createByUUID method', () => {
            let query = client.query.createByUUID(
                    client.createObject.uuid('captain-america', 'marvel')
                )
            ;
            expect(query.filters).to.deep.equal({
                _id: {
                    application_type: 8,
                    field: '_id',
                    filter_terms: [],
                    filter_type: 'field',
                    values: [
                        'marvel~captain-america'
                    ]
                }
            })
        });

        it('should create a "uuids query" given createByUUIDs method', () => {
            let query = client.query
                .createByUUIDs(
                    client.createObject.uuid('black-widow', 'marvel'),
                    client.createObject.uuid('ant-man', 'marvel')
                )
            ;
            expect(query.filters).to.deep.equal({
                _id: {
                    application_type: 8,
                    field: '_id',
                    filter_terms: [],
                    filter_type: 'field',
                    values: [
                        'marvel~black-widow',
                        'marvel~ant-man',
                    ]
                }
            })
        });
    });
});