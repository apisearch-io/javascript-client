import Apisearch from "../../../src/Apisearch";
import {HttpRepository} from "../../../src/Repository/HttpRepository";

/**
 * Apisearch class
 */
export default class FunctionalTest {

    /**
     * Create repository
     *
     * @return {HttpRepository}
     */
    public static createRepository(): HttpRepository {
        return Apisearch.createRepository({
            app_id: "789437438test",
            index_id: "default",
            options: {
                endpoint: "http://localhost:8000",
            },
            token: "0e4d75ba-c640-44c1-a745-06ee51db4e93",
        });
    }
}
