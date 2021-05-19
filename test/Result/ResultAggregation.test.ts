import { expect } from 'chai';
import {ResultAggregation} from "../../src/Result/ResultAggregation";
import {Counter} from "../../src/Result/Counter";
import {
    FILTER_MUST_ALL_WITH_LEVELS,
    FILTER_MUST_ALL, FILTER_AT_LEAST_ONE
} from "../../src/Query/Filter";

describe('Result/', () => {
    describe('ResultAggregation', () => {
        describe('() with errors', () => {
            let aggregation = new ResultAggregation(
                'name',
                0,
                10,
                ['1', '2']
            );

            describe('.addCounter() with 0 value', () => {
                aggregation.addCounter('10', 0);

                it('Should not see counter', () => {
                    expect(aggregation.getCounters()).to.be.deep.equal({});
                    expect(aggregation.getCounter('10')).to.be.equal(null);
                });
            });

            describe('.addCounter() with invalid name', () => {
                aggregation.addCounter('name##name~~level##10', 10);
                expect(aggregation.getCounters()).to.be.deep.equal({});
            });
        });

        describe('.addCounter() with good result', () => {
            let aggregation = new ResultAggregation(
                'name',
                0,
                10,
                ['1', '2']
            );

            it('Should work properly', () => {
                expect(aggregation.getName()).to.be.equals('name');
                expect(aggregation.getTotalElements()).to.be.equals(10);
                expect(aggregation.getActiveElements()).to.be.deep.equals({
                    '1': '1',
                    '2': '2'
                });
                expect(aggregation.hasLevels()).to.be.equals(false);
                expect(aggregation.isFilter()).to.be.equals(false);
                expect(aggregation.isEmpty()).to.be.equals(false);
            });

            describe('.addCounter() with non 0 value', () => {
                aggregation.addCounter('10', 10);
                it('Should not see counter', () => {
                    expect(aggregation.getCounter('10').getName()).to.be.equal('10');
                });
            });
        });

        describe('() with levels', () => {
            let aggregation = new ResultAggregation(
                'name',
                FILTER_MUST_ALL_WITH_LEVELS,
                10,
                ['1', '2']
            );

            it('Should work properly', () => {
                aggregation.addCounter('id##1~~level##10', 10);
                expect(aggregation.hasLevels()).to.be.equal(true);
            });
        });

        describe('isEmpty() with empty values', () => {
            it('Should be empty with LEVELS', () => {
                let aggregation = new ResultAggregation(
                    'name',
                    FILTER_MUST_ALL_WITH_LEVELS,
                    10,
                    []
                );
                expect(aggregation.isEmpty()).to.be.equals(true);
            });

            it('Should be empty without LEVELS', () => {
                let aggregation = new ResultAggregation(
                    'name',
                    0,
                    10,
                    []
                );
                expect(aggregation.isEmpty()).to.be.equals(true);
            });
        });

        describe('.getActiveElements()', () => {
            let aggregation = new ResultAggregation(
                'name',
                FILTER_AT_LEAST_ONE,
                10,
                ['1', '2']
            );
            aggregation.addCounter('id##1~~name##product', 99);
            aggregation.addCounter('id##2~~name##product2', 50);
            it('Should work properly', () => {
                expect(Object.keys(aggregation.getCounters()).length).to.be.equal(2);
                expect(Object.keys(aggregation.getActiveElements()).length).to.be.equal(2);
                expect(Object.keys(aggregation.getAllElements()).length).to.be.equal(2);
                expect(aggregation.getAllElements()['1'].getId()).to.be.equal('1');
                expect(aggregation.getAllElements()['2'].getId()).to.be.equal('2');
            });
        });

        describe('.cleanCountersByLevel()', () => {
            let aggregation = new ResultAggregation(
                'name',
                FILTER_MUST_ALL_WITH_LEVELS,
                10,
                ['1', '2']
            );
            aggregation.addCounter('id##1~~level##1', 99);
            aggregation.addCounter('id##2~~level##2', 50);
            aggregation.addCounter('id##3~~level##2', 50);
            aggregation.cleanCountersByLevel();

            it('Should work properly', () => {
                expect(Object.keys(aggregation.getActiveElements()).length).to.be.equal(1);
                aggregation.cleanCountersByLevel();
                expect(Object.keys(aggregation.getActiveElements()).length).to.be.equal(1);
                expect(aggregation.getActiveElements()[0].getId()).to.be.equal('2');
                aggregation.addCounter('id##4~~level##1', 50);
                aggregation.cleanCountersByLevel();
                expect(Object.keys(aggregation.getActiveElements()).length).to.be.equal(1);
                expect(aggregation.getActiveElements()[0].getId()).to.be.equal('2');
            });
        });

        describe('.toArray() default values', () => {
            let aggregation = new ResultAggregation('name', FILTER_AT_LEAST_ONE, 0, []);

            it('Should work properly', () => {
                expect(aggregation.toArray()).to.be.deep.equal({
                    'name': 'name'
                });
            });
        });

        describe('.toArray() all values', () => {
            let aggregation = new ResultAggregation('name', FILTER_MUST_ALL, 100, ['1'], {'1': 'LOL'});
            aggregation.addCounter('1', 10);
            aggregation.addCounter('2', 10);

            it('Should work properly', () => {
                expect(aggregation.toArray()).to.be.deep.equal({
                    'name': 'name',
                    'counters': [
                        Counter.createByActiveElements('1', 10, ['1']).toArray(),
                        Counter.createByActiveElements('2', 10, ['1']).toArray(),
                    ],
                    'application_type': FILTER_MUST_ALL,
                    'active_elements': ['1'],
                    'total_elements': 100,
                    'metadata': {'1': 'LOL'}
                });
            });
        });

        describe('.createFromArray() default values', () => {
            let aggregation = ResultAggregation.createFromArray({
                'name': 'agg1',
            });

            it('Should work properly', () => {
                expect(aggregation.getName()).to.be.equal('agg1');
                expect(Object.keys(aggregation.getCounters()).length).to.be.equal(0);
                expect(aggregation.getTotalElements()).to.be.equal(0);
                expect(Object.keys(aggregation.getActiveElements()).length).to.be.equal(0);
            });
        });

        describe('.createFromArray() all values', () => {
            let aggregation = ResultAggregation.createFromArray({
                'name': 'agg1',
                'counters': [
                    Counter.createByActiveElements('1', 10, ['1']).toArray(),
                    Counter.createByActiveElements('2', 10, ['1']).toArray(),
                ],
                'application_type': FILTER_MUST_ALL,
                'active_elements': ['1'],
                'total_elements': 100,
                'metadata': {'1': 'LOL'}
            });

            it('Should work properly', () => {
                expect(aggregation.getName()).to.be.equal('agg1');
                expect(Object.keys(aggregation.getCounters()).length).to.be.equal(2);
                expect(aggregation.getTotalElements()).to.be.equal(100);
                expect(Object.keys(aggregation.getActiveElements()).length).to.be.equal(1);
                expect(aggregation.getMetadata()).to.be.deep.equal({'1': 'LOL'})
            });
        });

        describe('.createFromArray() with a value as integer', () => {
            let aggregation = ResultAggregation.createFromArray({
                'name': 'agg1',
                'counters': [
                    Counter.createByActiveElements('element1', 10, []).toArray(),
                    Counter.createByActiveElements('2', 10, []).toArray(),
                ],
                'application_type': FILTER_MUST_ALL,
                'active_elements': [],
                'total_elements': 100
            });

            let aggregation2 = ResultAggregation.createFromArray({
                'name': 'agg1',
                'counters': [
                    Counter.createByActiveElements('element1', 10, []).toArray(),
                    Counter.createByActiveElements('2text', 10, []).toArray(),
                ],
                'application_type': FILTER_MUST_ALL,
                'active_elements': [],
                'total_elements': 100
            });

            it('Should work properly with an integer as key', () => {
                const counters = aggregation.getCounters();
                expect(Object.keys(counters)[0]).to.be.equal('_element1');
                expect(Object.keys(counters)[1]).to.be.equal('_2');
            });

            it('Should work properly without an integer as key', () => {
                const counters = aggregation2.getCounters();
                expect(Object.keys(counters)[0]).to.be.equal('_element1');
                expect(Object.keys(counters)[1]).to.be.equal('_2text');
            });
        });
    });
});
