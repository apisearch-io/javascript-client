/**
 export * Sort by constants
 */

const SORT_BY_SCORE = {
    '_score': {
        'order': 'asc'
    }
};
const SORT_BY_RANDOM = {
    'random': {
        'order': 'asc'
    }
};
const SORT_BY_ID_ASC = {
    'uuid.id': {
        'order': 'asc'
    }
};
const SORT_BY_ID_DESC = {
    'uuid.id': {
        'order': 'desc'
    }
};
const SORT_BY_TYPE_ASC = {
    'uuid.type': {
        'order': 'asc'
    }
};
const SORT_BY_TYPE_DESC = {
    'uuid.type': {
        'order': 'desc'
    }
};
const SORT_BY_LOCATION_KM_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'km'
    }
};
const SORT_BY_LOCATION_MI_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'mi'
    }
};

module.exports = {
    SORT_BY_SCORE,
    SORT_BY_RANDOM,
    SORT_BY_ID_ASC,
    SORT_BY_ID_DESC,
    SORT_BY_TYPE_ASC,
    SORT_BY_TYPE_DESC,
    SORT_BY_LOCATION_KM_ASC,
    SORT_BY_LOCATION_MI_ASC
};