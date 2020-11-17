import Axios from "axios";
import {expect} from "chai";
import * as sinon from "sinon";
import Apisearch from "../../../src/Apisearch";
import {UnknownError} from "../../../src/Error/UnknownError";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import FunctionalTest from "./FunctionalTest";
import {
    Config,
    ConnectionError,
    InvalidTokenError,
    Query, ResourceExistsError,
    ResourceNotAvailableError
} from "../../../src";

afterEach(() => {
    sinon.restore();
});

/**
 *
 */
describe("Error", () => {

    it("should fail when resource is not available", async () => {
        const repository = Apisearch.createRepository({
            app_id: "789437438test",
            index_id: "default",
            options: {
                api_version: "this is a wrong api version",
                endpoint: "http://localhost:8000",
            },
            token: "0e4d75ba-c640-44c1-a745-06ee51db4e93",
        });
        try {
            await repository.query(Query.createMatchAll());
            expect.fail("Request should have failed");
        } catch (error) {
            expect(error).to.be.an.instanceof(ResourceNotAvailableError);
        }
    });

    it("should fail when token does not exist", async () => {
        const repository = Apisearch.createRepository({
            app_id: "789437438test",
            index_id: "default",
            options: {
                endpoint: "http://localhost:8000",
            },
            token: "this is a wrong token",
        });
        try {
            await repository.query(Query.createMatchAll());
            expect.fail("Request should have failed");
        } catch (error) {
            expect(error).to.be.an.instanceof(InvalidTokenError);
        }
    });

    it("should fail creating a not valid index", async () => {
        const repository = FunctionalTest.createRepository();
        try {
            const indexUUID = IndexUUID.createById("IndexUUIDWithErrorsBecauseItHasUpperCaseCharacters");
            const config = Config.createFromArray({});
            await repository.createIndex(indexUUID, config);
        } catch (error) {
            expect(error).to.be.an.instanceof(ResourceExistsError);
        }
    });

    it("should fail when is not able to connect", async () => {
        const repository = Apisearch.createRepository({
            app_id: "",
            index_id: "",
            options: {
                endpoint: "http://xxxxx.yyyyy.zzzzz",
            },
            token: "",
        });
        try {
            await repository.query(Query.createMatchAll());
            expect.fail("Request should have failed");
        } catch (error) {
            expect(error).to.be.an.instanceof(ConnectionError);
        }
    });

    it("should fail when request fails to be sent", async () => {
        const repository = FunctionalTest.createRepository();
        try {
            await repository.query(undefined);
            expect.fail("Request should have failed");
        } catch (error) {
            expect(error).to.be.an.instanceof(UnknownError);
        }
    });

    it("should use retry map if a request fails", async () => {
        const spy = sinon.spy(Axios, "request");
        const repository = Apisearch.createRepository({
            app_id: "",
            index_id: "",
            options: {
                endpoint: "http://xxxxx.yyyyy.zzzzz",
                retry_map_config: [
                    {
                        microseconds_between_retries: 0,
                        retries: 1,
                    },
                ],
                timeout: 100,
            },
            token: "",
        });
        try {
            await repository.query(Query.createMatchAll());
            expect.fail("Request should have failed");
        } catch (error) {
            expect(spy.callCount).to.equal(2);
        } finally {
            spy.restore();
        }
    });

});
