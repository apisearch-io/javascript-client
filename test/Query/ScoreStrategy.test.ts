import { expect } from 'chai';
import {
    ScoreStrategy, DEFAULT_TYPE,
    SCORE_MODE_AVG, BOOSTING_FIELD_VALUE, DEFAULT_FACTOR, DEFAULT_MISSING,
    MODIFIER_NONE, DEFAULT_WEIGHT, MODIFIER_LN, SCORE_MODE_MIN, CUSTOM_FUNCTION,
    DECAY_GAUSS, DECAY, SCORE_MODE_SUM
} from "../../src/Query/ScoreStrategy";
import {Filter} from "../../src/Query/Filter";

describe('Query/', () => {
    describe('ScoreStrategy', () => {
        describe('.createDefault()', () => {
            let scoreStrategy = ScoreStrategy.createDefault();
            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(DEFAULT_TYPE);
                expect(scoreStrategy.getFilter()).to.be.equal(null);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_AVG);
            });
        });

        describe('.createDefault() with HTTP Transport', () => {
            let scoreStrategy = ScoreStrategy.createDefault();
            scoreStrategy = ScoreStrategy.createFromArray(JSON.parse(JSON.stringify(scoreStrategy.toArray())));
            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(DEFAULT_TYPE);
                expect(scoreStrategy.getFilter()).to.be.equal(null);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_AVG);
            });
        });

        describe('.createFieldBoosting() with default', () => {
            let scoreStrategy = ScoreStrategy.createFieldBoosting('relevance');
            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(BOOSTING_FIELD_VALUE);
                expect(scoreStrategy.getConfigurationValue('field')).to.be.equal('relevance');
                expect(scoreStrategy.getConfigurationValue('factor')).to.be.equal(DEFAULT_FACTOR);
                expect(scoreStrategy.getConfigurationValue('missing')).to.be.equal(DEFAULT_MISSING);
                expect(scoreStrategy.getConfigurationValue('modifier')).to.be.equal(MODIFIER_NONE);
                expect(scoreStrategy.getWeight()).to.be.equal(DEFAULT_WEIGHT);
                expect(scoreStrategy.getFilter()).to.be.equal(null);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_AVG);
            });
        });

        describe('.createFieldBoosting() with default and HTTP Transport', () => {
            let scoreStrategy = ScoreStrategy.createFieldBoosting('relevance');
            scoreStrategy = ScoreStrategy.createFromArray(JSON.parse(JSON.stringify(scoreStrategy.toArray())));
            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(BOOSTING_FIELD_VALUE);
                expect(scoreStrategy.getConfigurationValue('field')).to.be.equal('relevance');
                expect(scoreStrategy.getConfigurationValue('factor')).to.be.equal(DEFAULT_FACTOR);
                expect(scoreStrategy.getConfigurationValue('missing')).to.be.equal(DEFAULT_MISSING);
                expect(scoreStrategy.getConfigurationValue('modifier')).to.be.equal(MODIFIER_NONE);
                expect(scoreStrategy.getWeight()).to.be.equal(DEFAULT_WEIGHT);
                expect(scoreStrategy.getFilter()).to.be.equal(null);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_AVG);
            });
        });

        describe('.createFieldBoosting()', () => {
            let scoreStrategy = ScoreStrategy.createFieldBoosting(
                'relevance',
                1.0,
                2.0,
                MODIFIER_LN,
                4.00,
                Filter.create('x', [], 0, ''),
                SCORE_MODE_MIN
            );

            it('Should work properly', () => {
                expect(scoreStrategy.getConfigurationValue('factor')).to.be.equal(1.0);
                expect(scoreStrategy.getConfigurationValue('missing')).to.be.equal(2.0);
                expect(scoreStrategy.getConfigurationValue('modifier')).to.be.equal(MODIFIER_LN);
                expect(scoreStrategy.getWeight()).to.be.equal(4.0);
                expect(scoreStrategy.getFilter()).to.be.instanceof(Filter);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_MIN);
            });
        });

        describe('.createFieldBoosting() with HTTP Transport', () => {
            let scoreStrategy = ScoreStrategy.createFieldBoosting(
                'relevance',
                1.0,
                2.0,
                MODIFIER_LN,
                4.00,
                Filter.create('x', [], 0, ''),
                SCORE_MODE_MIN
            );
            scoreStrategy = ScoreStrategy.createFromArray(JSON.parse(JSON.stringify(scoreStrategy.toArray())));

            it('Should work properly', () => {
                expect(scoreStrategy.getConfigurationValue('factor')).to.be.equal(1.0);
                expect(scoreStrategy.getConfigurationValue('missing')).to.be.equal(2.0);
                expect(scoreStrategy.getConfigurationValue('modifier')).to.be.equal(MODIFIER_LN);
                expect(scoreStrategy.getWeight()).to.be.equal(4.0);
                expect(scoreStrategy.getFilter()).to.be.instanceof(Filter);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_MIN);
            });
        });

        describe('.createCustomFunction() with default', () => {
            let scoreStrategy = ScoreStrategy.createCustomFunction('xxx');

            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(CUSTOM_FUNCTION);
                expect(scoreStrategy.getConfigurationValue('function')).to.be.equal('xxx');
                expect(scoreStrategy.getWeight()).to.be.equal(DEFAULT_WEIGHT);
                expect(scoreStrategy.getFilter()).to.be.equal(null);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_AVG);
            });
        });

        describe('.createCustomFunction() with default and HTTP Transport', () => {
            let scoreStrategy = ScoreStrategy.createCustomFunction('xxx');
            scoreStrategy = ScoreStrategy.createFromArray(JSON.parse(JSON.stringify(scoreStrategy.toArray())));

            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(CUSTOM_FUNCTION);
                expect(scoreStrategy.getConfigurationValue('function')).to.be.equal('xxx');
                expect(scoreStrategy.getWeight()).to.be.equal(DEFAULT_WEIGHT);
                expect(scoreStrategy.getFilter()).to.be.equal(null);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_AVG);
            });
        });

        describe('.createCustomFunction()', () => {
            let scoreStrategy = ScoreStrategy.createCustomFunction(
                'xxx',
                2.34,
                Filter.create('x', [], 0, ''),
                SCORE_MODE_MIN
            );

            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(CUSTOM_FUNCTION);
                expect(scoreStrategy.getConfigurationValue('function')).to.be.equal('xxx');
                expect(scoreStrategy.getWeight()).to.be.equal(2.34);
                expect(scoreStrategy.getFilter()).to.be.instanceof(Filter);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_MIN);
            });
        });

        describe('.createCustomFunction() with HTTP Transport', () => {
            let scoreStrategy = ScoreStrategy.createCustomFunction(
                'xxx',
                2.34,
                Filter.create('x', [], 0, ''),
                SCORE_MODE_MIN
            );
            scoreStrategy = ScoreStrategy.createFromArray(JSON.parse(JSON.stringify(scoreStrategy.toArray())));

            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(CUSTOM_FUNCTION);
                expect(scoreStrategy.getConfigurationValue('function')).to.be.equal('xxx');
                expect(scoreStrategy.getWeight()).to.be.equal(2.34);
                expect(scoreStrategy.getFilter()).to.be.instanceof(Filter);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_MIN);
            });
        });

        describe('.createDecayFunction() with default', () => {
            let scoreStrategy = ScoreStrategy.createDecayFunction(
                DECAY_GAUSS,
                'field1',
                '1m',
                'scale',
                '10',
                1.0
            );

            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(DECAY);
                expect(scoreStrategy.getWeight()).to.be.equal(DEFAULT_WEIGHT);
                expect(scoreStrategy.getFilter()).to.be.equal(null);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_AVG);
                expect(scoreStrategy.getConfigurationValue('field')).to.be.equal('field1');
                expect(scoreStrategy.getConfigurationValue('origin')).to.be.equal('1m');
                expect(scoreStrategy.getConfigurationValue('scale')).to.be.equal('scale');
                expect(scoreStrategy.getConfigurationValue('offset')).to.be.equal('10');
                expect(scoreStrategy.getConfigurationValue('decay')).to.be.equal(1.0);
            });
        });

        describe('.createDecayFunction() with default and HTTP Transport', () => {
            let scoreStrategy = ScoreStrategy.createDecayFunction(
                DECAY_GAUSS,
                'field1',
                '1m',
                'scale',
                '10',
                1.0
            );
            scoreStrategy = ScoreStrategy.createFromArray(JSON.parse(JSON.stringify(scoreStrategy.toArray())));

            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(DECAY);
                expect(scoreStrategy.getWeight()).to.be.equal(DEFAULT_WEIGHT);
                expect(scoreStrategy.getFilter()).to.be.equal(null);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_AVG);
                expect(scoreStrategy.getConfigurationValue('field')).to.be.equal('field1');
                expect(scoreStrategy.getConfigurationValue('origin')).to.be.equal('1m');
                expect(scoreStrategy.getConfigurationValue('scale')).to.be.equal('scale');
                expect(scoreStrategy.getConfigurationValue('offset')).to.be.equal('10');
                expect(scoreStrategy.getConfigurationValue('decay')).to.be.equal(1.0);
            });
        });

        describe('.createDecayFunction()', () => {
            let scoreStrategy = ScoreStrategy.createDecayFunction(
                DECAY_GAUSS,
                'field1',
                '1m',
                'scale',
                '10',
                1.0,
                5.50,
                Filter.create('x', [], 0, ''),
                SCORE_MODE_SUM
            );

            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(DECAY);
                expect(scoreStrategy.getConfigurationValue('field')).to.be.equal('field1');
                expect(scoreStrategy.getConfigurationValue('origin')).to.be.equal('1m');
                expect(scoreStrategy.getConfigurationValue('scale')).to.be.equal('scale');
                expect(scoreStrategy.getConfigurationValue('offset')).to.be.equal('10');
                expect(scoreStrategy.getConfigurationValue('decay')).to.be.equal(1.0);
                expect(scoreStrategy.getWeight()).to.be.equal(5.50);
                expect(scoreStrategy.getFilter()).to.be.instanceof(Filter);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_SUM);
            });
        });

        describe('.createDecayFunction() with HTTP Transport', () => {
            let scoreStrategy = ScoreStrategy.createDecayFunction(
                DECAY_GAUSS,
                'field1',
                '1m',
                'scale',
                '10',
                1.0,
                5.50,
                Filter.create('x', [], 0, ''),
                SCORE_MODE_SUM
            );
            scoreStrategy = ScoreStrategy.createFromArray(JSON.parse(JSON.stringify(scoreStrategy.toArray())));

            it('Should work properly', () => {
                expect(scoreStrategy.getType()).to.be.equal(DECAY);
                expect(scoreStrategy.getConfigurationValue('field')).to.be.equal('field1');
                expect(scoreStrategy.getConfigurationValue('origin')).to.be.equal('1m');
                expect(scoreStrategy.getConfigurationValue('scale')).to.be.equal('scale');
                expect(scoreStrategy.getConfigurationValue('offset')).to.be.equal('10');
                expect(scoreStrategy.getConfigurationValue('decay')).to.be.equal(1.0);
                expect(scoreStrategy.getWeight()).to.be.equal(5.50);
                expect(scoreStrategy.getFilter()).to.be.instanceof(Filter);
                expect(scoreStrategy.getScoreMode()).to.be.equal(SCORE_MODE_SUM);
            });
        });
    });
});
