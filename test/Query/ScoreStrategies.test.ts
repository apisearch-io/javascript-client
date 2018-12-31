import { expect } from 'chai';
import {
    ScoreStrategies,
    AVG,
    SUM
} from "../../src/Query/ScoreStrategies";
import {ScoreStrategy} from "../../src/Query/ScoreStrategy";

describe('Query/', () => {
    describe('ScoreStrategies', () => {
        describe('.createEmpty()', () => {
            let scoreStrategies = ScoreStrategies.createEmpty();
            it('Should work properly', () => {
                expect(scoreStrategies.getScoreMode()).to.be.equal(SUM);
                expect(scoreStrategies.getScoreStrategies()).to.be.deep.equal([]);
            });
        });
        describe('with ScoreStrategy instances', () => {
            let scoreStrategies = ScoreStrategies.createEmpty(AVG);
            scoreStrategies.addScoreStrategy(ScoreStrategy.createDefault());
            scoreStrategies.addScoreStrategy(ScoreStrategy.createDefault());
            scoreStrategies.addScoreStrategy(ScoreStrategy.createDefault());
            it('Should work properly', () => {
                expect(scoreStrategies.getScoreMode()).to.be.equal(AVG);
                expect(scoreStrategies.getScoreStrategies().length).to.be.equal(3);
            });
        });
    });
});
