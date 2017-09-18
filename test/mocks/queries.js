/**
 * Queries file for test cases
 */

// Default query object
export const defaultQuery = {
    q: '',
    from: 0,
    size: 10,
    page: 1,
    coordinate: undefined,
    aggregations: [],
    universe_filters: [],
    filters: [],
    filter_fields: [],
    items_promoted: [],
    user: undefined,
    aggregations_enabled: true,
    highlight_enabled: false,
    suggestions_enabled: false
};

// Create match all query object
export const createMatchAllQuery = {
    q: '',
    from: 0,
    size: 1000,
    page: 1,
    coordinate: undefined,
    aggregations: [],
    universe_filters: [],
    filters: [],
    filter_fields: [],
    items_promoted: [],
    user: undefined,
    aggregations_enabled: true,
    highlight_enabled: false,
    suggestions_enabled: false
};

// Create located query object
export const createLocatedQuery = {
    q: '',
    from: 0,
    size: 10,
    page: 1,
    coordinate: {
        lat: 12.345,
        lon: -12.345
    },
    aggregations: [],
    universe_filters: [],
    filters: [],
    filter_fields: [],
    items_promoted: [],
    user: undefined,
    aggregations_enabled: true,
    highlight_enabled: false,
    suggestions_enabled: false
};