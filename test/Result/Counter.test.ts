import { expect } from 'chai';
import {Counter} from "../../src/Result/Counter";

describe('Result/', () => {
    describe('Counter', () => {
        describe('.createByActiveElements() with used element', () => {
            let counter = Counter.createByActiveElements(
                'id##1~~name##category1',
                10,
                ['1', '2']
            );

            it('Should work properly', () => {
                expect(counter.getId()).to.be.equal('1');
                expect(counter.getName()).to.be.equal('category1');
                expect(counter.getSlug()).to.be.equal(null);
                expect(counter.getLevel()).to.be.equal(0);
                expect(counter.isUsed()).to.be.equal(true);
                expect(counter.getN()).to.be.equal(10);
                expect(counter.getValues()).to.be.deep.equal({
                    'id': '1',
                    'name': 'category1'
                });
            });
        });

        describe('.createByActiveElements() with non used element', () => {
            let counter = Counter.createByActiveElements(
                'id##1~~name##category1',
                10,
                ['3', '2']
            );

            it('Should work properly', () => {
                expect(counter.isUsed()).to.be.equal(false);
            });
        });

        describe('.createByActiveElements() with invalid name (no ID)', () => {
            let counter = Counter.createByActiveElements(
                'hola##hola~~name##category1',
                10,
                ['3', '2']
            );

            it('Counter should be null', () => {
                expect(counter).to.be.equal(null);
            });
        });

        describe('.toArray() with default values', () => {
            let counter = Counter.createByActiveElements(
                '1',
                10,
                []
            );

            it('Should work properly', () => {
                expect(counter.toArray()).to.be.deep.equal({
                    'values': {
                        'id': '1',
                        'name': '1'
                    },
                    'n': 10
                });
            });
        });

        describe('.toArray() with all values', () => {
            let counter = Counter.createByActiveElements(
                '1',
                10,
                ['1']
            );

            it('Should work properly', () => {
                expect(counter.toArray()).to.be.deep.equal({
                    'values': {
                        'id': '1',
                        'name': '1'
                    },
                    'used': true,
                    'n': 10
                });
            });
        });

        describe('.createFromArray() with default values', () => {
            let counter = Counter.createFromArray({
                'values': {
                    'id': '1',
                    'name': '1'
                },
                'n': 10
            });

            it('Should work properly', () => {
                expect(counter.getValues()).to.be.deep.equal({
                    'id': '1',
                    'name': '1'
                });
                expect(counter.isUsed()).to.be.equal(false);
                expect(counter.getN()).to.be.equal(10);
            });
        });

        describe('.createFromArray() with all values', () => {
            let counter = Counter.createFromArray({
                'values': {
                    'id': '1',
                    'name': '1'
                },
                'used': true,
                'n': 10
            });

            it('Should work properly', () => {
                expect(counter.getValues()).to.be.deep.equal({
                    'id': '1',
                    'name': '1'
                });
                expect(counter.isUsed()).to.be.equal(true);
                expect(counter.getN()).to.be.equal(10);
            });
        });
    });
});
