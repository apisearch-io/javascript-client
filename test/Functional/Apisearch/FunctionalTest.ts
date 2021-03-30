import Apisearch from "../../../src/Apisearch";
import {HttpRepository} from "../../../src";

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
            token: "0e4d75ba-c640-44c1-a745-06ee51db4e93",
            options: {
                endpoint: "http://localhost:8000",
            },
        });
    }

    /**
     * Create repository
     *
     * @return {HttpRepository}
     */
    public static createCachedRepository(): HttpRepository {
        return Apisearch.createRepository({
            app_id: "789437438test",
            index_id: "default",
            token: "0e4d75ba-c640-44c1-a745-06ee51db4e93",
            options: {
                endpoint: "http://localhost:8000",
                use_cache: true
            },
        });
    }
}
