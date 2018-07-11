import { expect } from 'chai';
import {Polygon} from "../../src/Geo/LocationRange";
import {LocationRange} from "../../src/Geo/LocationRange";
import {Coordinate} from "../../src/Model/Coordinate";

describe('Geo/', () => {
    describe('Polygon', () => {
        describe('.toFilterObject()', () => {
            let polygon = new Polygon([
                new Coordinate(0.0, 1.1),
                new Coordinate(2.0, 1.1),
                new Coordinate(3.0, 1.1),
            ]);

            it('Should work properly', () => {
                expect(polygon.toFilterObject()).to.be.deep.equal({
                    'coordinates': [
                        {
                            'lat': 0.0,
                            'lon': 1.1
                        },
                        {
                            'lat': 2.0,
                            'lon': 1.1
                        },
                        {
                            'lat': 3.0,
                            'lon': 1.1
                        }
                    ]
                });
            });
        });

        describe('.fromFilterObject()', () => {
            let polygonAsArray = {
                'coordinates': [
                    {
                        'lat': 0.0,
                        'lon': 1.1
                    },
                    {
                        'lat': 2.0,
                        'lon': 1.1
                    },
                    {
                        'lat': 3.0,
                        'lon': 1.1
                    }
                ]
            };
            let polygon = Polygon.fromFilterObject(polygonAsArray);

            it('Should work properly', () => {
                expect(polygon.toFilterObject()).to.be.deep.equal(polygonAsArray);
            });
        });

        describe('.toArray()', () => {
            let polygon = new Polygon([
                new Coordinate(0.0, 1.1),
                new Coordinate(2.0, 1.1),
                new Coordinate(3.0, 1.1),
            ]);

            it('Should work properly', () => {
                expect(polygon.toArray()).to.be.deep.equal({
                    'type': 'Polygon',
                    'data': {
                        'coordinates': [
                            {
                                'lat': 0.0,
                                'lon': 1.1
                            },
                            {
                                'lat': 2.0,
                                'lon': 1.1
                            },
                            {
                                'lat': 3.0,
                                'lon': 1.1
                            }
                        ]
                    }
                });
            });
        });

        describe('.createFromArray', () => {
            let polygonAsArray = {
                'type': 'Polygon',
                'data': {
                    'coordinates': [
                        {
                            'lat': 0.0,
                            'lon': 1.1
                        },
                        {
                            'lat': 2.0,
                            'lon': 1.1
                        },
                        {
                            'lat': 3.0,
                            'lon': 1.1
                        }
                    ]
                }
            };
            let polygon = LocationRange.createFromArray(polygonAsArray);

            it('Should work properly', () => {
                expect(polygon.toArray()).to.be.deep.equal(polygonAsArray);
            });
        });
    });
});
