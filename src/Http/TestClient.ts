import Query from "../Query/Query";
import Result from "../Result/Result";
import HttpClient from "./HttpClient";
import Response from "./Response";

/**
 * AxiosClient
 */
export default class TestClient implements HttpClient {

    public calls: any[] = [];

    /**
     * Get
     *
     * @param url
     * @param method
     * @param credentials
     * @param parameters
     * @param data
     *
     * @return {Promise<Response>}
     */
    public async get(
        url: string,
        method: string,
        credentials: any,
        parameters: any = {},
        data: any = {},
    ): Promise<Response> {

        this.calls.push({
            url,
            method,
            credentials,
            parameters,
            data,
        });

        return new Promise<Response>(
            (resolve) => resolve(new Response(
                200,
                ((
                    method === "get" &&
                    url === "/"
                )
                ? Result.createFromArray({
                    query: Query.createMatchAll(),
                }).toArray()
                : ""),
            )),
        );
    }

    /**
     * Abort current request
     * And regenerate the cancellation token
     */
    public abort() {
        // Abort
    }
}
