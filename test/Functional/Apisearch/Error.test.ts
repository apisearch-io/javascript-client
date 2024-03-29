import {expect} from "chai";
import * as sinon from "sinon";
import Apisearch from "../../../src/Apisearch";
import {UnknownError} from "../../../src/Error/UnknownError";
import {IndexUUID} from "../../../src/Model/IndexUUID";
import FunctionalTest from "./FunctionalTest";
import {Config} from "../../../src/Config/Config";
import {ConnectionError} from "../../../src/Error/ConnectionError";
import {InvalidTokenError} from "../../../src/Error/InvalidTokenError";
import {InvalidFormatError} from "../../../src/Error/InvalidFormatError";
import {Query} from "../../../src/Query/Query";
import {ResourceNotAvailableError} from "../../../src/Error/ResourceNotAvailableError";

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
            token: "invalid-token",
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
            expect.fail("Request should have failed");
        } catch (error) {
            expect(error).to.be.an.instanceof(InvalidFormatError);
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
});
