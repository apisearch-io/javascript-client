import { expect } from 'chai';
import Retry from "../../src/Http/Retry";
import {DEFAULT_MICROSECONDS_BETWEEN_RETRIES} from "../../src/Http/Retry";

describe('Http/', () => {
    describe('Retry', () => {

        describe('.constructor()', () => {
            let retry = new Retry(
                'myurl',
                'get',
                10,
                100
            );

            it('should work properly', () => {
                expect(retry.getUrl()).to.be.equal('myurl');
                expect(retry.getMethod()).to.be.equal('get');
                expect(retry.getRetries()).to.be.equal(10);
                expect(retry.getMicrosecondsBetweenRetries()).to.be.equal(100);
            });
        });

        describe('.createFromArray()', () => {
            let retryAsArray = {
                'url': 'myurl',
                'method': 'get',
                'retries': 10,
                'microseconds_between_retries': 100
            };
            let retry = Retry.createFromArray(retryAsArray);

            it('should work properly', () => {
                expect(retry.getUrl()).to.be.equal('myurl');
                expect(retry.getMethod()).to.be.equal('get');
                expect(retry.getRetries()).to.be.equal(10);
                expect(retry.getMicrosecondsBetweenRetries()).to.be.equal(100);
            });
        });

        describe('.createFromArray() empty', () => {
            let retry = Retry.createFromArray({});

            it('should work properly', () => {
                expect(retry.getUrl()).to.be.equal('*');
                expect(retry.getMethod()).to.be.equal('*');
                expect(retry.getRetries()).to.be.equal(0);
                expect(retry.getMicrosecondsBetweenRetries()).to.be.equal(DEFAULT_MICROSECONDS_BETWEEN_RETRIES);
            });
        });
    });
});
