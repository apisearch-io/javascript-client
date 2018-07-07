import { expect } from 'chai';
import ScoreStrategy from "../../src/Query/ScoreStrategy";
import {
    SCORE_STRATEGY_DEFAULT,
    SCORE_STRATEGY_BOOSTING_RELEVANCE_FIELD,
    SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION
} from '../../src/Query/ScoreStrategy';

describe('Query/', () => {
    describe('ScoreStrategy', () => {
        describe('.createDefault()', () => {
            let scoreStrategy = ScoreStrategy.createDefault();
            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(SCORE_STRATEGY_DEFAULT);
                expect(scoreStrategy.getFunction()).to.be.equal(null);
            });
        });

        describe('.createRelevanceBoosting()', () => {
            let scoreStrategy = ScoreStrategy.createRelevanceBoosting();
            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(SCORE_STRATEGY_BOOSTING_RELEVANCE_FIELD);
                expect(scoreStrategy.getFunction()).to.be.equal(null);
            });
        });

        describe('.createRelevanceBoosting()', () => {
            let innerFunction = 'xxx';
            let scoreStrategy = ScoreStrategy.createCustomFunction(innerFunction);
            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION);
                expect(scoreStrategy.getFunction()).to.be.equal(innerFunction);
            });
        });

        describe('.toArray() & .createFromArray()', () => {
            let innerFunction = 'xxx';
            let array = {
                'type': SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION,
                'function': innerFunction
            };
            let scoreStrategy = ScoreStrategy.createFromArray(array);
            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION);
                expect(scoreStrategy.getFunction()).to.be.equal(innerFunction);
                expect(scoreStrategy.toArray()).to.be.deep.equal(array);
            });
        });
    });
});
