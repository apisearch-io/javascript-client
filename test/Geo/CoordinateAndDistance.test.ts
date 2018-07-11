import { expect } from 'chai';
import {Coordinate} from "../../src/Model/Coordinate";
import {LocationRange} from "../../src/Geo/LocationRange";
import {CoordinateAndDistance} from "../../src/Geo/LocationRange";

describe('Geo/', () => {
    describe('CoordinateAndDistance', () => {
        describe('.toFilterObject()', () => {
            let coordinateAndDistance = new CoordinateAndDistance(
                new Coordinate(0.0, 1.1),
                '10km'
            );

            it('Should work properly', () => {
                expect(coordinateAndDistance.toFilterObject()).to.be.deep.equal({
                    'coordinate': {
                        'lat': 0.0,
                        'lon': 1.1
                    },
                    'distance': '10km'
                });
            });
        });

        describe('.fromFilterObject()', () => {
            let coordinateAndDistanceAsArray = {
                'coordinate': {
                    'lat': 2.1,
                    'lon': 1.1
                },
                'distance': '10km'
            };
            let coordinateAndDistance = CoordinateAndDistance.fromFilterObject(coordinateAndDistanceAsArray);

            it('Should work properly', () => {
                expect(coordinateAndDistance.toFilterObject()).to.be.deep.equal(coordinateAndDistanceAsArray);
            });
        });

        describe('.toArray()', () => {
            let coordinateAndDistance = new CoordinateAndDistance(
                new Coordinate(0.0, 1.1),
                '10km'
            );

            it('Should work properly', () => {
                expect(coordinateAndDistance.toArray()).to.be.deep.equal({
                    'type': 'CoordinateAndDistance',
                    'data': {
                        'coordinate': {
                            'lat': 0.0,
                            'lon': 1.1
                        },
                        'distance': '10km'
                    }
                });
            });
        });

        describe('.createFromArray', () => {
            let coordinateAndDistanceAsArray = {
                'type': 'CoordinateAndDistance',
                'data': {
                    'coordinate': {
                        'lat': 0.0,
                        'lon': 1.1
                    },
                    'distance': '10km'
                }
            };
            let coordinateAndDistance = LocationRange.createFromArray(coordinateAndDistanceAsArray);

            it('Should work properly', () => {
                expect(coordinateAndDistance.toArray()).to.be.deep.equal(coordinateAndDistanceAsArray);
            });
        });
    });
});
