import {expect} from "chai";
import {Retry, RetryConfig, RetryMap} from "../../src";

describe("Http/", () => {
    describe("RetryMap", () => {

        it("should create a RetryMap from a non empty array of RetryConfig", () => {
            const configs: RetryConfig[] = [
                {
                    method: "GET",
                    microseconds_between_retries: 100,
                    retries: 1,
                    url: "/test/get",
                },
                {
                    method: "*",
                    microseconds_between_retries: 200,
                    retries: 2,
                    url: "/test/all",
                },
                {
                    method: "HEAD",
                    microseconds_between_retries: 300,
                    retries: 3,
                    url: "*",
                },
                {
                    method: "*",
                    microseconds_between_retries: 400,
                    retries: 4,
                    url: "*",
                },
            ];
            const retryMap = RetryMap.createFromArray(configs);

            const retry1 = retryMap.getRetry("/test/get", "GET");
            expect(retry1).to.be.an.instanceof(Retry);
            expect(retry1.getRetries()).to.equal(1);
            expect(retry1.getMicrosecondsBetweenRetries()).to.equal(100);

            const retry2 = retryMap.getRetry("/test/all", "POST");
            expect(retry2).to.be.an.instanceof(Retry);
            expect(retry2.getRetries()).to.equal(2);
            expect(retry2.getMicrosecondsBetweenRetries()).to.equal(200);

            const retry3 = retryMap.getRetry("/foo/bar", "HEAD");
            expect(retry3).to.be.an.instanceof(Retry);
            expect(retry3.getRetries()).to.equal(3);
            expect(retry3.getMicrosecondsBetweenRetries()).to.equal(300);

            const retry4 = retryMap.getRetry("/foo/bar", "PATCH");
            expect(retry4).to.be.an.instanceof(Retry);
            expect(retry4.getRetries()).to.equal(4);
            expect(retry4.getMicrosecondsBetweenRetries()).to.equal(400);
        });

        it("should create a RetryMap from an empty array of RetryConfig", () => {
            const retryMap = RetryMap.createFromArray([]);

            const retry = retryMap.getRetry("/test/get", "GET");
            expect(retry).to.be.null;
        });

    });
});
