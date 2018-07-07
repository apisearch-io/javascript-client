import { expect } from 'chai';
import Aggregation from "../../src/Result/Aggregation";
import Aggregations from "../../src/Result/Aggregations";

describe('Result/', () => {
    describe('Aggregations', () => {
        describe('() with errors', () => {
            let aggregations = new Aggregations(100);
            aggregations.addAggregation('name', new Aggregation('name', 0, 10, ['1']));
            aggregations.addAggregation('name2', new Aggregation('name2', 0, 10, []));

            it('Should work properly', () => {
                expect(Object.keys(aggregations.getAggregations()).length).to.be.equal(2);
                expect(aggregations.getTotalElements()).to.be.equal(100);
                expect(aggregations.getAggregation('name') instanceof Aggregation).to.be.equal(true);
                expect(aggregations.getAggregation('name').getName()).to.be.equal('name');
                expect(aggregations.getAggregation('name2') instanceof Aggregation).to.be.equal(true);
                expect(aggregations.getAggregation('name2').getName()).to.be.equal('name2');
                expect(aggregations.hasNotEmptyAggregation('name')).to.be.equal(true);
                expect(aggregations.hasNotEmptyAggregation('name2')).to.be.equal(false);
            });
        });

        describe('.toArray() & createFromArray() default values', () => {
            it('Should work properly', () => {
                expect(Aggregations.createFromArray({}).toArray()).to.be.deep.equal({});
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
                expect(Aggregations.createFromArray(aggregationsAsArray).toArray()).to.be.deep.equal(aggregationsAsArray);
            });
        });
    });
});
