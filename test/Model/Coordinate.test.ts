import {Coordinate} from "../../src/Model/Coordinate";
import { expect } from 'chai';

describe('Model/', () => {
    describe('Coordinate', () => {
        describe('()', () => {
            let coordinate = new Coordinate(1.20, 2.10);

            it('Should work properly', () => {
                expect(coordinate.getLatitude()).to.be.equal(1.20);
                expect(coordinate.getLongitude()).to.be.equal(2.10);
            });
        });

        describe('::createFromArray()', () => {
            let coordinate = Coordinate.createFromArray({
                'lat': 1.20,
                'lon': 2.10
            });

            it('Should work properly', () => {
                expect(coordinate.getLatitude()).to.be.equal(1.20);
                expect(coordinate.getLongitude()).to.be.equal(2.10);
            });
        });

        describe('::createFromArray() with exception', () => {
            it('Should throw exception', () => {
                expect(function() {Coordinate.createFromArray(null)}).to.throw();
            });
        });

        describe('->toArray()', () => {
            let coordinateAsArray = {
                'lat': 1.20,
                'lon': 2.10
            };

            it('Should work properly', () => {
                expect(Coordinate.createFromArray(coordinateAsArray).toArray()).to.be.deep.equal(coordinateAsArray);
            });
        });
    });
});
