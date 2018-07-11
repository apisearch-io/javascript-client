import { expect } from 'chai';
import {ResultAggregation} from "../../src/Result/ResultAggregation";
import {ResultAggregations} from "../../src/Result/ResultAggregations";

describe('Result/', () => {
    describe('Aggregations', () => {
        describe('() with errors', () => {
            let aggregations = new ResultAggregations(100);
            aggregations.addAggregation('name', new ResultAggregation('name', 0, 10, ['1']));
            aggregations.addAggregation('name2', new ResultAggregation('name2', 0, 10, []));

            it('Should work properly', () => {
                expect(Object.keys(aggregations.getAggregations()).length).to.be.equal(2);
                expect(aggregations.getTotalElements()).to.be.equal(100);
                expect(aggregations.getAggregation('name') instanceof ResultAggregation).to.be.equal(true);
                expect(aggregations.getAggregation('name').getName()).to.be.equal('name');
                expect(aggregations.getAggregation('name2') instanceof ResultAggregation).to.be.equal(true);
                expect(aggregations.getAggregation('name2').getName()).to.be.equal('name2');
                expect(aggregations.hasNotEmptyAggregation('name')).to.be.equal(true);
                expect(aggregations.hasNotEmptyAggregation('name2')).to.be.equal(false);
            });
        });

        describe('.toArray() & createFromArray() default values', () => {
            it('Should work properly', () => {
                expect(ResultAggregations.createFromArray({}).toArray()).to.be.deep.equal({});
            });
        });

        describe('.toArray() & createFromArray() default values', () => {
            let aggregationsAsArray = {
                'total_elements': 100,
                'aggregations': {
                    'name': {
                        'name': 'name'
                    },
                    'name2': {
                        'name': 'name2'
                    }
                }
            };

            it('Should work properly', () => {
                expect(ResultAggregations.createFromArray(aggregationsAsArray).toArray()).to.be.deep.equal(aggregationsAsArray);
            });
        });
    });
});
