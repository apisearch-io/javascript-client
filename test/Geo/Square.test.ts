import { expect } from 'chai';
import {Square} from "../../src/Geo/LocationRange";
import {LocationRange} from "../../src/Geo/LocationRange";
import {Coordinate} from "../../src/Model/Coordinate";

describe('Geo/', () => {
    describe('Square', () => {
        describe('.toFilterObject()', () => {
            let square = new Square(
                new Coordinate(0.0, 1.1),
                new Coordinate(2.0, 1.1)
            );

            it('Should work properly', () => {
                expect(square.toFilterObject()).to.be.deep.equal({
                    'top_left': {
                        'lat': 0.0,
                        'lon': 1.1
                    },
                    'bottom_right': {
                        'lat': 2.0,
                        'lon': 1.1
                    }
                });
            });
        });

        describe('.fromFilterObject()', () => {
            let squareAsArray = {
                'top_left': {
                    'lat': 0.0,
                    'lon': 1.1
                },
                'bottom_right': {
                    'lat': 2.0,
                    'lon': 1.1
                }
            };
            let square = Square.fromFilterObject(squareAsArray);

            it('Should work properly', () => {
                expect(square.toFilterObject()).to.be.deep.equal(squareAsArray);
            });
        });

        describe('.toArray()', () => {
            let square = new Square(
                new Coordinate(0.0, 1.1),
                new Coordinate(2.0, 1.1)
            );

            it('Should work properly', () => {
                expect(square.toArray()).to.be.deep.equal({
                    'type': 'Square',
                    'data': {
                        'top_left': {
                        'lat': 0.0,
                        'lon': 1.1
                    },
                    'bottom_right': {
                        'lat': 2.0,
                        'lon': 1.1
                    }
                    }
                });
            });
        });

        describe('.createFromArray', () => {
            let squareAsArray = {
                'type': 'Square',
                'data': {
                    'top_left': {
                        'lat': 0.0,
                        'lon': 1.1
                    },
                    'bottom_right': {
                        'lat': 2.0,
                        'lon': 1.1
                    }
                }
            };
            let square = LocationRange.createFromArray(squareAsArray);

            it('Should work properly', () => {
                expect(square.toArray()).to.be.deep.equal(squareAsArray);
            });
        });
    });
});
