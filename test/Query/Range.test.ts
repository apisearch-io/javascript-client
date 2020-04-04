import { expect } from 'chai';
import {Range} from "../../src/Query/Range";
import {
    RANGE_MINUS_INFINITE,
    RANGE_INFINITE
} from '../../src/Query/Range';

describe('Query/', () => {
    describe('Range', () => {
        describe('.stringToArray()', () => {
            [
                ['2..5', [2, 5]],
                ['..10', [RANGE_MINUS_INFINITE, 10]],
                ['0..', [0, RANGE_INFINITE]],
                ['2..', [2, RANGE_INFINITE]],
                ['..', [RANGE_MINUS_INFINITE, RANGE_INFINITE]]
            ].forEach(function(element:[string, [number, number]]) {
                it('Should work with entry ' + element[0], () => {
                    expect(Range.stringToArray(element[0])).to.be.deep.equal(element[1]);
                });
            });
        });

        describe('.arrayToString()', () => {
            [
                [[2, 6], '2..6'],
                [[RANGE_MINUS_INFINITE, 10], '..10'],
                [[2, RANGE_INFINITE], '2..'],
                [[RANGE_MINUS_INFINITE, RANGE_INFINITE], '..'],
            ].forEach(function(element:[[number, number], string]) {
                it('Should work with entry ' + element[0], () => {
                    expect(Range.arrayToString(element[0])).to.be.equal(element[1]);
                });
            });
        });

        describe('.createRanges()', () => {
            [
                [1, 7, 2, ['1..3', '3..5', '5..7']],
                [0, 4, 2, ['0..2', '2..4']],
            ].forEach(function(element:[number, number, number, string[]]) {
                it('Should work with entry ' + element[0] + ',' + element[1] + ',' + element[2], () => {
                    expect(Range.createRanges(element[0], element[1], element[2])).to.be.deep.equal(element[3]);
                });
            });
        });
    });
});
