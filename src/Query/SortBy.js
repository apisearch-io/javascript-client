/**
 export * Sort by constants
 */

export const SORT_BY_SCORE = {
    '_score': {
        'order': 'asc'
    }
};
export const SORT_BY_RANDOM = {
    'random': {
        'order': 'asc'
    }
};
export const SORT_BY_ID_ASC = {
    'uuid.id': {
        'order': 'asc'
    }
};
export const SORT_BY_ID_DESC = {
    'uuid.id': {
        'order': 'desc'
    }
};
export const SORT_BY_TYPE_ASC = {
    'uuid.type': {
        'order': 'asc'
    }
};
export const SORT_BY_TYPE_DESC = {
    'uuid.type': {
        'order': 'desc'
    }
};
export const SORT_BY_LOCATION_KM_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'km'
    }
};
export const SORT_BY_LOCATION_MI_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'mi'
    }
};